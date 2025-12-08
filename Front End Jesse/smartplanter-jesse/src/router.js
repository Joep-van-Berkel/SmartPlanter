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
  { path: '/data', component: Data, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true, requiresRole: 'admin' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // Wacht totdat Keycloak klaar is
  if (authState.initializing) {
    const stop = watch(
      () => authState.initializing,
      (done) => {
        if (!done) {
          stop()
          next()
        }
      }
    )
    return
  }

  // Redirect ingelogde gebruiker weg van login pagina
  if (to.path === '/' && keycloak.authenticated) {
    return next('/dashboard')
  }

  // Auth check
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    return keycloak.login({ redirectUri: window.location.origin + to.path })
  }

  // Role check
  if (to.meta.requiresRole && !keycloak.hasRealmRole(to.meta.requiresRole)) {
    alert('⛔ Geen toegang – onvoldoende rechten.')
    return next('/dashboard')
  }

  next()
})

export default router
