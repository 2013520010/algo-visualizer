import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/sorting', name: 'Sorting', component: () => import('@/views/Sorting.vue') },
  { path: '/pathfinding', name: 'Pathfinding', component: () => import('@/views/Pathfinding.vue') },
  { path: '/nqueens', name: 'NQueens', component: () => import('@/views/NQueens.vue') },
  { path: '/maze', name: 'Maze', component: () => import('@/views/Maze.vue') },
  { path: '/binarytree', name: 'BinaryTree', component: () => import('@/views/BinaryTree.vue') },
  { path: '/linkedlist', name: 'LinkedList', component: () => import('@/views/LinkedList.vue') },
  { path: '/hashtable', name: 'HashTable', component: () => import('@/views/HashTable.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
