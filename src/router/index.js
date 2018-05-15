import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Goods from '@/views/goods/goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
