// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'
import router, { setKeycloak } from './router'

// --- KEYCLOAK CONFIG ---
const initOptions = {
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
  onLoad: 'login-required'
}

const keycloak = new Keycloak(initOptions)

// Keycloak doorgeven aan router guards
setKeycloak(keycloak)

// --- INITIALISEER KEYCLOAK ---
keycloak.init({
  onLoad: initOptions.onLoad,
  pkceMethod: 'S256'
})
  .then((auth) => {
    if (!auth) {
      console.warn("⚠️ Keycloak authentication failed or canceled.")
      return
    }

    console.log("Authenticated")

    const app = createApp(App)

    // Keycloak beschikbaar in hele app
    app.config.globalProperties.$keycloak = keycloak

    app.use(router)
    app.mount('#app')

    // TOKEN AUTO-REFRESH
    setInterval(() => {
      keycloak.updateToken(70)
        .then((refreshed) => {
          if (refreshed) console.log('🔄 Token refreshed')
        })
        .catch(() => console.error('❌ Failed to refresh token'))
    }, 60000)
  })
  .catch((error) => {
    console.error("Authentication Failed")
    console.error(error)
  })
