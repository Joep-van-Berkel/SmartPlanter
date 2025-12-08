import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './keycloak'

import './assets/styles/theme.css'

const app = createApp(App)

// 🎨 Theme laden
const savedColor = localStorage.getItem('primary-color')
if (savedColor) document.documentElement.style.setProperty('--primary', savedColor)

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') document.documentElement.classList.add('dark')

// 🌐 Keycloak initialiseren en dan pas mounten
auth.init().finally(() => {
  app.use(router).mount('#app')
})
