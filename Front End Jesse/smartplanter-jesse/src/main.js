import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth, checkExistingSession } from './keycloak'

import './assets/styles/theme.css'

const app = createApp(App)

// Globale Keycloak helpers
app.config.globalProperties.$auth = auth

// Functie om app pas te mounten als Keycloak klaar is
async function startApp() {
  // Wacht tot bestaande sessie gecontroleerd is
  await checkExistingSession()

  // Mount de app pas nu
  app.use(router).mount('#app')

  // Theme instellingen
  const savedColor = localStorage.getItem('primary-color')
  if (savedColor) {
    document.documentElement.style.setProperty('--primary', savedColor)
  }
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }
}

startApp()
