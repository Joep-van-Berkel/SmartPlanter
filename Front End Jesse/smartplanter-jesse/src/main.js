import { createApp } from 'vue'
import App from './App.vue'

// Router imports
import { createRouter, createWebHistory } from 'vue-router'

// Keycloak
import Keycloak from 'keycloak-js'

// Pagina's
import DashboardPage from './pages/DashboardPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

// --- Keycloak config ---
const initOptions = {
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
  onLoad: 'login-required'
}

const keycloak = new Keycloak(initOptions)

// --- Router configuratie ---
const routes = [
  { path: '/', component: DashboardPage },
  { 
    path: '/settings',
    component: SettingsPage,
    meta: { requiresRole: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresRole) {
    const hasRole = keycloak.hasRealmRole(to.meta.requiresRole)

    if (hasRole) {
      next()
    } else {
      alert('⛔ Geen toegang: admin rechten vereist')
      next('/')
    }
  } else {
    next()
  }
})

// --- Keycloak initialisatie ---
keycloak.init({ onLoad: initOptions.onLoad })
  .then(auth => {
    if (!auth) {
      window.location.reload()
    } else {
      console.log("Authenticated")
    }

    // Token refresh
    setInterval(() => {
      keycloak.updateToken(70).then(refreshed => {
        if (refreshed) console.log("Token refreshed")
      }).catch(() => {
        console.error("Token refresh failed")
      })
    }, 60000)

    // Create Vue app
    const app = createApp(App)
    app.use(router)
    app.config.globalProperties.$keycloak = keycloak
    app.mount('#app')

  })
  .catch(() => {
    console.error("Authentication Failed")
  })
