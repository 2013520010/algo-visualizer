import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/sorting', name: 'Sorting', component: () => import('@/views/Sorting.vue') },
  { path: '/pathfinding', name: 'Pathfinding', component: () => import('@/views/Pathfinding.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
