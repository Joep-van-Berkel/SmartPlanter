<template>
    <NavBar/>
  <router-view/>
  <FooterBar/>


</template>

<script>
import FooterBar from './components/FooterBar.vue';
import NavBar from './components/NavBar.vue';



export default {
  name: 'App',
  components: {
    FooterBar, NavBar,
  data() {
    return {
      username: '',
      token: ''
    }
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
}
}

</script>

<style>

#app{
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

footer {
  margin-top: auto;
}

NavBar {
  margin-top: auto;
}

body {
  background: #46e94862; 
  /* background: #8cc68d62; */
  /*background: #9dffb17d; */
}

</style>