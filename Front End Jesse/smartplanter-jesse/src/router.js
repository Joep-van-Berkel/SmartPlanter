import { createRouter, createWebHistory } from 'vue-router'
import { keycloak } from './keycloak'

import Login from './pages/LoginPage.vue'
import Dashboard from './pages/DashboardPage.vue'
import Notifications from './pages/NotificationsPage.vue'
import Data from './pages/DataPage.vue'
import Settings from './pages/SettingsPage.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/notifications', component: Notifications, meta: { requiresAuth: true } },
  { path: '/data', component: Data, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true, requiresRole: 'admin' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login()
  } else if (to.meta.requiresRole) {
    if (keycloak.hasRealmRole(to.meta.requiresRole)) next()
    else next('/') // geen toegang
  } else next()
})

export default router
