import { createRouter, createWebHistory } from 'vue-router'
import { keycloak, authState } from './keycloak'
import { watch } from 'vue'

import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import Notifications from './pages/Notifications.vue'
import Data from './pages/Data.vue'
import Settings from './pages/Settings.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/notifications', component: Notifications, meta: { requiresAuth: true } },
  { path: '/data', component: Data, meta:    { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true, requiresRole: 'admin' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // Wacht Keycloak init
  if (authState.initializing) {
    const unwatch = watch(
      () => authState.initializing,
      (newVal) => {
        if (!newVal) {
          unwatch()
          next()
        }
      }
    )
    return
  }

  // Auth check
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login({ redirectUri: window.location.origin + to.fullPath })
    return
  }

  // Role check
  if (to.meta.requiresRole) {
    const hasRole = keycloak.hasRealmRole(to.meta.requiresRole)
    if (!hasRole) {
      alert('⛔ Geen toegang! Je hebt niet de juiste rechten.')
      return next('/')
    }
  }

  next()
})

export default router
