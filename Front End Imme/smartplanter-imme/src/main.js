// main.js - Aangepaste code voor initiële navigatie
import { createApp } from 'vue'
import App from './App.vue'
import router from './Router' // Zorg ervoor dat dit de geëxporteerde router is
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

const app = createApp(App)

keycloak.init({ onLoad: initOptions.onLoad })
  .then(auth => {
    if (!auth) {
     window.location.reload()
    return
  }

   console.log("Authenticated")

    window.$keycloak = keycloak
   app.config.globalProperties.$keycloak = keycloak
    
    app.use(router)
    app.use(vuetify)


    router.isReady().then(() => {
        app.mount('#app')
    })

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