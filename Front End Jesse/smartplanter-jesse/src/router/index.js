import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Notifications from '../pages/Notifications.vue'
import Data from '../pages/Data.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'
import { keycloak } from '../keycloak'

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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login({ redirectUri: window.location.origin + to.fullPath })
  } else {
    next()
  }
})

export default router
