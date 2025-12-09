import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DashboardPage from './pages/DashboardPage.vue'
import DataPage from './pages/DataPage.vue' 
import NotificationsPage from './pages/NotificationsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import Keycloak from 'keycloak-js'
import './assets/styles/theme.css'

// --- Keycloak Configuratie ---
const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443', // jouw Keycloak server root
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
})

// --- Extra debug functie om OpenID config te checken ---
async function checkRealmConfig() {
  const url = `https://141.148.237.73:8443/realms/smartplanter/.well-known/openid-configuration`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error('Fout bij ophalen realm config:', res.status, res.statusText)
      return false
    }
    const data = await res.json()
    console.log('Realm config OK:', data)
    return true
  } catch (err) {
    console.error('Kan realm config niet ophalen:', err)
    return false
  }
}

// --- Functie om Keycloak te initialiseren ---
async function initKeycloak() {
  // --- Opschonen van oude tokens/URL fragmenten ---
  localStorage.clear()
  sessionStorage.clear()
  window.history.replaceState({}, document.title, "/")

  const realmOk = await checkRealmConfig()
  if (!realmOk) {
    alert('Kon Keycloak realm config niet ophalen. Controleer URL, netwerk en SSL.')
    return
  }

  try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      enableLogging: true,
      pkceMethod: 'S256',           // PKCE verplicht voor moderne SPA clients
      responseMode: 'query',         // voorkomt Invalid nonce errors
      redirectUri: window.location.origin // expliciet redirectUri
    })

    console.log('Keycloak init successful')
    console.log('Authenticated:', authenticated)

    if (!authenticated) {
      console.warn('Niet ingelogd! Herlaad de pagina...')
      window.location.reload()
      return
    }

    console.log('Gebruikersnaam:', keycloak.tokenParsed?.preferred_username)
    console.log('Roles:', keycloak.realmAccess?.roles)

    // --- Token auto-refresh (elke 60 seconden) ---
    setInterval(() => {
      keycloak.updateToken(30).then(refreshed => {
        if (refreshed) {
          console.log('Token vernieuwd')
        }
      }).catch(err => {
        console.warn('Token refresh failed', err)
      })
    }, 60000)

    // --- ROUTES ---
    const routes = [
      { path: '/', component: DashboardPage },
      { path: '/data', component: DataPage },
      { path: '/notifications', component: NotificationsPage },
      { 
        path: '/settings', 
        component: SettingsPage,
        meta: { requiresRole: 'admin' } // Alleen admins
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
        console.log(`Checking role for route ${to.path}:`, hasRole)
        if (hasRole) {
          next()
        } else {
          alert('⛔ Geen toegang! Je hebt geen admin rechten.')
          next('/')
        }
      } else {
        next()
      }
    })

    // --- VUE APP ---
    const app = createApp(App)
    app.use(router)
    app.config.globalProperties.$keycloak = keycloak
    app.mount('#app')

  } catch (err) {
    console.error('Keycloak init failed:', err)
    if (err && err.message) console.error('Error message:', err.message)
    else console.error('Full error object:', JSON.stringify(err))
    alert('Keycloak init failed. Check console for details.')
  }
}

// --- Start Keycloak en app ---
initKeycloak()
