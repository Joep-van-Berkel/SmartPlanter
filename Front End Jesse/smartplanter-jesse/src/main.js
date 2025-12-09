// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from './keycloak';
import './assets/styles/theme.css';

function initVue() {
  const app = createApp(App);

  // Keycloak beschikbaar in alle components
  app.config.globalProperties.$keycloak = keycloak;

  app.use(router);
  app.mount('#app');
}

keycloak.init({
  onLoad: 'login-required', // verplicht inloggen
  pkceMethod: 'S256',
}).then((authenticated) => {
  if (authenticated) {
    console.log("🔐 Keycloak login OK");
    initVue();
    // Na login ga je altijd naar dashboard
    router.push('/dashboard');
  } else {
    console.warn("❌ Niet ingelogd, redirect naar Keycloak");
    keycloak.login();
  }
});
