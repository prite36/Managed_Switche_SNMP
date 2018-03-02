<template>
  <div class="bar">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Network Monitoring
          </h1>
          <h2 class="subtitle">
            Get Set Trap
          </h2>
        </div>
      </div>
    </section>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/">
              <b-icon
                  icon="monitor"
                  size="is-medium">
              </b-icon>
            </router-link>
          </a>
          <router-link to="/">
            <a class="navbar-item">
              Get
            </a>
          </router-link>
          <router-link to="/setdevice">
            <a class="navbar-item">
              Set
            </a>
          </router-link>
          <router-link to="/trap">
            <a class="navbar-item">
              Trap
            </a>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'bar',
  data () {
    return {
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
