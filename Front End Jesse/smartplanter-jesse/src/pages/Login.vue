<template>
  <SidebarNavbar/>
  <div class="page">
    <div class="container">
        <img src="../images/logo.png"/>
        <h1>SmartPlanter</h1>
        <button>Login</button>
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
        background: url(../images/bg.jpg);
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
        background: var(--blur);
        padding: 20px;
        border-radius: 3rem;
    }

    .container h1 {
        color: var(--light);
        font-size: 3rem;
        user-select: none;
    }

    .container button {
        display: flex;
        text-decoration: none;
        width: 15rem;
        background: var(--light) ;
        font-size: 4rem;
        color: var(--text);
        border: 2px solid var(--blur);
        border-radius: 10px;
        justify-content: center;    
        margin: 2rem;
        font-weight: 400;
        user-select: none;
        cursor: pointer;
    }

    .container img {
        width: 10rem;
        height: auto;
        user-select: none;
    }

</style>
