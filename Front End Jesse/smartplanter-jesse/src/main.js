import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth, checkExistingSession } from './keycloak'

import './assets/styles/theme.css'

async function bootstrap() {
  // Eerst Keycloak sessie checken
  await checkExistingSession()

  // Dan pas de app starten
  const app = createApp(App)

  // Globale auth
  app.config.globalProperties.$auth = auth
  app.config.globalProperties.$keycloak = auth

  app.use(router)
  app.mount('#app')

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

bootstrap()
