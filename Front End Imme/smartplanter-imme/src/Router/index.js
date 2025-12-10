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
  const keycloak = router.app.config.globalProperties.$keycloak

  // Router is nog niet klaar → ga verder
  if (!keycloak) return next()

  if (to.meta.requiresAuth && !keycloak.authenticated) {
    return keycloak.login({
      redirectUri: window.location.origin + to.fullPath
    })
  }

  next()
})

export default router
