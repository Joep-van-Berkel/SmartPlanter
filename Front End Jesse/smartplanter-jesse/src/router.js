import { createRouter, createWebHistory } from 'vue-router'
import { keycloak } from './keycloak'

// Pages
import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import Notifications from './pages/Notifications.vue'
import Data from './pages/Data.vue'
import Settings from './pages/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
    meta: { requiresAuth: true },
  },
  {
    path: '/data',
    name: 'Data',
    component: Data,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/* -------------------------------------------------------
   Global Route Guard (Keycloak beveiliging)
--------------------------------------------------------*/
router.beforeEach((to, from, next) => {
  // 1. Als route login-pagina is, maar je bent al ingelogd → direct naar dashboard
  if (to.meta.requiresGuest && keycloak.authenticated) {
    return next('/dashboard')
  }

  // 2. Als route auth nodig heeft
  if (to.meta.requiresAuth) {
    // Niet ingelogd → start Keycloak login flow
    if (!keycloak.authenticated) {
      return keycloak.login({
        redirectUri: window.location.origin + to.fullPath,
      })
    }
  }

  // 3. Alles ok → gewoon door
  next()
})

export default router
