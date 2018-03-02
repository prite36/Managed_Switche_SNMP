import Vue from 'vue'
import Router from 'vue-router'
import getinfo from '@/components/getinfo'
import setdevice from '@/components/setdevice'
import trap from '@/components/trap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'getinfo',
      component: getinfo
    },
    {
      path: '/setdevice',
      name: 'setdevice',
      component: setdevice
    },
    {
      path: '/trap',
      name: 'trap',
      component: trap
    }
  ]
})
