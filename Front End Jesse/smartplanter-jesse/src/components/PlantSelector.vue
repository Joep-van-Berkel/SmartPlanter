<template>
  <div class="dropdown">
    <button @click="open = !open" class="dropdown-btn">
      {{ selected || 'Selecteer een optie' }}
    </button>

    <!-- Smooth transition -->
    <transition name="fade-slide">
      <ul
        v-if="open"
        class="dropdown-menu"
      >
        <li
          v-for="option in options"
          :key="option"
          @click="select(option)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const open = ref(false);
const selected = ref(null);
const options = ["Smartplanter 1", "Smartplanter 2", "Smartplanter 3"];

// 🧠 Onthoud laatste keuze via localStorage
onMounted(() => {
  const saved = localStorage.getItem("chosenOption");
  if (saved) selected.value = saved;
});

watch(selected, (value) => {
  if (value) localStorage.setItem("chosenOption", value);
});

function select(option) {
  selected.value = option;
  open.value = false;
}
</script>

<style>
.dropdown {
  position: relative;
  width: 200px;
  right: 0;
  top: 0;
  z-index: 999;
}

.dropdown-btn {
  width: 100%;
  padding: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  background: var(--primary);
  border: 1px solid var(--light);
  color: var(--text);
  border-radius: 15px;
}

.dropdown-menu {
  position: absolute;
  width: 100%;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  border: 1px solid var(--light);
  background: var(--light);
  overflow: hidden;
}

.dropdown-menu li {
  padding: 8px;
  cursor: pointer;
  background: var(--light);
  color: var(--text);
}

.dropdown-menu li:hover {
  background: var(--primary);
  color: var(--primary-dark);
}

/* 💫 Transition (fade + slide) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>