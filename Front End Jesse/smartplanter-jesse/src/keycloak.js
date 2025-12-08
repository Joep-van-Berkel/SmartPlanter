import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
})

const initKeycloak = (onAuthenticatedCallback) => {
  keycloak.init({
    onLoad: 'login-required', // 'check-sso' als je login optioneel wilt
    checkLoginIframe: false,   // voorkomt CORS issues
  }).then(authenticated => {
    if (authenticated) {
      onAuthenticatedCallback()
    } else {
      keycloak.login()
    }
  })
}

const logout = () => {
  keycloak.logout()
}

const getToken = () => keycloak.token

const getUsername = () => keycloak.tokenParsed?.preferred_username

export { keycloak, initKeycloak, logout, getToken, getUsername }
