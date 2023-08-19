import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/level1',
    name: 'level1',
    component: () => import('../views/Level1View.vue')
  },
  {
    path: '/level1/results',
    name: 'level1results',
    component: () => import('../views/Level1ResultsView.vue')
  },
  {
    path: '/level1/feedback',
    name: 'level1feedback',
    component: () => import('../views/Level1FeedbackView.vue')
  },
  {
    path: '/level2',
    name: 'level2',
    component: () => import('../views/Level2View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
