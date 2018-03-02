<template>
  <div class="getinfo">
    get
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'getinfo',
  data () {
    return {
      infoSW: '',
      ifStatus: '',
      ip: ''
    }
  },
  mounted () {
    var vm = this
    setInterval(function () {
      axios.get('http://localhost:7001/infoSW').then((response) => {
        vm.infoSW = response.data
      })
      axios.get('http://localhost:7001/ifStatus').then((response) => {
        vm.ifStatus = response.data
      })
      axios.get('http://localhost:7001/ipAdress').then((response) => {
        vm.ip = response.data
      })
    }, 10000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
