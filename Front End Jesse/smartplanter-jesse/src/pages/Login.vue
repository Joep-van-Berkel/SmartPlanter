<template>
  <div class="page">
    <div class="container">
      <h1>Login</h1>
      <button @click="login">Inloggen</button>
    </div>
  </div>
</template>

<script>
import { keycloak } from '../keycloak'

export default {
  name: 'LoginPage', 
  setup() {
    const login = () => keycloak.login()
    return { login }
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

.container button {
    display: flex;
    text-decoration: none;
    width: 15rem;
    background: var(--primary);
    font-size: 2rem; /* aangepast van 4rem, paste beter in button */
    color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
    border-radius: 50px;
    justify-content: center;    
    margin: 2rem;
    font-weight: 400;
    user-select: none;
    cursor: pointer;
    transition: all 200ms ease;
}

.container button:hover {
    background: var(--primary-dark);
    color: var(--primary);
}

.container i {
    font-size: 10rem;
    height: auto;
    user-select: none;
    color: var(--primary);
}
</style>
