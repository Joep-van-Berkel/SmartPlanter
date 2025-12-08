// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Notifications from '../pages/Notifications.vue'
import Data from '../pages/Data.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/notifications', component: Notifications, meta: { requiresAuth: true } },
  { path: '/data', component: Data, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard
router.beforeEach((to, from, next) => {
  const keycloak = window.keycloak // keycloak global beschikbaar maken in main.js
  if (to.meta.requiresAuth && keycloak && !keycloak.authenticated) {
    keycloak.login() // stuurt gebruiker naar Keycloak login
  } else {
    next()
  }
})

export default router
