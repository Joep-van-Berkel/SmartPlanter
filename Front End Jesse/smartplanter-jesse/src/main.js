// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // je router importeren
import Keycloak from 'keycloak-js'

// 1. Configuratie
const initOptions = {
  url: 'https://JOUW-KEYCLOAK-URL-HIER/',
  realm: 'myrealm',
  clientId: 'myvue',
  onLoad: 'login-required' 
}

const keycloak = new Keycloak(initOptions)

// 2. Initialiseer Keycloak
keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");

    const app = createApp(App)

    // Keycloak beschikbaar maken in de app
    app.config.globalProperties.$keycloak = keycloak

    // 3. Voeg router toe **na authenticatie**
    app.use(router)

    app.mount('#app')
  }

  // Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed ' + refreshed);
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 60000)

}).catch(() => {
  console.error("Authentication Failed");
});
