// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from './keycloak';
import './assets/styles/theme.css';

// Status variabelen
window.keycloakReady = false;
window.keycloakInitError = false;

function initVue() {
  const app = createApp(App);
  app.config.globalProperties.$keycloak = keycloak;
  app.use(router);
  app.mount('#app');
}

// Keycloak init
keycloak.init({
  onLoad: 'login-required',
  pkceMethod: 'S256',
  checkLoginIframe: false,
  redirectUri: window.location.origin + '/dashboard'  // Altijd terug naar dashboard
}).then(authenticated => {
  if (!authenticated) {
    console.warn("Niet ingelogd, redirect naar Keycloak...");
    return keycloak.login({ redirectUri: window.location.origin + '/dashboard' });
  }

  console.log("🔐 Keycloak login OK");
  window.keycloakReady = true;

  // Vue pas mounten na succesvolle login
  initVue();

}).catch(err => {
  console.error("❌ Keycloak init failed", err);
  window.keycloakInitError = true;

  // Vue alsnog mounten zodat app bruikbaar blijft
  initVue();
});
