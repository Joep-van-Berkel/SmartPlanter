import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth, checkExistingSession } from './keycloak'

import './assets/styles/theme.css'

const app = createApp(App)

// Globale Keycloak helpers
app.config.globalProperties.$auth = auth

// Mount app direct (toon login pagina als nodig)
app.use(router).mount('#app')

// Check bestaande sessie (silent login)
checkExistingSession()

// Theme instellingen
const savedColor = localStorage.getItem('primary-color')
if (savedColor) {
  document.documentElement.style.setProperty('--primary', savedColor)
}
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}
