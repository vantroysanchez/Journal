import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import daybookRouter from "../modules/daybook/router";
import authRouter from "../modules/auth/router";

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
    path:'/auth',
    ...authRouter
  },
  {
    path:'/daybook',
    ...daybookRouter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
