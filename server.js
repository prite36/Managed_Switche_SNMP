/* eslint-disable */
var express = require('express')
var app = express()
var snmp = require('snmp-native')
var humanizeDuration = require('humanize-duration')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var community = 'private'
// ///// set interval ////////
///// variable ////////
var infoSW = []
var int_sw = []
var port_sw = []
var time_sw = []
var inOctet_sw = []
var outOctet_sw = []
var dataSW = []
var allIpAddress = []

///////////////////// INFO SW //////////////////////////////
app.get('/infoSW', function (req, res) {
  var getInfoSW = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_info = '.1.3.6.1.2.1.1'
  getInfoSW.getSubtree({ oid: oidget_info }, function (err, varbinds) {
    infoSW.push({
          discription: varbinds[0].value,
          uptime: timecheck(varbinds[2].value),
          name: varbinds[4].value
    })

    getInfoSW.close()
    //console.log(varbinds[0].value);
  })
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(infoSW)
  infoSW = []
})

//////////////////////// SW //////////////////////////
app.get('/ifStatus', function (req, res) {
  ////////////SW////////////////////

 //////// index //////
  var getintSW = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_int = '.1.3.6.1.2.1.2.2.1.2'
  getintSW.getSubtree({ oid: oidget_int }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      int_sw.push(data.value.replace('GigabitEthernet','Gig '))
    })
    getintSW.close()
  })
  // /////// portstatus  ////////////
  var getportSW = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_port = '.1.3.6.1.2.1.2.2.1.8'
  getportSW.getSubtree({ oid: oidget_port }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      // console.log(data.value)
        if (data.value == 1) {
           port_sw.push("up")
        }
        else if (data.value == 2) {
          port_sw.push("down")
        }
    })
    getportSW.close()
  })

  // .1.3.6.1.2.1.2.2.1.9
  var gettimeSW = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_time = '.1.3.6.1.2.1.2.2.1.9'
  gettimeSW.getSubtree({ oid: oidget_time }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      time_sw.push(timecheck(data.value))
    })
    gettimeSW.close()
  })

  // .1.3.6.1.2.1.2.2.1.10
  var getInSW = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_in = '.1.3.6.1.2.1.2.2.1.10'
  getInSW.getSubtree({ oid: oidget_in }, function (err, varbinds) {
    varbinds.forEach(function (data) {

      inOctet_sw.push(convert(data.value))
    })
    getInSW.close()
  })

  // .1.3.6.1.2.1.2.2.1.16
  var getOutSW = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_out = '.1.3.6.1.2.1.2.2.1.16'
  getOutSW.getSubtree({ oid: oidget_out }, function (err, varbinds) {
    varbinds.forEach(function (data) {

      outOctet_sw.push(convert(data.value))
    })
    getOutSW.close()
  })
  int_sw.forEach(function (err, index) {
    var set = {
      name: 'Switch',
      int: int_sw[index],
      port: port_sw[index],
      time: time_sw[index],
      inOctet: inOctet_sw[index],
      outOctet: outOctet_sw[index]
    }

    dataSW.push(set)
  })
  int_sw= []
  port_sw =[]
  time_sw =[]
  inOctet_sw = []
  outOctet_sw= []
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(dataSW)
  dataSW =[]
})

app.get('/ipAdress', function (req, res) {
  var getipAddress = new snmp.Session({ host: '10.4.15.210', community: community })
  var oidget_info = '.1.3.6.1.2.1.4.22.1.3'
  getipAddress.getSubtree({ oid: oidget_info }, function (err, varbinds) {

    varbinds.forEach( value => {
      allIpAddress.push(value.value.toString().replace(/,/g, '.'))
    })
    getipAddress.close()
    res.send(allIpAddress)
    allIpAddress = []
  })
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
})
// ////////////////set func /////////////////////////

app.post('/setName', function (req, res) {
   let data = req.body
   console.log(data.nameSW)
   var setNameSW = new snmp.Session({ host: '10.4.15.210', community: community })
   var oidPost = '.1.3.6.1.2.1.1.5.0'
   setNameSW.set({ oid: oidPost, value: data.name, type: 4 }, function (error, varbind) {
    if (error) {
        console.log('Fail ');
    } else {
        console.log('The set is done.');
    }
  })
})

app.post('/setStatusports', function (req, res) {
   let data = req.body
   console.log(data.port)
   console.log(data.status)
   var setPortSW = new snmp.Session({ host: '10.4.15.210', community: community })
   var oidPost = '.1.3.6.1.2.1.2.2.1.7' + data.port
   setPortSW.set({ oid: oidPost, value: data.status, type: 1 }, function (error, varbind) {
    if (error) {
        console.log('Fail ');
    } else {
        console.log('The set port is done.');
    }
  })
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
