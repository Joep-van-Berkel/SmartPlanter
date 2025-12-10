<template>
  <SidebarNavbar/>
  <div class="Dashboard">
    <header>
      <WelcomeMessage/>
      <PlantSelector/>
    </header>

    <div class="plants-container">
      <PlantCard
      name="Wortel"
      position="01"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="02"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="03"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="04"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="05"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="06"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Aardbei"
      position="07"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="08"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="09"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="10"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="10"
      days-to-harvest="11"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>

      <PlantCard
      name="Wortel"
      position="12"
      days-to-harvest="12"
      plant-date="26-11-2025"
      -harvest-date="13-12-2025"/>




      
    
    </div>
  </div>
  
  
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage.vue';
import SidebarNavbar from '../components/SidebarNavbar.vue';
import PlantCard from '@/components/PlantCard.vue';
import PlantSelector from '@/components/PlantSelector.vue';





export default {
  name: 'DashboardPage',
  components: {
    SidebarNavbar,
    WelcomeMessage,
    PlantCard,
    PlantSelector
  }
}
</script>

<style>

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
  }

  .Dashboard {
    min-height: 100vh;
    width: auto;
    margin-left: 5rem;
    overflow-y: hidden;
    overflow-x: hidden;
  }

</style>