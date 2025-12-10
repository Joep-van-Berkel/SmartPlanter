// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'
import router, { setKeycloak } from './router'
import './assets/styles/theme.css'

// --- KEYCLOAK CONFIG ---
const initOptions = {
  url: 'https://141.148.237.73:8443',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
}

const keycloak = new Keycloak(initOptions)

// Doorsturen naar router guards
setKeycloak(keycloak)

// --- HANDIGE FUNCTIONS TOEVOEGEN ---
function buildUserObject() {
  if (!keycloak.tokenParsed) return null

  return {
    username: keycloak.tokenParsed.preferred_username,
    email: keycloak.tokenParsed.email,
    firstName: keycloak.tokenParsed.given_name,
    lastName: keycloak.tokenParsed.family_name,
    fullName:
      (keycloak.tokenParsed.given_name ?? '') +
      ' ' +
      (keycloak.tokenParsed.family_name ?? ''),
    firstLetter:
      keycloak.tokenParsed.given_name?.charAt(0)?.toUpperCase() ??
      keycloak.tokenParsed.preferred_username?.charAt(0)?.toUpperCase() ??
      '?',
  }
}

// Globale AUTH helper
const auth = {
  keycloak,

  // User info ophalen
  get user() {
    return buildUserObject()
  },

  // Logout functie
  logout() {
    keycloak.logout({
      redirectUri: window.location.origin,
    })
  },

  // Token vernieuwen
  refresh() {
    return keycloak.updateToken(60)
  },
}

// --- INITIALISEER KEYCLOAK ---
keycloak
  .init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
  })
  .then((authSuccess) => {
    if (!authSuccess) {
      console.warn('⚠️ Keycloak authentication failed or canceled.')
      return
    }

    console.log('Authenticated')

    const app = createApp(App)

    // Globale AUTH object beschikbaar in hele app
    app.config.globalProperties.$auth = auth

    app.use(router)
    app.mount('#app')

    // TOKEN AUTO-REFRESH
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) console.log('🔄 Token refreshed')
        })
        .catch(() => console.error('❌ Failed to refresh token'))
    }, 60000)
  })
  .catch((error) => {
    console.error('❌ Authentication Failed')
    console.error(error)
  })
