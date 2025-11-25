import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Account from '../pages/Account.vue'
import Data from '../pages/Data.vue'
import Notificaties from '../pages/Notificaties.vue'

const routes = [
    {path: '/', component: Login},
    {path: '/home', component: Home},
    {path: '/account', component: Account},
    {path: '/data',  component: Data},
    {path: '/notificaties', component: Notificaties}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
