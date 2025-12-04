<template>
  <NavBar />
  <FooterBar />

  <div class="accountknop">
    <button class="settingsknop">Account setting</button>
  </div>

  <div class="MoestuinKeuze">
    <h1>U werkt nu in:</h1>

    <div class="moestuinKeuzeDropDown">
      <div class="dropdown-selected" @click="toggleDropdown">
        {{ gekozenMoestuin || '- -' }}
        <span class="dropDown">▼</span>
      </div>

      <div v-if="open" class="dropdown-options">
        <div
          v-for="moestuin in moestuinen"
          :key="moestuin"
          class="dropdown-option"
          @click="selecteerMoestuin(moestuin)"
        >
          {{ moestuin }}
        </div>
      </div>
    </div>
    </div>

  <div class="moestuinNaamContainer">
  <h1>Moestuin naam:</h1>

  <div class="inputButtonRow">
    <input
      type="text"
      v-model="moestuinNaam"
      placeholder="Vul de naam in..."
    />
    <button class="moestuinNaamButton" @click="bevestigNaam">OK</button>
  </div>
</div>


</template>


<script>
import NavBar from '../components/NavBar.vue';
import FooterBar from '../components/FooterBar.vue';

export default {
  name: 'AccountPagina',
  components: { NavBar },

  data() {
    return {
      gekozenMoestuin: "",
      open: false,    
      moestuinen: ["Moestuin 1", "Moestuin 2", "Moestuin 3"],
      moestuinNaam: ""
    };
  },

  methods: {
    toggleDropdown() {
      this.open = !this.open;
    },

    selecteerMoestuin(moestuin) {
      this.gekozenMoestuin = moestuin;
      this.open = false; 
    },

    bevestigNaam() {
      console.log(this.moestuinNaam);
      this.moestuinNaam = "";
    }
  }
};
</script>



<style>
.settingsknop {
  margin-top: 2%;
  margin-left: 2%;
  background-color: #2d6a4f;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 25px;
  padding: 10px 60px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.2s ease;
}

.settingsknop:hover {
  filter: brightness(0.5);
  background-color: #2d6a4f;
}

/*----------------------DROPDOWN------------------------*/ 

.MoestuinKeuze {
  margin-right: 3rem;  
  margin-top: 34rem;    
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;

  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}


.MoestuinKeuze h1 {
  font-size: 25px;
  font-weight: 200%; 
  margin-right: 1%; 

}


.moestuinKeuzeDropDown {
  position: relative;
  width: 180px;
  margin-top: 10px;
}

.dropdown-selected {
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #2d6a4f;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  color: #2d6a4f;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.dropdown-options {
  text-align: left;
  position: absolute;
  bottom: 105%;   
  width: 100%;
  border: 1px solid #2d6a4f;
  border-radius: 5px;
  overflow: hidden;
  z-index: 100;
}


.dropdown-option {
  padding: 10px;
  font-size: 18px;
  color: #2d6a4f;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.925);
  transition: 0.15s ease;
}

.dropdown-option:hover {
  background-color: #2d6a4f;
  color: white;
}

/*-----------------TEXTFIELD---------------*/
.moestuinNaamContainer {
  position: absolute;
  left: 3rem;             
  top: 45rem;          
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #2d6a4f;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.moestuinNaamContainer input {
  width: 220px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #2d6a4f;   
  border-radius: 5px;
  outline: none;
  color: #2d6a4f;
}

.moestuinNaamContainer h1{
  font-size: 25px;
  font-weight: 200%;    
}

.inputButtonRow {
  display: flex;
  align-items: center;
  gap: 5px;
}

.moestuinNaamButton {
  background-color: #2d6a4f;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  padding: 8px 15px; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  width: auto; 
  height: 3rem;
}

.moestuinNaamButton:hover{
  filter: brightness(0.5);
  background-color: #2d6a4f;
}



</style>