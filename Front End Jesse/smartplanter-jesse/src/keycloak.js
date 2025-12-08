import Keycloak from 'keycloak-js'
import { reactive } from 'vue'

const initOptions = {
  url: 'https://141.148.237.73:8443/', // PAS AAN
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
}

export const keycloak = new Keycloak(initOptions)

// Globale reactive auth state
export const authState = reactive({
  initializing: true,
  authenticated: false,
  error: null,
})

// Helper object voor Vue components
export const auth = {
  state: authState,
  login: () => keycloak.login({ redirectUri: window.location.origin }),
  logout: () => keycloak.logout({ redirectUri: window.location.origin }),
  token: () => keycloak.token,
  profile: async () => {
    if (!keycloak.authenticated) return null
    return await keycloak.loadUserProfile()
  },
  hasRole: (role) => keycloak.hasRealmRole(role),
}

// Init Keycloak en voer callback uit als klaar
export function initKeycloak(onReady) {
  keycloak
    .init({
      onLoad: 'check-sso', // check sessie zonder redirect
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    })
    .then((authenticated) => {
      authState.authenticated = authenticated
      onReady()
    })
    .catch((err) => {
      console.error('Keycloak init failed', err)
      authState.error = err?.message || String(err)
      onReady()
    })
    .finally(() => {
      authState.initializing = false
    })
}
