<template>
  <SidebarNavbar/>
  <div class="Notifications">
    <WelcomeMessage/>
  </div>
  
  
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage.vue';
import SidebarNavbar from '../components/SidebarNavbar.vue';





export default {
  name: 'NotificationPage',
  components: {
    SidebarNavbar,
    WelcomeMessage
  }
}
</script>

<style>

  .Notifications {
    min-height: 100vh;
    width: auto;
    margin-left: 5rem;
  }

</style>
