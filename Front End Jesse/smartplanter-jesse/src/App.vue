<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: "Poppins", sans-serif;
  background: var(--bg);
  margin: 0;
  padding: 0;
}

* {
  transition: background-color 0.3s ease, 
              color 0.3s ease,
              border-color 0.3s ease;
}

::selection {
  background-color: var(--primary);
  color: var(--primary-dark);
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--primary-dark);
}
::-webkit-scrollbar-thumb {
  background: var(--primary);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}
</style>
