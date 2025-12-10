<template>
  <div class="garden-container">
    <div v-for="(buis, buisIndex) in moestuinLayout" :key="buisIndex" class="moestuinbuis">
      <div v-for="(slot, slotIndex) in buis.slots" :key="slotIndex" class="slot-wrapper">
        <button @click="toggleDropdown(buisIndex, slotIndex)" class="plant-slot-button">
          {{ slot.plant ? slot.plant : '+' }}
        </button>

        <div v-if="slot.showDropdown" class="dropdown-menu">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Zoek groente/fruit..." 
            class="search-input"
          />
          <div class="plant-list">
            <div 
              v-for="plant in filteredPlants" 
              :key="plant" 
              @click="selectPlant(buisIndex, slotIndex, plant)"
              class="plant-item"
            >
              {{ plant }}
            </div>
            <div v-if="filteredPlants.length === 0" class="no-results">
                Geen resultaten gevonden.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePagina',
  data() {
    const createBuis = () => ({
      slots: Array(4).fill(null).map(() => ({ plant: null, showDropdown: false }))
    });

    return {
      searchQuery: '',
      allePlanten: [
        'Tomaat', 'Wortel', 'Broccoli', 'Sla', 'Aardbei', 
        'Komkommer', 'Paprika', 'Aubergine', 'Courgette', 
        'Appel', 'Radijs', 'Framboos', 'Ui', 'Knoflook', 
        'Bramen', 'Basilicum'
     ],
      moestuinLayout: [
        createBuis(),
        createBuis(),
         createBuis(),
     ]
    };
  },
  computed: {
    // Berekent welke planten getoond moeten worden op basis van de zoekterm
    filteredPlants() {
      if (!this.searchQuery) {
        return this.allePlanten;
      }
      const searchLower = this.searchQuery.toLowerCase();
      return this.allePlanten.filter(plant => 
        plant.toLowerCase().includes(searchLower)
      );
    }
  },
  methods: {
    // Schakelt de dropdown in of uit voor een specifiek slot
    toggleDropdown(buisIndex, slotIndex) {
      // Zorg ervoor dat alle andere dropdowns gesloten zijn
      this.closeAllDropdowns();
      
      // Toggle de status van de geklikte dropdown
      this.moestuinLayout[buisIndex].slots[slotIndex].showDropdown = 
        !this.moestuinLayout[buisIndex].slots[slotIndex].showDropdown;

      // Reset de zoekterm wanneer een dropdown opent
      if (this.moestuinLayout[buisIndex].slots[slotIndex].showDropdown) {
          this.searchQuery = '';
      }
    },

    // Sluit alle dropdowns
    closeAllDropdowns() {
  this.moestuinLayout.forEach(buis => {
    buis.slots.forEach(slot => {
      // Verwijder this.$set en wijzig de eigenschap direct
      slot.showDropdown = false; 
    });
  });
},

    // Slaat de gekozen plant op en sluit de dropdown
    selectPlant(buisIndex, slotIndex, plantNaam) {
      // Gebruik Vue.set om Vue te vertellen dat we de 'plant' eigenschap updaten
      this.$set(this.moestuinLayout[buisIndex].slots[slotIndex], 'plant', plantNaam);
      // Sluit de dropdown
      this.moestuinLayout[buisIndex].slots[slotIndex].showDropdown = false;
    }
  }
};
</script>

<style>
/* Algemene container voor centrering */
.garden-container {
    max-width: 1100;
    margin: 0 auto;
    padding: 20px;
}

/* Stijl voor de moestuinbuizen */
.moestuinbuis {
  background-color: #555; /* Donkergrijs, zoals in je originele code */
  width: 100%; 
  height: 100px; /* Vaste hoogte voor de buis */
  margin-top: 30px;
  border-radius: 10px;
  display: flex; /* Zorgt ervoor dat de slots naast elkaar staan */
  justify-content: space-around; /* Verdeelt de slots gelijkmatig */
  align-items: center; /* Centreert de slots verticaal in de buis */
  position: relative; /* Belangrijk voor het positioneren van de dropdowns */
}

/* Container voor elke knop/slot en zijn dropdown */
.slot-wrapper {
    position: relative;
    z-index: 10; /* Zorgt ervoor dat de dropdown over de andere buizen valt */
}

/* De knop die het slot voorstelt */
.plant-slot-button {
    width: 60px;
    height: 60px;
    border-radius: 50%; /* Maak het rond */
    background-color: #90ee90; /* Lichtgroen voor een plant-slot */
    border: 3px solid #3c803c;
    color: #333;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
}

.plant-slot-button:hover {
    background-color: #a7f7a7;
}

/* Stijl voor de dropdown box */
.dropdown-menu {
    position: absolute;
    top: 70px; /* Plaats de dropdown net onder de knop */
    left: 50%;
    transform: translateX(-50%); /* Centreer de dropdown onder de knop */
    width: 250px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
}

/* Stijl voor het zoekveld */
.search-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Stijl voor de individuele plant items in de lijst */
.plant-item {
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.plant-item:hover {
    background-color: #f0f0f0;
    color: #3c803c;
}

.no-results {
    color: #999;
    padding: 10px;
    text-align: center;
}
</style>