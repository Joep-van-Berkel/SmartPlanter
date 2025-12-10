import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
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

keycloak.init({ onLoad: initOptions.onLoad })
  .then(auth => {
    if (!auth) {
      window.location.reload()
      return
    }

    console.log("Authenticated")

    const app = createApp(App)
    app.use(router)
    app.use(vuetify)

    app.config.globalProperties.$keycloak = keycloak

    app.mount('#app')

    // Token refresh
    setInterval(() => {
      keycloak.updateToken(70)
        .then(ref => {
          if (ref) console.log("Token refreshed")
        })
        .catch(() => console.error("Failed to refresh token"))
    }, 60000)
  })
  .catch(() => {
    console.error("Authentication Failed")
  })
