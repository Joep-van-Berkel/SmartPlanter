import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DashboardPage from './pages/DashboardPage.vue'
import DataPage from './pages/DataPage.vue' 
import NotificationsPage from './pages/NotificationsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import Keycloak from 'keycloak-js'
import './assets/styles/theme.css'

// --- Keycloak Configuratie ---
const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/auth/',  // let op /auth/
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
})

keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: false  // voorkomt iframe issues bij sommige browsers
}).then(authenticated => {
  if (!authenticated) {
    console.warn('Niet ingelogd! Herlaad de pagina...')
    window.location.reload()
  } else {
    console.log('Succesvol ingelogd!')
    console.log('Gebruikersnaam:', keycloak.tokenParsed?.preferred_username)
    console.log('Roles:', keycloak.realmAccess?.roles)

    // --- ROUTES ---
    const routes = [
      { path: '/', component: DashboardPage },
      { path: '/data', component: DataPage },
      { path: '/notifications', component: NotificationsPage },
      { 
        path: '/settings', 
        component: SettingsPage,
        meta: { requiresRole: 'admin' } // Alleen admins
      }
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes
    })

    // --- NAVIGATION GUARD ---
    router.beforeEach((to, from, next) => {
      if (to.meta.requiresRole) {
        const hasRole = keycloak.hasRealmRole(to.meta.requiresRole)
        if (hasRole) {
          next()
        } else {
          alert('⛔ Geen toegang! Je hebt geen admin rechten.')
          next('/')
        }
      } else {
        next()
      }
    })

    // --- VUE APP ---
    const app = createApp(App)
    app.use(router)
    app.config.globalProperties.$keycloak = keycloak
    app.mount('#app')
  }
}).catch(err => {
  console.error('Keycloak init failed', err)
})
