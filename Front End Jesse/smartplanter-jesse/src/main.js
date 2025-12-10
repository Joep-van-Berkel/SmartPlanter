import { createApp } from 'vue';
import App from './App.vue';
import Keycloak from 'keycloak-js';

// --- STAP 1: Keycloak Configuratie ---
const initOptions = {
  // 💡 BELANGRIJK: Gebruik HIER uw externe HTTPS URL
     url: 'https://141.148.237.73:8443', // ⬅️ PAS DIT AAN
     realm: 'smartplanter',
     clientId: 'frontend-jesse',
};

const keycloak = new Keycloak(initOptions);

// --- STAP 2: Initialisatie en App Opstarten ---
keycloak
  .init({
    onLoad: 'login-required', // Dwingt de gebruiker om in te loggen bij het opstarten
    pkceMethod: 'S256', // Aanbevolen beveiligingsmethode
  })
  .then((authenticated) => {
    if (authenticated) {
      console.log('Gebruiker is succesvol geauthenticeerd');

      // Maak de Keycloak-instantie globaal beschikbaar in de Vue-app
      const app = createApp(App);
      app.config.globalProperties.$keycloak = keycloak;
      app.mount('#app');
    } else {
      console.log('Authenticatie mislukt of gebruiker is uitgelogd');
    }
  })
  .catch((e) => {
    console.error('Fout bij het initialiseren van Keycloak:', e);
  });
