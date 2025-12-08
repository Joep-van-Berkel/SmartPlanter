import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Keycloak from 'keycloak-js'
import './assets/styles/theme.css'

// Restore theme
const savedColor = localStorage.getItem('primary-color')
if (savedColor) document.documentElement.style.setProperty('--primary', savedColor)
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') document.documentElement.classList.add('dark')

// Keycloak config (instance aanmaken, geen redirect)
const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse'
})

// Alleen init om de instance beschikbaar te maken
keycloak.init({ checkLoginIframe: false, enableLogging: true })
  .then(() => {
    const app = createApp(App)
    app.config.globalProperties.$keycloak = keycloak
    app.use(router)
    app.mount('#app')
  })
  .catch(err => console.error('❌ Keycloak init failed', err))
