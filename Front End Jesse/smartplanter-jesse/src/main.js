import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/styles/theme.css'   

createApp(App).use(router).mount('#app')

// main.js
const savedColor = localStorage.getItem('primary-color');
if (savedColor) {
  document.documentElement.style.setProperty('--primary', savedColor);
}

// eventueel ook theme herstellen
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}