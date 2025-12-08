import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initKeycloak } from './keycloak'

import './assets/styles/theme.css'

const app = createApp(App)

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
