import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'
import DashboardPage from './pages/DashboardPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
// 👇 FIX 1: Import createRouter and createWebHistory
import { createRouter, createWebHistory } from 'vue-router'

const initOptions = {
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
  onLoad: 'login-required'
}

const keycloak = new Keycloak(initOptions)

// 2. Initialiseer Keycloak
keycloak.init({ onLoad: initOptions.onLoad })
  .then((auth) => {
     if (!auth) {
       window.location.reload();
    } else {
      console.log("Authenticated");

      // --- ROUTER CONFIGURATIE ---
      const routes = [
         { path: '/', component: DashboardPage },
         { 
           path: '/setting', 
           component: SettingsPage,
           meta: { requiresRole: 'admin' } 
        }
      ]

      // 👇 FIX 2 & 3: Define the router object correctly
      const router = createRouter({ 
         history: createWebHistory(),
          routes,
      })
 
       // 3. Navigation Guard (De Bewaker)
      router.beforeEach((to, from, next) => {
         if (to.meta.requiresRole) {
           // Check of de gebruiker de rol heeft (Realm Role)
           const hasRole = keycloak.hasRealmRole(to.meta.requiresRole);
 
          // Als je Client Roles gebruikt ipv Realm roles, gebruik dan:
          // const hasRole = keycloak.hasResourceRole(to.meta.requiresRole, 'myvue');

          if (hasRole) {
          next(); // Mag doorlopen
        } else {
            alert('⛔ Geen toegang! Je hebt geen admin rechten.');
            next('/'); // Stuur terug naar home
        }
      } else {
         next(); // Publieke pagina's
      }
    })
     // --- EINDE ROUTER CONFIGURATIE ---

      // 4. Create and Mount the App only once
       const app = createApp(App)
      app.use(router) // 4. Gebruik de router
      // 3. Maak Keycloak beschikbaar in de hele app (via $keycloak)
      app.config.globalProperties.$keycloak = keycloak
      app.mount('#app')
    }

    // Token Refresh Logica (blijft hetzelfde)
    setInterval(() => {
       keycloak.updateToken(70).then((refreshed) => {
         if (refreshed) {
           console.log('Token refreshed ' + refreshed);
         }
       }).catch(() => {
         console.error('Failed to refresh token');
       });
     }, 60000)

   })
   .catch(() => {
     console.error("Authentication Failed");
   });