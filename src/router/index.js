import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/problem',
      name: 'problem',
      component: () => import('../views/ProblemView.vue')
    },
    {
      path: '/testcase',
      name: 'testcase',
      component: () => import('../views/TestCaseView.vue')
    },
    {
      path: '/submission',
      name: 'submission',
      component: () => import('../views/SubmissionView.vue')
    }
  ]
})

export default router
