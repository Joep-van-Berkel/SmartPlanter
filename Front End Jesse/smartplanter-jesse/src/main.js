import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { keycloak, auth } from './keycloak';

import './assets/styles/theme.css';

// Theme settings
const savedColor = localStorage.getItem('primary-color');
if (savedColor) document.documentElement.style.setProperty('--primary', savedColor);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.documentElement.classList.add('dark');

const app = createApp(App);

// Make keycloak available globally
app.config.globalProperties.$keycloak = keycloak;
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$login = () => keycloak.login();
app.config.globalProperties.$logout = () => keycloak.logout({ redirectUri: window.location.origin });
app.config.globalProperties.$hasRole = (role) => keycloak.hasRealmRole(role);

app.use(router).mount('#app');
