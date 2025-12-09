import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DashboardPage from './pages/DashboardPage.vue'
import DataPage from './pages/DataPage.vue' 
import NotificationsPage from './pages/NotificationsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import Keycloak from 'keycloak-js'
import './assets/styles/theme.css';

// Keycloak configuratie
const initOptions = {
  url: 'https://141.148.237.73:8443/', 
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
  pkceMethod: 'S256',
  onLoad: 'login-required'
};

const keycloak = new Keycloak(initOptions);

// 🔥 BELANGRIJK: pkceMethod moet hier in init() staan
keycloak.init({
  onLoad: initOptions.onLoad,
  pkceMethod: initOptions.pkceMethod
})
.then((auth) => {
  if (!auth) {
    window.location.reload();
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

  // Role protection
  router.beforeEach((to, from, next) => {
    if (to.meta.requiresRole) {
      const hasRole = keycloak.hasRealmRole(to.meta.requiresRole);

      if (hasRole) {
        next();
      } else {
        alert('⛔ Geen toegang! Je hebt geen admin rechten.');
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
.catch((error) => {
  console.error(error);
  console.error("Authentication Failed");
});
