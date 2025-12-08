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


const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend'
})


keycloak.init({ checkLoginIframe: false, enableLogging: true })
  .then(() => {
    const app = createApp(App)
    app.config.globalProperties.$keycloak = keycloak
    app.use(router)
    app.mount('#app')
  })
  .catch(err => console.error('❌ Keycloak init failed', err))
