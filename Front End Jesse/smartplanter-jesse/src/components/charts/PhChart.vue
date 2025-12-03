<template>
<div class="linechart">
    <canvas ref="canvasEl"></canvas>
  <p>Laatste Waarde: <span>30</span></p>
  <p>Waarde status:<span>OK</span></p>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js/auto'

 const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
 const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim()

const canvasEl = ref(null)

onMounted(() => {
new Chart(canvasEl.value, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'pH',
        data: [33, 21, 45, 6],
        borderColor: primaryColor,
        backgroundColor: primaryColor,
        tension: 0
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'pH',
        font: {
            size: 32
        },
        color: textColor
      },
      legend: {
        display: false
      }
    }
  }
})
})
</script>

<style>

.linechart {
    background-color: var(--light);
    
    width: 25rem;
    height: 16rem;
    border-radius: 15px;
}

.linechart p {
  color: var(--text);
}

</style>