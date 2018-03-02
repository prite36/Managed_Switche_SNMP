<template>
  <div id="app">
    <bar/>
    <router-view/>
  </div>
</template>

<script>
import bar from '@/components/bar'
export default {
  name: 'App',
  components: {
    bar
  },
  methods: {
    // change (device) {
    //   this.device = device
    //   if (device === 'get') {
    //     this.active1 = 'is-active'
    //     this.active2 = ''
    //   } else if (device === 'set') {
    //     this.active1 = ''
    //     this.active3 = ''
    //     this.active2 = 'is-active'
    //   } else {
    //     this.active1 = ''
    //     this.active2 = ''
    //     this.active3 = 'is-active'
    //   }
    // }
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
}
#navbarExampleTransparentExample {
  border-bottom: 1px solid #00d1b2;
}
</style>
