// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './pages/DashboardPage.vue';
import Notifications from './pages/NotificationsPage.vue';
import Data from './pages/DataPage.vue';
import Settings from './pages/SettingsPage.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/notifications', component: Notifications },
  { path: '/data', component: Data },
  { path: '/settings', component: Settings },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' } // fallback
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard: wacht tot Keycloak klaar is
router.beforeEach((to, from, next) => {
  if (!window.keycloakReady && !window.keycloakInitError) {
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
