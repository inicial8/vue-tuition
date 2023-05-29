import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import GoodsList from './components/Goods/GoodsList.vue'

const router = createRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/goods',
    name: 'goods',
    component: GoodsList
  }],
  history: createWebHistory()
})

export default router
