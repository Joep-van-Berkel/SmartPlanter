import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router' // 1. Importeer router
import App from './App.vue'
import DashboardPage from './pages/DashboardPage.vue'
import DataPage from './pages/DataPage.vue' 
import NotificationsPage from './pages/NotificationsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import Keycloak from 'keycloak-js'
import './assets/styles/theme.css';

const initOptions = {
  url: 'https://141.148.237.73:8443/', 
  //url: 'https://aaad02.avans.nl:8443/', 
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
  onLoad: 'login-required',
  pkceMethod: 'S256'
}

const keycloak = new Keycloak(initOptions)

keycloak.init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      
      // --- ROUTER CONFIGURATIE ---
      
      const routes = [
        { path: '/', component: DashboardPage },
        { path: '/data', component: DataPage },
        { path: '/notifications', component: NotificationsPage },
        { 
          path: '/settings', 
          component: SettingsPage,
          meta: { requiresRole: 'admin' } // 2. Markeer deze route als beschermd
        }
      ]

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

      const app = createApp(App)
      app.use(router) // 4. Gebruik de router
      app.config.globalProperties.$keycloak = keycloak
      app.mount('#app')
    }
  })
  .catch((error) => {
    console.error(error);
    console.error("Authentication Failed");
  });