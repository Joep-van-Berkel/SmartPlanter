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
// Array om de selecties van de 3 buizen (4 plekken elk) bij te houden.
// ----------------------------------------------------
const buisSelecties = ref([
  [null, null, null, null], // Buis 1
  [null, null, null, null], // Buis 2
  [null, null, null, null]  // Buis 3
])

// Functie die wordt aangeroepen door de Dropdown om een selectie bij te werken
const updateSelection = (buisIndex, plekIndex, newValue) => {
  buisSelecties.value[buisIndex][plekIndex] = newValue
}


// ----------------------------------------------------
// 2. DE HERBRUIKBARE DROPDOWN COMPONENT (DEFINITIEF EN BUGVRIJ)
// ----------------------------------------------------
const Dropdown = defineComponent({
  name: 'Dropdown',
  
  props: {
    modelValue: {
      type: String,
      default: null 
    }
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const open = ref(false)
    const search = ref("")

    const items = [
      'Komkommer', 'Courgette', 'Aardbeien', 'Wortels',
      'Tomaat', 'Paprika', 'Sla', 'Boontjes',
      'Ui', 'Knoflook', 'Spinazie', 'Radijs',
      'Aubergine', 'Prei', 'Spruiten', 'Bieten',
      'Bosbes', 'Framboos', 'Peterselie', 'Munt'
    ]

    const filteredItems = computed(() =>
      items.filter(item =>
        item.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const toggle = () => open.value = !open.value
    
    const choose = item => {
      emit('update:modelValue', item) 
      open.value = false
      search.value = ""
    }
    
    // 🚨 DE FIX: Zorg ervoor dat de prop 'modelValue' expliciet wordt teruggegeven.
    // Dit lost de "uitgecomment" weergave (de runtime error) op bij het gebruik van defineComponent met inline template.
    const modelValue = computed(() => props.modelValue);

    return { 
        open, 
        search, 
        filteredItems, 
        toggle, 
        choose,
        modelValue // BELANGRIJK: geeft de computed prop terug
    } 
  },

  // ⬇️ DE INLINE TEMPLATE (deze is nu correct omdat modelValue in de scope zit)
  template: `
<div class="dropdown-container">
  <button class="select-button" @click="toggle">
    {{ modelValue || 'Selecteer groente' }}
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
        :class="{ 'selected-item': item === modelValue }"
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.dropdown-search {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #bbb;
  border-radius: 5px;
  box-sizing: border-box; 
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
    background-color: #d1e7dd; 
    font-weight: bold;
}

.empty {
  color: #999;
  font-style: italic;
  cursor: default;
}
</style>