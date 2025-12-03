import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Notifications from '../pages/Notifications.vue'
import Data from '../pages/Data.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', component: Login},  
  { path: '/dashboard', component: Dashboard },
  { path: '/notifications', component: Notifications },
  { path: '/data', component: Data },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router