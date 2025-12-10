import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Account from '../pages/Account.vue'
import Data from '../pages/Data.vue'
import Notificaties from '../pages/Notificaties.vue'

const routes = [
  { path: '/home', component: Home, meta: { requiresAuth: true }},
  { path: '/account', component: Account },
  { path: '/data', component: Data },
  { path: '/notificaties', component: Notificaties }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Gebruik window of de globalProperties via getCurrentInstance als je wilt
  const keycloak = window.$keycloak 

  if (!keycloak) return next()

  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login({ redirectUri: window.location.origin + to.fullPath })
    return
  }

  next()
})

export default router
