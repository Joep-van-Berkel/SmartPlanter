import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from './pages/DashboardPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

// --- KEYCLOAK CONFIG ---
const initOptions = {
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
  onLoad: 'login-required'
}

const keycloak = new Keycloak(initOptions)

// --- ROUTER CONFIGURATIE ---
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

// --- NAVIGATION GUARD ---
router.beforeEach((to, from, next) => {
  if (to.meta.requiresRole) {
    const hasRole = keycloak.hasRealmRole(to.meta.requiresRole)

    if (hasRole) next()
    else {
      alert('⛔ Geen toegang! Je hebt geen admin rechten.')
      next('/')
    }
  } else {
    next()
  }
})

// --- INITIALISEER KEYCLOAK ---
keycloak.init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) return window.location.reload()

    console.log("Authenticated")

    const app = createApp(App)

    // Keycloak beschikbaar in hele app
    app.config.globalProperties.$keycloak = keycloak

    app.use(router)
    app.mount('#app')

    // Token auto-refresh
    setInterval(() => {
      keycloak.updateToken(70)
        .then((refreshed) => {
          if (refreshed) console.log('🔄 Token refreshed')
        })
        .catch(() => 
          console.error('❌ Failed to refresh token'))
    }, 60000)
  })
  .catch((error) => {
  console.error("Authentication Failed");
  console.error(error);
});
