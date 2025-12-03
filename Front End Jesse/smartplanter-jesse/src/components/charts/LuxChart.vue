<template>
<div class="linechart">
    <canvas ref="canvasEl"></canvas>
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
        label: 'LUX',
        data: [10, 20, 15, 30],
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
        text: 'LUX',
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
    height: 15rem;
    border-radius: 15px;
}

</style>