// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://141.148.237.73:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
});

export default keycloak;
