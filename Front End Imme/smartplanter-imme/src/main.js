import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Keycloak from 'keycloak-js'

const vuetify = createVuetify({
  components,
  directives,
})


const initOptions = {
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-imme',
  onLoad: 'login-required'
}

const keycloak = new Keycloak(initOptions)

// 2. Initialiseer Keycloak
keycloak.init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      const app = createApp(App)
      
      // 3. Maak Keycloak beschikbaar in de hele app (via $keycloak)
      app.config.globalProperties.$keycloak = keycloak
      
      app.mount('#app')
    }

    // Token Refresh Logica
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed ' + refreshed);
        }
      }).catch(() => {
        console.error('Failed to refresh token');
      });
    }, 60000)

  })
  .catch(() => {
    console.error("Authenticated Failed");
  });