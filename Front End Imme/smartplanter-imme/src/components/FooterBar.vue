<template>
  <footer class="footer">
    <div class="accountNaam">
      <span1>Gebruikersnaam</span1>
      <span2> Gebruikersnaam@outlook.com</span2>
    </div>

    <div class="links">
      <button class="logoutButton"><img src="../assets/logout.png" class="footerIcoon" alt="logout"/></button>

      <a href="mailto:ima.piels@student.avans.nl">
        <img src="../assets/mail.png" class="footerIcoon" alt="mail"></img></a>
        
      <router-link to="/account" class="nav-item-settings"><img src="../assets/setting.png" class="footerIcoon" alt="settings"/></router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBar"
};
</script>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background: #1f4936;
  padding: 10px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color:white;
}

.footerIcoon{
  height: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: filter 10.0s ease;
}


.footerIcoon:hover {
  filter: brightness(0.5);
  background-color: #fed9f0;
}

.navigatie{
  display: flex;
  gap: 2vh;
}

.nav-item-settings.router-link-active img {
  border-bottom: 2px solid #d968cc;
}

.links{
  margin-top: 0.7vh;
  margin-right: 5vh;
  display:flex;
  gap:20px;
  filter: invert(1);
}

.nav-item {
  margin-right: 2vh;
  font-size: 19px;
  text-decoration: none;
  font-weight: 600;
}

span1, span2 {
  font-weight: 300;
  display: block;
}

.logoutButton{
  border: none;
  background-color: #ffffff00;
}
</style>
