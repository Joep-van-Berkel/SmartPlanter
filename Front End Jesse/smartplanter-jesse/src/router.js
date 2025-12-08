import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Dashboard from './pages/Dashboard.vue';
import Notifications from './pages/Notifications.vue';
import Data from './pages/Data.vue';
import Settings from './pages/Settings.vue';
import { keycloak } from './keycloak';

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/notifications', component: Notifications, meta: { requiresAuth: true } },
  { path: '/data', component: Data, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true, requiresRole: 'admin' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login();
    return;
  }

  if (to.meta.requiresRole) {
    if (!keycloak.authenticated) {
      keycloak.login();
      return;
    }

    if (!keycloak.hasRealmRole(to.meta.requiresRole)) {
      alert('⛔ Geen toegang! Je hebt geen admin rechten.');
      next('/');
      return;
    }
  }

  next();
});

export default router;
