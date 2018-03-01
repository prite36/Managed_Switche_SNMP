<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css" />
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Network Monitoring
        </h1>
        <h2 class="subtitle">
          B4-15 B4-02
        </h2>
      </div>
    </div>
  </section>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="http://icons.iconarchive.com/icons/xenatt/minimalism/256/App-Network-Monitor-icon.png" alt="Network-Monitor">
          </a>
          <a v-on:click="change('415')" :class="'nav-item is-tab is-hidden-mobile ' +active">R415</a>
          <a v-on:click="change('402')" :class="'nav-item is-tab is-hidden-mobile ' +active2">R402</a>

        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a v-on:click="change('415')" :class="'nav-item is-tab is-hidden-tablet '+active">R415</a>
          <a v-on:click="change('402')" :class="'nav-item is-tab is-hidden-tablet '+active2">R402</a>

        </div>
      </div>
    </nav>
      <div v-if="device == '415'">
        <r415-table :mibshow ="mib415" :infoshow ="inFo415"></r415-table>
     </div>
     <div v-if="device == '402'">
       <r415-table :mibshow ="mib402" :infoshow ="inFo402"></r415-table>
    </div>
      <router-view></router-view>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>

            <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/jgthms/bulma">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>
import axios from 'axios'
import r415Table from './components/r415Table.vue'
export default {
  name: 'app',
  components: {
    r415Table
  },
  data () {
    return {
      inFo415: [],
      inFo402: [],
      mib415: [],
      mib402: [],
      mibshow: [],
      infoshow: [],
      device: 415,
      active: 'is-active',
      active2: ''
    }
  },
  methods: {
    change (device) {
      this.device = device
      if (device === '415') {
        this.active = 'is-active'
        this.active2 = ''
      } else {
        this.active = ''
        this.active2 = 'is-active'
      }
    }
  },
  mounted () {
    var vm = this
    setInterval(function () {
      axios.get('http://localhost:7001/415').then((response) => {
        vm.mib415 = response.data
      })
      axios.get('http://localhost:7001/info415').then((response) => {
        vm.inFo415 = response.data
      })
      axios.get('http://localhost:7001/402').then((response) => {
        vm.mib402 = response.data
      })
      axios.get('http://localhost:7001/info402').then((response) => {
        vm.inFo402 = response.data
      })
    }, 5000)
  },
  computed: {
    device () {
      if (this.device === 415) {
        console.log('GO415')
        this.mibshow = this.mib415
        this.infoshow = this.inFo415
      } else if (this.device === 402) {
        console.log('GO402')
        this.mibshow = this.mib402
        this.infoshow = this.inFo402
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
