// src/keycloak.js
import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
})

export const auth = {
  state: {
    initialized: false,
    authenticated: false,
    profile: null,
  },

  init() {
    return keycloak.init({
      onLoad: 'login-required', // 🔹 direct naar login als niet ingelogd
      pkceMethod: 'S256',
    }).then((authenticated) => {
      this.state.initialized = true
      this.state.authenticated = authenticated
      if (authenticated) {
        return keycloak.loadUserProfile().then(profile => {
          this.state.profile = profile
          return profile
        })
      }
    }).catch(err => console.error('Keycloak init failed', err))
  },

  login() {
    keycloak.login()
  },

  logout() {
    keycloak.logout({ redirectUri: window.location.origin })
  },

  token() {
    return keycloak.token
  },

  hasRole(role) {
    return keycloak.hasRealmRole(role)
  },
}

export { keycloak }
