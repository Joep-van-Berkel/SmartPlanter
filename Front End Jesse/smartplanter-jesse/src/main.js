// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Keycloak from 'keycloak-js'

// --- 1. Keycloak configuratie ---
const keycloakConfig = {
  url: 'https://141.148.237.73:8443/', // Pas aan naar jouw Keycloak URL
  realm: 'smartplanter',               // Jouw realm
  clientId: 'frontend-jesse',          // Jouw client ID
  onLoad: 'login-required',            // Login verplicht bij load
}

// --- 2. Keycloak initialisatie ---
const keycloak = new Keycloak(keycloakConfig)

// Maak Keycloak tijdelijk beschikbaar voor router guards
window.keycloak = keycloak

keycloak.init({ 
  onLoad: keycloakConfig.onLoad,
  checkLoginIframe: false // voorkomt iframe errors bij SPA
})
.then((authenticated) => {
  if (!authenticated) {
    console.warn('Niet geauthenticeerd, forceer login')
    keycloak.login()
  } else {
    console.log('✅ Keycloak geauthenticeerd')

    // --- 3. Vue app mounten ---
    const app = createApp(App)

    // Keycloak beschikbaar maken in alle componenten via this.$keycloak
    app.config.globalProperties.$keycloak = keycloak

    // Router gebruiken
    app.use(router)

    app.mount('#app')

    // --- 4. Token refresh interval (optioneel) ---
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('🔄 Token refreshed')
        }
      }).catch(() => {
        console.error('❌ Token refresh failed')
      })
    }, 60000) // elke 60 seconden
  }
})
.catch((err) => {
  console.error('❌ Keycloak init error:', err)
})
