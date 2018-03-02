import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    infoSW: '',
    ifStatus: '',
    ip: ''
  },
  mutations: {
    IP (state, ip) {
      state.ip = ip
    },
    INFO (state, infoSW) {
      state.infoSW = infoSW
    },
    STATUS (state, ifStatus) {
      state.ifStatus = ''
      state.ifStatus = ifStatus
    }
  },
  actions: {
    updateip ({commit}) {
      setInterval(function () {
        axios.get('http://localhost:7001/ipAdress').then((response) => {
          let ip = response.data
          if (ip !== '') {
            commit('IP', ip)
          }
        })
      }, 10000)
    },
    updateInfo ({commit}) {
      setInterval(function () {
        axios.get('http://localhost:7001/infoSW').then((response) => {
          let infoSW = response.data
          if (infoSW !== '') {
            commit('INFO', infoSW)
          }
        })
      }, 10000)
    },
    updateStatus ({commit}) {
      setInterval(function () {
        axios.get('http://localhost:7001/ifStatus').then((response) => {
          let ifStatus = response.data
          if (ifStatus !== '') {
            commit('STATUS', ifStatus)
          }
        })
      }, 10000)
    }
  },
  getters: {
    infoSW: state => state.infoSW,
    ifStatus: state => state.ifStatus,
    ip: state => state.ip
  }
})
