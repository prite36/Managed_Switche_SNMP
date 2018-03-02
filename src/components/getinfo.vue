<template>
  <div class="getinfo">
    Name Switch {{infoSW[0].name}}<br>
    description {{infoSW[0].description}}<br>
    uptime {{infoSW[0].uptime}}<br>
    <center>
      <b-table :data="ifStatus" :columns="columns"></b-table>
      <table border="1">
        <tr v-for="(n, index) in ip" :key="index">
          <td>{{n}}</td>
        </tr>
      </table>
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
      ],
      columns2: [
        {
          field: 'ip',
          label: 'ip with connected'
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
