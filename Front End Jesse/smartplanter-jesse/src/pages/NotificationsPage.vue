<template>
  <SidebarNavbar />
  
  <div class="Notifications">
    <WelcomeMessage/>

    <div class="list-container">
      <div class="list-header">Belangrijke Meldingen</div>

      <div 
        v-for="(belangrijkeMelding, index) in meldingen" 
        :key="index" 
        class="list-row"
      >
        <div>{{ belangrijkeMelding.datum }}</div>
        <div>{{ belangrijkeMelding.tijd }}</div>
        <div>{{ belangrijkeMelding.tekst }}</div>
      </div>

      <!-- Optioneel: als er nog geen data is -->
      <div v-if="meldingen.length === 0" class="loading">
        Meldingen worden geladen...
      </div>
    </div>

    <div class="list-container">
      <div class="list-header">Overige Meldingen</div>

      <div 
        v-for="(melding, index) in meldingen" 
        :key="index" 
        class="list-row"
      >
        <div>{{ melding.datum }}</div>
        <div>{{ melding.tijd }}</div>
        <div>{{ melding.tekst }}</div>
      </div>

      <!-- Optioneel: als er nog geen data is -->
      <div v-if="meldingen.length === 0" class="loading">
        Meldingen worden geladen...
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage.vue';
import SidebarNavbar from '@/components/SidebarNavbar.vue';

export default {
  name: 'NotificationPage',
  components: {
    SidebarNavbar,
    WelcomeMessage
  },

  data() {
    return {
      meldingen: []
    };
  },

  async mounted() {
    try {
      const response = await fetch("");
      const data = await response.json();

      this.meldingen = data;
    } catch (error) {
      console.error("Fout bij ophalen van meldingen:", error);
    }
  }
};
</script>

<style>
.Notifications {
  min-height: 100vh;
  width: auto;
  margin-left: 5rem;
  overflow-y: hidden;
}

.list-container {
  background: var(--light);
  border-radius: 12px;
  padding: 12px;
  width: 90%;
  height: 17rem;
  margin: 2rem 0 0 3rem;
  font-family: sans-serif;
}

.list-header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text);
}

.list-row {
  display: grid;
  grid-template-columns: 100px 60px 1fr;
  padding: 6px 0;
  border-bottom: 1px solid #bcbcbc;
}

.list-row:last-child {
  border-bottom: none;
}

.loading {
  padding: 10px 0;
  color: #555;
  font-style: italic;
}
</style>
