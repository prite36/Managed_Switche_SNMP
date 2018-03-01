<template>
  <div class="contentbor">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css" />

      <br><br>
      <div class="content1">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box" align="left">
              <p style="font-weight:800;">Discription</p> {{infoshow[0].discription}}<br><br>
              <p style="font-weight:800;">Device Name</p> {{infoshow[0].name}}<br><br>
              <p style="font-weight:800;">Uptime</p> {{infoshow[0].uptime}}

            </article>
          </div>
        </div>
      </div>

      <br><br>
      <div class="content2">
        <table class="table is-striped">
          <thead>
        <tr>
          <th><abbr >Pos</abbr></th>
          <th><abbr >Interface</abbr></th>
          <th><abbr >Port</abbr></th>
          <th><abbr >In Octet</abbr></th>
          <th><abbr >Out Octet</abbr></th>
          <th><abbr >Time</abbr></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, index) in mibshow">

            <th>{{index+1}}</th>
            <td>{{data.int}}</td>
            <td>{{data.port}}</td>
            <td>{{data.inOctet}}</td>
            <td>{{data.outOctet}}</td>
            <td>{{data.time}}</td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['mibshow', 'infoshow'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
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
}
.contentbor{
  background: url(remotemonitoring.png)no-repeat center fixed;
  background-size: cover;
}
.content1{
  margin: auto;
  width: 80%;
  border-radius: 1px;
  box-shadow: 0 0 20px #333;
  background: #00d1b2;
}
.content2{
  margin: auto;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 0 20px #333;
  background: #FFF;
}
</style>
