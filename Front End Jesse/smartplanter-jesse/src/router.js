// router.js
import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from './pages/DashboardPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

let keycloakInstance = null

// Functie om Keycloak binnen router te kunnen gebruiken
export function setKeycloak(keycloak) {
  keycloakInstance = keycloak
}

const routes = [
  { path: '/', component: DashboardPage },
  {
    path: '/admin',
    component: SettingsPage,
    meta: { requiresRole: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  if (to.meta.requiresRole) {
    if (!keycloakInstance) {
      console.error("⚠️ Keycloak is not set yet in router.")
      return next('/')
    }

    const hasRole = keycloakInstance.hasRealmRole(to.meta.requiresRole)

    if (hasRole) next()
    else {
      alert('⛔ Geen toegang! Je hebt geen admin rechten.')
      next('/')
    }
  } else {
    next()
  }
})

export default router
