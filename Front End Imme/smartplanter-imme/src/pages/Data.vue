<template>
    <NavBar />

    <div class="dataCharts">
      <Temperatuur />
      <Ph />
      <Ec />
      <Licht />
      <WaterflowBegin />
      <WaterflowEind />
    </div>
<section>
</section>
</template>



<script>
import NavBar from '../components/NavBar.vue'

import Temperatuur from '../components/dataCharts/Temperatuur.vue'
import Ph from '../components/dataCharts/Ph.vue'
import Ec from '../components/dataCharts/Ec.vue'
import Licht from '../components/dataCharts/Licht.vue'
import WaterflowBegin from '../components/dataCharts/WaterflowBegin.vue'
import WaterflowEind from '../components/dataCharts/WaterflowEind.vue'

export default {
  name: 'DataPagina',
  components: {
    NavBar,
    Temperatuur,
    Ph,
    Ec,
    Licht,
    WaterflowBegin,
    WaterflowEind
  }
}
</script>



<style>
.dataCharts{
  margin-top: 1rem;
  margin-left: 1rem;
  display: grid;
  max-width: 90%;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

</style>