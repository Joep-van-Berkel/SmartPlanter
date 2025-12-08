import Keycloak from 'keycloak-js'
import { reactive } from 'vue'

// --- Keycloak configuratie ---
const initOptions = {
  url: 'https://141.148.237.73:8443/', // PAS AAN
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
}

// Keycloak instantie
export const keycloak = new Keycloak(initOptions)

// --- Globale reactive auth state ---
export const authState = reactive({
  initializing: false, // false: init pas bij login of check-sso
  authenticated: false,
  error: null,
  userProfile: null,
})

// --- Helper object voor Vue components ---
export const auth = {
  state: authState,

  login: async (redirectUri = window.location.origin) => {
    authState.initializing = true
    try {
      await keycloak.init({
        onLoad: 'login-required', // start login flow
        pkceMethod: 'S256',
        redirectUri,
      })
      authState.authenticated = keycloak.authenticated
      authState.userProfile = await keycloak.loadUserProfile()
    } catch (err) {
      console.error('Keycloak login failed', err)
      authState.error = err?.message || String(err)
    } finally {
      authState.initializing = false
    }
  },

  logout: (redirectUri = window.location.origin) => {
    keycloak.logout({ redirectUri })
    authState.authenticated = false
    authState.userProfile = null
  },

  token: () => keycloak.token,

  profile: async () => {
    if (!keycloak.authenticated) return null
    if (!authState.userProfile) {
      authState.userProfile = await keycloak.loadUserProfile()
    }
    return authState.userProfile
  },

  hasRole: (role) => keycloak.hasRealmRole(role),
}

// --- Soft init: check bestaande sessie zonder redirect ---
export async function checkExistingSession() {
  authState.initializing = true
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso', // check sessie zonder redirect
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    })
    authState.authenticated = authenticated
    if (authenticated) {
      authState.userProfile = await keycloak.loadUserProfile()
    }
  } catch (err) {
    console.warn('No existing session', err)
  } finally {
    authState.initializing = false
  }
}
