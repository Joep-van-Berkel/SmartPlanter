<template>
  <section>
    <h1>We zouden nu in de moestuin pagina mogen zitten</h1>
    <button class="api-test" @click="testAPI">Test van API</button>
  </section>
</template>

<script>
export default {
  name: 'HomePagina',

  methods: {
    async testAPI() {
      try {
        const response = await fetch('https://158.101.223.137:1880/mongotest?device_id=devide1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Netwerkfout: ' + response.status);
        }

        const data = await response.json();
        console.log('Opgehaalde data:', data);

      } catch (error) {
        console.error('Fout bij ophalen data:', error);
      }
    }
  }
}
</script>

<style>
h1 {
  color: rgb(0, 0, 0);
}

.api-test {
  color: white;
  background-color: blue;
  border-radius: 5%;
}
</style>
