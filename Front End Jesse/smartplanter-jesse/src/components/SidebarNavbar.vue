<script setup>
import { ref, onMounted } from 'vue'

const userFirstLetter = ref('')

// Wanneer de DOM gemount is, pak de username en zet alleen de eerste letter
onMounted(() => {
  const usernameEl = document.querySelector('.username')
  if (usernameEl && usernameEl.textContent) {
    // Pak alleen de eerste letter van de volledige string
    userFirstLetter.value = usernameEl.textContent.trim().charAt(0)
  }
})
</script>


<template>
  <div class="sidebar">

    <!-- ========== LOGO SECTION ========== -->
    <div class="logo">
      <i class="fa-solid fa-seedling"></i>
      <h1 class="logo-text">SmartPlanter</h1>
    </div>
    
    <!-- ========== NAVIGATIE ========== -->
    <nav>
      <ul>

        <!-- Dashboard -->
        <li>
          <router-link to="/dashboard" class="nav-item">
            <i class="fa-solid fa-border-all"></i>
            <span class="label">Dashboard</span>
          </router-link>
        </li>

        <!-- Meldingen -->
        <li>
          <router-link to="/notifications" class="nav-item">
            <i class="fa-solid fa-bell"></i>
            <span class="label">Meldingen</span>
          </router-link>
          <p class="notificationCount">20</p>
        </li>

        <!-- Data -->
        <li>
          <router-link to="/data" class="nav-item">
            <i class="fa-solid fa-chart-column"></i>
            <span class="label">Data</span>
          </router-link>
        </li>

      </ul>

      <ul>

        <!-- Instellingen -->
        <li>
          <router-link to="/settings" class="nav-item">
            <i class="fa-solid fa-gear"></i>
            <span class="label">Instellingen</span>
          </router-link>
        </li>

        <!-- Uitloggen -->
        <li>
          <a href="http://localhost:8080/" class="nav-item">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span class="label">Loguit</span>
          </a>
        </li>

      </ul>
    </nav>

    <!-- ========== PROFIEL SECTIE (ONDER) ========== -->
    <div class="profile">
      <div class="profilePicture">
        <span>{{ userFirstLetter }}</span>
      </div>
      <div class="profileInfo">
        <span class="username">Jesse de Poot</span> <!-- Wordt uit DB gevuld -->
        <span class="usermail">jessedepoot@hotmail.com</span>
      </div>
    </div>

  </div>
</template>

<style>
/* ================= SIDEBAR BASIS ================= */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 4.5rem; /* start klein */
  display: flex;
  flex-direction: column;
  background: var(--light);
  box-shadow: 5px 0 10px rgba(0,0,0,0.3);
  transition: width 0.3s ease;
  overflow: hidden;
  user-select: none;
  z-index: 1000;
}

/* ================= LOGO ================= */
.logo {
  display: flex;
  align-items: center;
  height: 5rem;
  margin-left: 1rem;
  color: var(--text);
}

.logo i {
  font-size: 30px;
  margin-right: 1rem;
  flex-shrink: 0;
  color: var(--icon);
}

.logo-text {
  font-size: 22px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* ================= NAVIGATIE ================= */
.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 30px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  margin-left: 1rem;
  transition: all 0.3s ease;
}

.nav-item i {
  font-size: 30px;
  flex-shrink: 0;
  color: var(--icon);
}

.nav-item .label {
  font-size: 22px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item.router-link-active,
.nav-item.router-link-active i {
  color: var(--primary);
}

/* ================= NAV STRUCTUUR ================= */
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding-top: 0.5rem;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

/* ================= MELDING-BADGE ================= */
.notificationCount {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--danger);
  border-radius: 50%;
  font-weight: 600;
  margin-left: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* ================= PROFIEL ================= */
.profile {
  display: flex;
  align-items: center;
  padding: 0.1rem;
  border-top: 2px solid var(--bg);
  transition: all 0.3s ease;
}

.profile .username,
.profile .usermail {
  color: var(--text);
}

.profilePicture {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0.5rem 0 0.5rem 0.25rem;
  border-radius: 50%;
  border: 2px solid;
  flex-shrink: 0;
  background: var(--primary);

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: var(--primary-dark);
}

.profileInfo {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}

.username, .usermail {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* ================= HOVER EFFECT ================= */
.sidebar:hover {
  width: 20rem; /* volledige breedte */
}

.sidebar:hover .logo-text,
.sidebar:hover .nav-item .label,
.sidebar:hover .notificationCount,
.sidebar:hover .username,
.sidebar:hover .usermail {
  opacity: 1;
}
</style>