<template>
  <div class="getinfo">
    <center>
    <table>
      <tr>
        <td>
          <b>Name Switch</b>
        </td>
        <td>
          {{infoSW[0].name}}
        </td>
      </tr>
      <tr>
        <td>
          <b>description</b>
        </td>
        <td>
           {{infoSW[0].description}}
        </td>
      </tr>
      <tr>
        <td>
        <b>uptime</b>
        </td>
        <td>
          {{infoSW[0].uptime}}
        </td>
      </tr>
      <tr>
        <td>
        <b>IP Connected</b>
        </td>
        <td>
          {{ip}}
        </td>
      </tr>
    </table>
  </center>
    <br>
    <center>
      <b-table :data="ifStatus" :columns="columns"></b-table>
    </center>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'getinfo',
  data () {
    return {
      columns: [
        {
          field: 'int',
          label: 'interface'
        },
        {
          field: 'inOctet',
          label: 'inOctet',
          width: '40'
        },
        {
          field: 'outOctet',
          label: 'Outoctet'
        },
        {
          field: 'port',
          label: 'Port Status',
          centered: true,
          width: '40'
        },
        {
          field: 'time',
          label: 'Time'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['ip', 'infoSW', 'ifStatus'])
  },
  methods: {
    ...mapActions(['updateip', 'updateInfo', 'updateStatus'])
  },
  created () {
    this.updateip()
    this.updateInfo()
    this.updateStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
