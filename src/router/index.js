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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/register/RegisterView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import( '../views/sign/SigninView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '../views/admin/AdminView.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import( '../views/authuser/ShopView.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next( );
      } else {
        next('/login');
      }
    }

  },
  {
    path: '/task',
    name: 'task',
    component: () => import( '../views/task/TaskView.vue'),

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
