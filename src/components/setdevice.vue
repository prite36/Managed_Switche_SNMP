<template>
  <div class="setdevice">
    <input type="text" name="" value="" v-model="name">
    <input type="button" name="" value="name" @click="setNameSw()">
    <input type="button" name="" value="port" @click="setPortsSw()">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'setdevice',
  data () {
    return {
      name: ''
      // port: '',
      // status: 1
    }
  },
  methods: {
    setNameSw () {
      axios.post('http://localhost:7001/setName', {
        nameSW: this.name
      })
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (error) {
      //   console.log(error)
      // })
    },
    setPortsSw () {
      axios.post('http://localhost:7001/setStatusports', {
        'port': '11',
        'status': '2'
      })
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (error) {
      //   console.log(error)
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
