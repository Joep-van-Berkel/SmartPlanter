// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './pages/DashboardPage.vue';
import Notifications from './pages/NotificationsPage.vue';
import Data from './pages/DataPage.vue';
import Settings from './pages/SettingsPage.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },   // ← Belangrijk
  { path: '/dashboard', component: Dashboard },
  { path: '/notifications', component: Notifications },
  { path: '/data', component: Data },
  { path: '/settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Wacht totdat Keycloak is ingelogd
router.beforeEach((to, from, next) => {
  if (!window.keycloakReady && !window.keycloakInitError) {
    // wacht elke 50ms tot keycloak klaar is
    const wait = setInterval(() => {
      if (window.keycloakReady || window.keycloakInitError) {
        clearInterval(wait);
        next();
      }
    }, 50);
  } else {
    next();
  }
});

export default router;
