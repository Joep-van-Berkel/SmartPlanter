// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://jouw-keycloak-server:8443/',
  realm: 'smartplanter',
  clientId: 'frontend-jesse',
});

export default keycloak;
