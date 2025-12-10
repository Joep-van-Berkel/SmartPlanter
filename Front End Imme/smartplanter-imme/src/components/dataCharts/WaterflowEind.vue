<template>
<div class="linechart">
    <canvas ref="canvasEl"></canvas>
      <p class="datawaarde-uitleg">Waterflow Eind waarde:</p>
      <p class="data-betekenis">Deze waterflow eind waarde is:...</p>
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
        label: 'WaterFlowEind',
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
        text: 'Waterflow Eind',
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
    background-color: #7aff9d;
    border-radius: 22px;
    width: 22rem;
    height: 15rem;
    padding: 1rem;
    overflow: hidden; /* Belangrijk zodat de canvas rond blijft */
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25); /* Mooie zachte shadow */
}

.chart-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; /* afstand tussen kaarten */
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