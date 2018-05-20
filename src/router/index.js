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

const Food = ((resolve)=>{
  import('@/views/food/food').then((module)=>{
    resolve(module)
  })
});

const Comment = ((resolve)=>{
  import('@/views/comment/comment').then((module)=>{
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
      component: Goods,
      children:[
        {
          path:'detail',
          component:Food
        }
      ]
    },
    {
      path: '/comment',
      component: Comment
    }
  ]
})
