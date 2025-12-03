<template>
  <SidebarNavbar/>
  <div class="Data">
    <header>
    <WelcomeMessage/>
    <PlantSelector/>
    </header>
    <div class="chartContainer">
    <TempetureChart/>
    <FlowBeginChart/>
    <FlowEndChart/>
    <PhChart/>
    <ECChart/>
    <LuxChart/>
    </div>
  </div>
  
  
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage.vue';
import SidebarNavbar from '../components/SidebarNavbar.vue';
import PlantSelector from '@/components/PlantSelector.vue';
import TempetureChart from '@/components/charts/TempetureChart.vue';
import FlowBeginChart from '@/components/charts/FlowBeginChart.vue';
import FlowEndChart from '@/components/charts/FlowEndChart.vue';
import ECChart from '@/components/charts/ECChart.vue';
import LuxChart from '@/components/charts/LuxChart.vue';
import PhChart from '@/components/charts/PhChart.vue';




export default {
  name: 'DataPage',
  components: {
    SidebarNavbar,
    WelcomeMessage,
    TempetureChart,
    FlowBeginChart,
    FlowEndChart,
    ECChart,
    LuxChart,
    PhChart,
    PlantSelector
  }
}
</script>

<style>

  .Data {
    min-height: 100vh;
    width: auto;
    margin-left: 5rem;
  }

  .chartContainer {
  max-width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem; 
}



</style>
