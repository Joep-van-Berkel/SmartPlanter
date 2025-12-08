<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../keycloak'

const username = ref('...')
const email = ref('...')
const userFirstLetter = ref('U')

onMounted(async () => {
  const profile = await auth.profile()
  if (profile) {
    username.value = `${profile.firstName} ${profile.lastName}`
    email.value = profile.email
    userFirstLetter.value = profile.firstName?.charAt(0) ?? 'U'
  }
})

function logout() {
  auth.logout()
}
</script>

<template>
  <div class="sidebar">
    ...
    <button class="nav-item" @click="logout">
      <i class="fa-solid fa-right-from-bracket"></i>
      <span class="label">Loguit</span>
    </button>
    ...
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
  background: none;
  border: none;
  text-decoration: none;
  margin-left: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
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
