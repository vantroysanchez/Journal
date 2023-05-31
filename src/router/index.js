import { createRouter, createWebHistory } from 'vue-router'
import daybookRouter from "../modules/daybook/router";
import authRouter from "../modules/auth/router";
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard';

const routes = [  
  {
    path:'/auth',
    ...authRouter
  },
  {
    path:'/',
    name: 'daybook',
    beforeEnter: [isAuthenticatedGuard],
    ...daybookRouter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
