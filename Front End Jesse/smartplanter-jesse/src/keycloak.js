// src/keycloak.js
import Keycloak from 'keycloak-js';
import { reactive } from 'vue';

const keycloakConfig = {
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
};

export const keycloak = new Keycloak(keycloakConfig);

export const auth = reactive({
  initializing: true,
  authenticated: false,
  error: null,
  profile: null,
});

// Init Keycloak
keycloak
  .init({
    onLoad: 'check-sso',              // check session without redirect
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
  .then(async (authenticated) => {
    auth.authenticated = authenticated;
    if (authenticated) {
      auth.profile = await keycloak.loadUserProfile();
    }
  })
  .catch((err) => {
    console.error('Keycloak init failed', err);
    auth.error = err?.message || String(err);
  })
  .finally(() => {
    auth.initializing = false;
  });

// Helper functions
export function login() {
  keycloak.login();
}

export function logout() {
  keycloak.logout({ redirectUri: window.location.origin });
}

export function hasRole(role) {
  if (!keycloak.authenticated) return false;
  return keycloak.hasRealmRole(role);
}

export function token() {
  return keycloak.token;
}
