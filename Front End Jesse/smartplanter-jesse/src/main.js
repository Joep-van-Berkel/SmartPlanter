// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from './keycloak';
import './assets/styles/theme.css';

// KEYCLOAK STATUS
window.keycloakReady = false;
window.keycloakInitError = false;

// Start Vue onmiddelijk
const app = createApp(App);
app.config.globalProperties.$keycloak = keycloak;
app.use(router);
app.mount('#app');

// Start Keycloak async
keycloak.init({
  onLoad: 'login-required',
  pkceMethod: 'S256',
  checkLoginIframe: false,
}).then(authenticated => {
  if (!authenticated) {
    return keycloak.login();
  }

  console.log("🔐 Keycloak login OK");

  window.keycloakReady = true;

}).catch(err => {
  console.error("❌ Keycloak init failed", err);
  window.keycloakInitError = true;
});
