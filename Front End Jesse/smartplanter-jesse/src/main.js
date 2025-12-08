import { createApp, reactive } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './pages/LoginPage.vue';
import Dashboard from './pages/DashboardPage.vue';
import Notifications from './pages/NotificationsPage.vue';
import Data from './pages/DataPage.vue';
import Settings from './pages/SettingsPage.vue';
import Keycloak from 'keycloak-js';
import './assets/styles/theme.css'

// Keycloak configuratie
const initOptions = {
  url: 'https://141.148.237.73:8443/', // ⬅️ PAS AAN
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
};

const keycloak = new Keycloak(initOptions);

// Globale auth state voor UI
const authState = reactive({
  initializing: true,
  authenticated: false,
  error: null,
});

// Alle routes
const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresRole: 'user' } }, // voorbeeld role
  { path: '/notifications', component: Notifications, meta: { requiresRole: 'user' } },
  { path: '/data', component: Data, meta: { requiresRole: 'admin' } }, // admin-only
  { path: '/settings', component: Settings, meta: { requiresRole: 'user' } },
];

// Router setup
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard met Keycloak
router.beforeEach((to, from, next) => {
  if (to.meta.requiresRole) {
    if (!keycloak.authenticated) {
      keycloak.login();
      return;
    }
    const hasRole = keycloak.hasRealmRole(to.meta.requiresRole);
    if (hasRole) {
      next();
    } else {
      alert('⛔ Geen toegang! Je hebt niet de juiste rechten.');
      next('/');
    }
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);

// Keycloak helpers beschikbaar maken
app.config.globalProperties.$keycloak = keycloak;
app.config.globalProperties.$auth = {
  state: authState,
  login: () => keycloak.login(),
  logout: () => keycloak.logout({ redirectUri: window.location.origin }),
  token: () => keycloak.token,
  profile: async () => {
    if (!keycloak.authenticated) return null;
    return await keycloak.loadUserProfile();
  },
  hasRole: (role) => keycloak.hasRealmRole(role),
};

// Mount app altijd, zodat UI kan tonen dat Keycloak nog initieert
app.mount('#app');

// Keycloak init
keycloak
  .init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
  .then((authenticated) => {
    authState.authenticated = authenticated;
  })
  .catch((err) => {
    console.error('Keycloak init failed', err);
    authState.error = err?.message || String(err);
  })
  .finally(() => {
    authState.initializing = false;
  });
