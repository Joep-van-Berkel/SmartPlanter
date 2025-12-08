import { createRouter, createWebHistory } from 'vue-router'
import { keycloak } from './keycloak'

import LoginPage from './pages/LoginPage.vue'
import Dashboard from './pages/DashboardPage.vue'
import Notifications from './pages/NotificationsPage.vue'
import Data from './pages/DataPage.vue'
import Settings from './pages/SettingsPage.vue'

const routes = [
  { path: '/', component: LoginPage },
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
    // Alleen redirect naar Keycloak bij beveiligde route
    keycloak.login()
  } else if (to.meta.requiresRole) {
    if (keycloak.hasRealmRole(to.meta.requiresRole)) next()
    else next('/') // terug naar loginPage
  } else {
    next()
  }
})

export default router
