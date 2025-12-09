import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DashboardPage from './pages/DashboardPage.vue'
import DataPage from './pages/DataPage.vue' 
import NotificationsPage from './pages/NotificationsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import Keycloak from 'keycloak-js'
import './assets/styles/theme.css';

const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
});

keycloak.init({
  onLoad: 'login-required',
  pkceMethod: 'S256',
  checkLoginIframe: false,       // <- voorkomt reload loop
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
})
.then(auth => {
  if (!auth) {
    window.location.reload();    // <- correcte handling
    return;
  }

  // --- ROUTER ---
  const routes = [
    { path: '/', component: DashboardPage },
    { path: '/data', component: DataPage },
    { path: '/notifications', component: NotificationsPage },
    { 
      path: '/settings',
      component: SettingsPage,
      meta: { requiresRole: 'admin' }
    }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresRole) {
      if (keycloak.hasRealmRole(to.meta.requiresRole)) {
        next();
      } else {
        alert("⛔ Geen toegang! Je hebt geen admin rechten.");
        next('/');
      }
    } else {
      next();
    }
  });

  const app = createApp(App);
  app.use(router);
  app.config.globalProperties.$keycloak = keycloak;
  app.mount('#app');
})
.catch(err => {
  console.error("Keycloak init failed:", err);
});
