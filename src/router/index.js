import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/Views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router