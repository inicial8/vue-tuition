import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import GoodsList from './components/Goods/GoodsList.vue'
import GoodsPage from './components/Goods/GoodsPage.vue'
import Login from './components/Login.vue'
import NotFoundView from './components/NotFoundView.vue'

const router = createRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goods',
    name: 'goods',
    component: GoodsList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goods/:id',
    name: 'goods-page',
    component: GoodsPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFoundView
  }
],
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('user');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loginpath = window.location.pathname;

  if (requiresAuth && !currentUser) {
      next({ name: 'login', query: { from: loginpath } });
  } else if (!requiresAuth && currentUser) next(loginpath);
  else next();
});

export default router
