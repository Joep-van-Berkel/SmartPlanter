<template>
  <div class="moestuinbuis">
    <div class="button-row">
      <Dropdown v-for="(d, i) in 4" :key="i" />
    </div>
  </div>

  <div class="moestuinbuis2">
    <div class="button-row">
      <Dropdown v-for="(d, i) in 4" :key="i" />
    </div>
  </div>

  <div class="moestuinbuis3">
    <div class="button-row">
      <Dropdown v-for="(d, i) in 4" :key="i" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent, computed } from 'vue'

// 🔽 Inline Dropdown component (geen apart bestand nodig!)
const Dropdown = defineComponent({
  name: 'Dropdown',

  setup() {
    const open = ref(false)
    const selected = ref(null)
    const search = ref("")

    // volledige lijst
    const items = [
      'Komkommer', 'Courgette', 'Aardbeien', 'Wortels',
      'Tomaat', 'Paprika', 'Sla', 'Boontjes',
      'Ui', 'Knoflook', 'Spinazie', 'Radijs',
      'Aubergine', 'Prei', 'Spruiten', 'Bieten'
    ]

    // gefilterde lijst op basis van zoekterm
    const filteredItems = computed(() =>
      items.filter(item =>
        item.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const toggle = () => open.value = !open.value

    const choose = (item) => {
      selected.value = item
      open.value = false
      search.value = ""
    }

    return { open, selected, search, filteredItems, toggle, choose }
  },

  template: `
    <div class="dropdown-container">
      <button class="select-button" @click="toggle">
        {{ selected || 'Selecteer groente' }}
      </button>

      <div v-if="open" class="dropdown">
        <!-- 🔍 Zoekveld -->
        <input
          class="dropdown-search"
          type="text"
          v-model="search"
          placeholder="Zoek..."
        />

        <!-- Gefilterde lijst -->
        <ul>
          <li v-for="item in filteredItems" :key="item" @click="choose(item)">
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
.moestuinbuis, .moestuinbuis2, .moestuinbuis3 {
  background-color: rgb(85, 85, 85);
  width: 80%;
  height: 20vh;
  margin-left: 10%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.moestuinbuis { margin-top: 5vh; }
.moestuinbuis2 { margin-top: 5vh; }
.moestuinbuis3 { margin-top: 5vh; }

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
}

.dropdown-search {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #bbb;
  border-radius: 5px;
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

.empty {
  color: #999;
  font-style: italic;
  cursor: default;
}
</style>
