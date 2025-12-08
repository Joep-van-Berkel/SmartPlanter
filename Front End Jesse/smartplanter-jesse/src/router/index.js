import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/LoginPage.vue'
import Dashboard from '../pages/DashboardPage.vue'
import Notifications from '../pages/NotificationsPage.vue'
import Data from '../pages/DataPage.vue'
import Settings from '../pages/SettingsPage.vue'
import './assets/styles/theme.css'


const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/notifications', component: Notifications },
  { path: '/data', component: Data },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Geen Keycloak guards meer
router.beforeEach((to, from, next) => {
  next() // altijd doorlaten
})

export default router
