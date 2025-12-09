// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './pages/DashboardPage.vue';
import Notifications from './pages/NotificationsPage.vue';
import Data from './pages/DataPage.vue';
import Settings from './pages/SettingsPage.vue';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/notifications', component: Notifications },
  { path: '/data', component: Data },
  { path: '/settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
