import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initKeycloak, auth, keycloak } from './keycloak'

import './assets/styles/theme.css'

const app = createApp(App)

// Maak Keycloak helpers beschikbaar in alle components
app.config.globalProperties.$keycloak = keycloak
app.config.globalProperties.$auth = auth

// Init Keycloak en mount App als klaar
initKeycloak(() => {
  app.use(router).mount('#app')
})

// Theme instellingen
const savedColor = localStorage.getItem('primary-color')
if (savedColor) {
  document.documentElement.style.setProperty('--primary', savedColor)
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}
