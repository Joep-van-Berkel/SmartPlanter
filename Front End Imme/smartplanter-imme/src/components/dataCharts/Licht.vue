<template>
<div class="linechart">
    <canvas ref="canvasEl"></canvas>
      <p class="datawaarde-uitleg">Licht waarde:</p>
      <p class="data-betekenis">Deze licht waarde is:...</p>
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
        label: 'Lux-meter',
        data: [10, 20, 15, 30],
        tension: 0.4,
        backgroundColor:'red'
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'LUX',
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
    width: 22rem;
    height: 15rem;
}

.datawaarde-uitleg{
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}

.data-betekenis{
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
}

</style>