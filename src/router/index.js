import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/RegisterView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/sign/SigninView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/authuser/ShopView.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }

  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/task/TaskView.vue'),

  },
  {
    path: '/ag',
    name: 'ag',
    component: () => import('../views/aggrid/AgView.vue'),

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
