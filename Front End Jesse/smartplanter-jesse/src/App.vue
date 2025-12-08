<template>
  
  <router-view />
  
</template>

<script>





export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: "Poppins", sans-serif;
  background: var(--bg);
}

* {
  transition: background-color 0.3s ease, 
              color 0.3s ease,
              border-color 0.3s ease;
}

::selection {
  background-color: var(--primary); /* achtergrondkleur van selectie */
  color: var(--primary-dark); /* tekstkleur tijdens selectie */
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--primary-dark);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--primary);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}


</style>
