import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = ((resolve)=>{
  import('@/views/home/home').then((module)=>{
    resolve(module)
  })
});

const Goods = ((resolve)=>{
  import('@/views/goods/goods').then((module)=>{
    resolve(module)
  })
});

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
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
