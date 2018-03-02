<template>
  <div class="setdevice">
    <section>
      <b-field label="Set Name Switch" width="100px;">
          <b-input v-model="name"></b-input>
      </b-field>
    </section>
    <br><br>
    <button class="button is-primary is-medium"
        @click="setNameSw()">
        Set name SW
    </button>
    <br>
    <div class="button"
    v-for="(port, index) in ifStatus"
    :key="index"
    @click="setPortsSw(port.port, index)">
      <button
      class="button is-primary is-medium">
          {{port.int}}
          Now is {{port.port}}
      </button>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'setdevice',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['ifStatus'])
  },
  methods: {
    ...mapActions(['updateStatus']),
    setNameSw () {
      axios.post('http://localhost:7001/setName', {
        nameSW: this.name
      })
    },
    setPortsSw (status, index) {
      console.log(status)
      let ind = (index + 1) + ''
      console.log(ind)
      let set = ''
      if (status === 'up') {
        set = '2'
      } else if (status === 'down') {
        set = '1'
      }
      axios.post('http://localhost:7001/setStatusports', {
        'port': ind,
        'status': set
      })
    }
  },
  created () {
    this.updateStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  padding-left: 1%;
  padding-top: 1%;
}
</style>
