<template>
    <Bar :data="chartData"/>
    <button @click="loadAPI">Laad Data</button>
</template>

<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// SETUP Variables
const apiURL = "https://frontend-development-api.azurewebsites.net/API/product-sales.json"

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData:
            {
                labels: ['January', 'February', 'March'],
                datasets: [
                    {
                        label: 'Data one',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12]
                    }
            ]
        }
    }
},
    methods: {
        // Maak een nieuwe function aan genaamd loadAPI()
        loadAPI() {
            // Fetch de data
            fetch(apiURL)
            .then((respons) => {
                return respons.json()
            })
            .then((responsJSON) => {

                // Nabouwen van de ChartData
                var data = []
                for(var datapunt of responsJSON.gegevens)
                {
                    // Voeg dit datapunt toe aan de (lege) array
                    data.push(datapunt.verkoopbedrag)
                }

                var labels = []
                for(var labelDatapunt of responsJSON.gegevens)
                {
                    labels.push(labelDatapunt.categorie)
                }

                //Vullen van ChartData
                var newChartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: responsJSON.dataset,
                            backgroundColor: "#BDFE00",
                            data: data
                        }
                    ]
                }

                //Plaatsen van de nieuwe chartData in de oude
                this.chartData = newChartData

            })
            .catch(() => {

            })
        }
    }
}
</script>

<style>
</style>