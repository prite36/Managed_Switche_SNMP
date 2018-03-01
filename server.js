/* eslint-disable*/
var express = require('express')
var app = express()
var snmp = require('snmp-native')
var humanizeDuration = require('humanize-duration')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var community = 'public'
// ///// set interval ////////
///// variable ////////
var infoR415 = []
var int_415 = []
var port_415 = []
var time_415 = []
var inOctet_415 = []
var outOctet_415 = []
var data415 = []

var infoR402 = []
var int_402 = []
var port_402 = []
var time_402 = []
var inOctet_402 = []
var outOctet_402 = []
var data402 = []

///////////////////// INFO 415 //////////////////////////////
app.get('/info415', function (req, res) {
  var getInfoR415 = new snmp.Session({ host: '10.4.15.1', community: community })
  var oidget_info = '.1.3.6.1.2.1.1'
  getInfoR415.getSubtree({ oid: oidget_info }, function (err, varbinds) {
    infoR415.push({
          discription: varbinds[0].value,
          uptime: timecheck(varbinds[2].value),
          name: varbinds[4].value
    })

    getInfoR415.close()
    //console.log(varbinds[0].value);
  })
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(infoR415)
  infoR415 = []
})

///////////////////// INFO 402 //////////////////////////////
app.get('/info402', function (req, res) {
  var getInfoR402 = new snmp.Session({ host: '10.4.2.1', community: community })
  var oidget_info = '.1.3.6.1.2.1.1'
  getInfoR402.getSubtree({ oid: oidget_info }, function (err, varbinds) {
    infoR402.push({
          discription: varbinds[0].value,
          uptime: timecheck(varbinds[2].value),
          name: varbinds[4].value
    })
    getInfoR402.close()
    //console.log(varbinds[0].value);
  })
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(infoR402)
  infoR402 = []
})

//////////////////////// R402 //////////////////////////
app.get('/415', function (req, res) {
  ////////////r415////////////////////


 //////// index //////
  var getintR415 = new snmp.Session({ host: '10.4.15.1', community: community })
  var oidget_int = '.1.3.6.1.2.1.2.2.1.2'
  getintR415.getSubtree({ oid: oidget_int }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      int_415.push(data.value.replace('GigabitEthernet','Gig '))
    })
    getintR415.close()
  })
  // /////// portstatus  ////////////
  var getportR415 = new snmp.Session({ host: '10.4.15.1', community: community })
  var oidget_port = '.1.3.6.1.2.1.2.2.1.8'
  getportR415.getSubtree({ oid: oidget_port }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      // console.log(data.value)
        if (data.value == 1) {
           port_415.push("up")
        }
        else if (data.value == 2) {
          port_415.push("down")
        }
    })
    getportR415.close()
  })

  // .1.3.6.1.2.1.2.2.1.9
  var gettimeR415 = new snmp.Session({ host: '10.4.15.1', community: community })
  var oidget_time = '.1.3.6.1.2.1.2.2.1.9'
  gettimeR415.getSubtree({ oid: oidget_time }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      time_415.push(timecheck(data.value))
    })
    gettimeR415.close()
  })

  // .1.3.6.1.2.1.2.2.1.10
  var getInR415 = new snmp.Session({ host: '10.4.15.1', community: community })
  var oidget_in = '.1.3.6.1.2.1.2.2.1.10'
  getInR415.getSubtree({ oid: oidget_in }, function (err, varbinds) {
    varbinds.forEach(function (data) {

      inOctet_415.push(convert(data.value))
    })
    getInR415.close()
  })

  // .1.3.6.1.2.1.2.2.1.16
  var getOutR415 = new snmp.Session({ host: '10.4.15.1', community: community })
  var oidget_out = '.1.3.6.1.2.1.2.2.1.16'
  getOutR415.getSubtree({ oid: oidget_out }, function (err, varbinds) {
    varbinds.forEach(function (data) {

      outOctet_415.push(convert(data.value))
    })
    getOutR415.close()
  })
  int_415.forEach(function (err, index) {
    var set = {
      name: '415',
      int: int_415[index],
      port: port_415[index],
      time: time_415[index],
      inOctet: inOctet_415[index],
      outOctet: outOctet_415[index]
    }

    data415.push(set)
  })
  int_415= []
  port_415 =[]
  time_415 =[]
  inOctet_415 = []
  outOctet_415= []
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(data415)
  data415 =[]
})

//////////////////////// R402 //////////////////////////
app.get('/402', function (req, res) {
  ////////////r402////////////////////


 //////// index //////
  var getintR402 = new snmp.Session({ host: '10.4.2.1', community: community })
  var oidget_int = '.1.3.6.1.2.1.2.2.1.2'
  getintR402.getSubtree({ oid: oidget_int }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      int_402.push(data.value.replace('GigabitEthernet','Gig '))
    })
    getintR402.close()
  })
  // /////// portstatus  ////////////
  var getportR402 = new snmp.Session({ host: '10.4.2.1', community: community })
  var oidget_port = '.1.3.6.1.2.1.2.2.1.8'
  getportR402.getSubtree({ oid: oidget_port }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      // console.log(data.value)
        if (data.value == 1) {
           port_402.push("up")
        }
        else if (data.value == 2) {
          port_402.push("down")
        }
    })
    getportR402.close()
  })

  // .1.3.6.1.2.1.2.2.1.9
  var gettimeR402 = new snmp.Session({ host: '10.4.2.1', community: community })
  var oidget_time = '.1.3.6.1.2.1.2.2.1.9'
  gettimeR402.getSubtree({ oid: oidget_time }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      // console.log(int_402)
      let timetick = data.value
      let text =""
      let day   = parseInt(timetick / 8640000)
      let hour  = parseInt((timetick % 8640000) / 360000)
      let min   = parseInt(((timetick % 8640000) % 360000) / 6000)
      if(day!=0){text+=day.toString() + " Day "}
      if(hour!=0){text+=hour.toString() + " hours "}
      if(min!=0){text+=min.toString() + " min "}
      time_402.push(text)
      //time_402.push(data.value)
    })
    gettimeR402.close()
  })

  // .1.3.6.1.2.1.2.2.1.10
  var getInR402 = new snmp.Session({ host: '10.4.2.1', community: community })
  var oidget_in = '.1.3.6.1.2.1.2.2.1.10'
  getInR402.getSubtree({ oid: oidget_in }, function (err, varbinds) {
    varbinds.forEach(function (data) {

      inOctet_402.push(convert(data.value))
    })
    getInR402.close()
  })

  // .1.3.6.1.2.1.2.2.1.16
  var getOutR402 = new snmp.Session({ host: '10.4.2.1', community: community })
  var oidget_out = '.1.3.6.1.2.1.2.2.1.16'
  getOutR402.getSubtree({ oid: oidget_out }, function (err, varbinds) {
    varbinds.forEach(function (data) {

      outOctet_402.push(convert(data.value))
    })
    getOutR402.close()
  })
  int_402.forEach(function (err, index) {
    var set = {
      name: '402',
      int: int_402[index],
      port: port_402[index],
      time: time_402[index],
      inOctet: inOctet_402[index],
      outOctet: outOctet_402[index]
    }

    data402.push(set)
  })
  int_402= []
  port_402 =[]
  time_402 =[]
  inOctet_402 = []
  outOctet_402= []
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(data402)
  data402 =[]
})




// ////////////////server localhost /////////////////////////
app.use(express.static('dist'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})

function convert (byte) {
   var sizes = ['Bytes', 'Kbps', 'Mbps', 'Gbps', 'Tbps']
   byte = byte * 8
   if (byte == 0) return '0 Byte'
   var i = parseFloat(Math.floor(Math.log(byte) / Math.log(1000)))
   return parseFloat(byte / Math.pow(1000, i), 2).toFixed(2) + ' ' + sizes[i]
}
function timecheck (time) {
  return humanizeDuration(time)
}
