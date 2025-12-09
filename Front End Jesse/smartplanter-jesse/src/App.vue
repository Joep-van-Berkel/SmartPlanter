<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      username: '',
      token: ''
    };
  },
  mounted() {
    // Haal de instantie op die we in main.js hebben ingesteld
    const keycloak = this.$keycloak;
    
    if (keycloak && keycloak.authenticated) {
      // Probeer username uit diverse velden te halen
      this.username = keycloak.tokenParsed.preferred_username || keycloak.tokenParsed.name || 'Gebruiker';
      this.token = keycloak.token;
    }
  },
  methods: {
    logout() {
      this.$keycloak.logout();
    }
  }
};
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

router-view {
  flex: 1;
}

* {
  margin: 0;
  padding: 0;
}

body {
  background: #46e94862; 
  /* background: #8cc68d62; */
  /* background: #9dffb17d; */
}
</style>
