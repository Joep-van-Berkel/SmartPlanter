<script setup>
</script>

<template>
<div class="sidebar">
    <div class="logo">
        <i class="fa-solid fa-seedling"></i>
        <h1>SmartPlanter</h1>
    </div>
    
    <nav>
    <ul>
        <li>
            <router-link to="/dashboard"><i class="fa-solid fa-border-all"></i>Dashboard</router-link>
        </li>

        <li>
            <router-link to="/notifications"><i class="fa-solid fa-bell"></i>Meldingen</router-link><p class="notificatoinCount">20</p>
        </li>

        <li>
            <router-link to="/data"><i class="fa-solid fa-chart-column"></i>Data</router-link>
        </li>
    </ul>

    <ul>
        <li>
            <router-link to="/settings"><i class="fa-solid fa-gear"></i>Instellingen</router-link>
        </li>
        <li><a href="#"><i class="fa-solid fa-right-from-bracket"></i>Loguit</a></li>
    </ul>
    </nav>
    <div class="profile">
        <img src="../images/profile.png" alt="">
        <div class="profileInfo">
            <span id="username" class="username" >Username</span>
            <span id="usermail" class="usermail" >user@email.com</span>
        </div>
    </div>
</div>



</template>


<style>

    .sidebar {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 20rem;    
        background: var(--light);
        box-shadow: 5px 0 10px 0 rgba(0,0,0,0.3);
        font-family: Arial;
    }
    
    .sidebar ul {
        display: flex;
        flex-direction: column;
        list-style: none;
    }

    .sidebar nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 37rem;
    }

    .sidebar .logo {
        display: flex;
        align-items: center;
        height: 5rem;
        margin-left: 1.75rem;
    }

    .sidebar i {
        margin-right: 1rem;
        font-size: 30px;
        } 

    .sidebar ul a {
        display: flex;
        align-items: center;
        color: var(--color-dark);
        text-decoration: none;
        font-size: 30px;
        font-weight: 500;
        margin-left: 1.75rem;  
    }

    .sidebar li {
        display: flex;
        margin-bottom: 1rem;
        transition: all 0.2s ease;
    }

    .sidebar .notificatoinCount {
        display: flex;
        background: var(--danger);
        border-radius: 50%;
        font-weight: 600;
        width: 1.5rem;
        height: 1.5rem;
        align-items: center ;
        justify-content: center;
    }

    .sidebar .profile {
        position: absolute;
        width: 100%;
        height: 7rem;
        bottom: 0;
        border-top: 2px solid #CCCCCC;
        display: flex;
        align-items: center;
    }
    
    .sidebar img {
        display: flex;
        margin-left: 0.5rem;
        max-width: 4rem;
        max-height: 4rem;
        border: 2px solid;
        border-radius: 50%;
        
    }

    .sidebar .profileInfo {
        margin-left: 1rem ;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .sidebar .profile .username {
        font-size: 1.5rem;
        font-weight: 500;
    }

    .sidebar .profile .usermail {
        font-size: 1rem;
        font-weight: 500;
    }

</style>
