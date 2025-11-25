<template>

  <router-view/>
  <FooterBar/>

</template>

<script>
import FooterBar from './components/FooterBar.vue';


export default {
  name: 'App',
  components: {
    FooterBar
  }
}

</script>

<style>

#app{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

* {
  margin: 0;
  padding: 0;
}

footer {
  margin-top: auto;
}

</style>
