<template>
<div class="linechart">
    <canvas ref="canvasEl"></canvas>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js/auto'

const canvasEl = ref(null)

onMounted(() => {
new Chart(canvasEl.value, {
  type: 'line',
  data: {
    labels: ['09u', '10u', '11u', '12u'],
    datasets: [
      {
        label: 'pHwaarde',
        data: [10, 20, 15, 30],
        tension: 0.4,
        backgroundColor: 'red'
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'pH-waarde',
        font: {
            size: 32,
            weight: 300,
        },
        color: 'black'
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
    background-color:  #2d6a4f28;
    border-radius: 15%;
    width: 25rem;
    height: 17rem;
     
}

</style>