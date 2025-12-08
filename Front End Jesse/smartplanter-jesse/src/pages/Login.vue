<template>
  <SidebarNavbar/>
  <div class="page">
    <div class="container">
        <i class="fa-solid fa-seedling"></i>
        <h1>SmartPlanter</h1>
        <a href="http://localhost:8080/dashboard">Login</a>
    </div>
  </div>
</template>

<script>





export default {
  name: 'LoginPage',
  components: {
  }
}
</script>

<style>

    * {
        margin: 0;
        padding: 0;
    }

    .page {
        background: var(--bg);
        height: 100vh;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: hidden;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 25rem;
        height: 30rem;
        backdrop-filter: blur(2px);
        background: var(--light);
        padding: 20px;
        border-radius: 3rem;
    }

    .container h1 {
        color: var(--text);
        font-size: 3rem;
        user-select: none;
    }

    .container a {
        display: flex;
        text-decoration: none;
        width: 15rem;
        background: var(--primary) ;
        font-size: 4rem;
        color: var(--primary-dark);
        border: 2px solid var(--primary-dark);
        border-radius: 50px;
        justify-content: center;    
        margin: 2rem;
        font-weight: 400;
        user-select: none;
        cursor: pointer;
    }

    .container i {
        font-size: 10rem;
        height: auto;
        user-select: none;
        color: var(--primary);
    }

</style>
