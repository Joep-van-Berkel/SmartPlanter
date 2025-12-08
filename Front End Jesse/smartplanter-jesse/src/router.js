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
  // 1️⃣ Wacht Keycloak init af
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

  // 2️⃣ Redirect ingelogde gebruiker weg van login pagina
  if (to.path === '/' && keycloak.authenticated) {
    return next('/dashboard')
  }

  // 3️⃣ Routes die authenticatie vereisen
  if (to.meta.requiresAuth) {
    if (!keycloak.authenticated) {
      // Gebruik alleen path, niet hele URL, voorkomt 431 error
      return keycloak.login({
        redirectUri: window.location.origin + to.path,
      })
    }
  }

  // 4️⃣ Role check
  if (to.meta.requiresRole) {
    if (!keycloak.hasRealmRole(to.meta.requiresRole)) {
      alert('⛔ Geen toegang – onvoldoende rechten.')
      return next('/dashboard')
    }
  }

  // 5️⃣ Alles ok, ga door
  next()
})

export default router
