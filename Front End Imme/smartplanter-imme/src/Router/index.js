import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Account from '../pages/Account.vue'
import Data from '../pages/Data.vue'
import Notificaties from '../pages/Notificaties.vue'

const routes = [
    {path: '/', component: Login},
    {path: '/home', component: Home, meta: { requiresAuth: true }},
    {path: '/account', component: Account},
    {path: '/data',  component: Data},
    {path: '/notificaties', component: Notificaties}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const app = router.app
  if (!app) return next()   // Router is nog niet klaar

  const keycloak = app.config.globalProperties.$keycloak

  if (to.meta.requiresAuth && !keycloak.authenticated) {
    return keycloak.login({ redirectUri: window.location.origin + to.path })
  }

  next()
})
export default router
