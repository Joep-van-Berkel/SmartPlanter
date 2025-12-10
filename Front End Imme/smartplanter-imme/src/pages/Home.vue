<template>
  <div>
    <div 
      v-for="(buis, buisIndex) in buisSelecties" 
      :key="buisIndex" 
      :class="'moestuinbuis' + (buisIndex + 1)"
    >
      <div class="button-row">
        <Dropdown 
          v-for="i in 4" 
          :key="i"
          :modelValue="buis[i - 1]"
          @update:modelValue="updateSelection(buisIndex, i - 1, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent, computed } from 'vue'

// ----------------------------------------------------
// 1. STATE MANAGEMENT IN DE PARENT COMPONENT
// De centrale staat die alle 12 (3 buizen * 4 plekken) selecties opslaat
// ----------------------------------------------------
const buisSelecties = ref([
  [null, null, null, null], // Buis 1: 4 plekken
  [null, null, null, null], // Buis 2: 4 plekken
  [null, null, null, null]  // Buis 3: 4 plekken
])

// Functie die wordt aangeroepen door de Dropdown om een selectie bij te werken
const updateSelection = (buisIndex, plekIndex, newValue) => {
  buisSelecties.value[buisIndex][plekIndex] = newValue
}


// ----------------------------------------------------
// 2. DE HERBRUIKBARE DROPDOWN COMPONENT
// Beheert zijn eigen UI-status (open/gesloten, zoekterm), 
// maar laat de selectiewaarde over aan de parent via v-model.
// ----------------------------------------------------
const Dropdown = defineComponent({
  name: 'Dropdown',
  
  // Definieer de prop voor v-model (modelValue)
  props: {
    modelValue: {
      type: String,
      default: null 
    }
  },
  // Definieer de emit voor v-model (@update:modelValue)
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const open = ref(false)
    const search = ref("")

    const items = [
      'Komkommer', 'Courgette', 'Aardbeien', 'Wortels',
      'Tomaat', 'Paprika', 'Sla', 'Boontjes',
      'Ui', 'Knoflook', 'Spinazie', 'Radijs',
      'Aubergine', 'Prei', 'Spruiten', 'Bieten',
      'Bosbes', 'Framboos', 'Peterselie', 'Munt' // Extra opties
    ]

    const filteredItems = computed(() =>
      items.filter(item =>
        item.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const toggle = () => open.value = !open.value
    
    // De selectie wordt ge-emit naar de parent
    const choose = item => {
      emit('update:modelValue', item) // Stuurt de nieuwe waarde omhoog
      open.value = false
      search.value = ""
    }

    // Geef 'props' terug zodat we er in de template bij kunnen
    return { open, search, filteredItems, toggle, choose, props } 
  },

  // ⬇️ DE INLINE TEMPLATE VOOR DE DROPDOWN COMPONENT
  template: `
<div class="dropdown-container">
  <button class="select-button" @click="toggle">
    {{ props.modelValue || 'Selecteer groente' }}
  </button>

  <div v-if="open" class="dropdown">
    <input
      class="dropdown-search"
      type="text"
      v-model="search"
      placeholder="Zoek..."
    />

    <ul>
      <li
        v-for="item in filteredItems"
        :key="item"
        @click="choose(item)"
        :class="{ 'selected-item': item === props.modelValue }"
      >
        {{ item }}
      </li>

      <li v-if="filteredItems.length === 0" class="empty">
        Geen resultaten
      </li>
    </ul>
  </div>
</div>
`
})
</script>

<style>
/* --- Moestuinbuizen --- */
.moestuinbuis1, .moestuinbuis2, .moestuinbuis3 {
  background-color: rgb(85, 85, 85);
  width: 80%;
  height: 20vh;
  margin-left: 10%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
}

.button-row {
  display: flex;
  gap: 1rem;
}

/* --- Dropdown Styling --- */
.dropdown-container {
  position: relative;
}

.select-button {
  background-color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  min-width: 10rem;
  text-align: left;
  /* Zorgt ervoor dat de tekst niet buiten de knop valt als er veel tekst is */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dropdown {
  position: absolute;
  top: 2.8rem;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
  padding: 0.5rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optioneel: schaduw */
}

.dropdown-search {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #bbb;
  border-radius: 5px;
  box-sizing: border-box; /* Zorgt dat padding binnen de breedte valt */
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 0.4rem;
  cursor: pointer;
  border-radius: 4px;
}

.dropdown li:hover {
  background-color: #eee;
}

/* Visuele feedback voor reeds geselecteerd item */
.selected-item {
    background-color: #d1e7dd; /* Een lichtgroene kleur */
    font-weight: bold;
}

.empty {
  color: #999;
  font-style: italic;
  cursor: default;
}
</style>