<template>
  <section class="loginPagina">
    <div class="headerNaam">
      <h1>Smartplanter</h1>
    </div>

    <div class="imageLogo">
      <img src="../assets/SmartplanterLogo.png" alt="smartplanterLogo" class="smartplanter-img">
    </div>

    <div class="centerKnop">
      <button class="loginKnop" @click="login">Login</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPagina",
  methods: {
    login() {
      this.$keycloak.login({
        redirectUri: window.location.origin + "/home"
      })
    }
  }
};
</script>

<style>
.loginPagina {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right bottom,#008f7a,#258d73,#368b6c,#428966,#4c8761,#528861,#588861,#5e8962,#638d67,#69916c,#6e9671,#749a76);
  color: white;
}

.headerNaam {
  margin-top: 80px;
  Text-align: center;
}

.imageLogo{
  margin-top: 2%;
  display: flex;
  justify-content: center;
}

.smartplanter-img{
  width: 350px;
  height: auto;
}

h1{
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 750;
  font-size: 50px;
}

.centerKnop {
  flex-grow: 1;
  display:flex;
  justify-content: center;
  align-items: center;
}

.loginKnop {
  margin-bottom: 5%;
  padding: 10px 60px;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  background-color: #006f63;
  transition: 0.2s ease;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
}

.loginKnop:hover {
  background-color: rgb(0, 72, 63);
}
</style>
