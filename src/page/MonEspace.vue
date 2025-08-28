<template>
  <div class="mon-espace">
    <div class="form-container">
      <div class="form">
        <p>Identifiant</p>
        <input type="text" placeholder="Entrer votre identifiant" v-model="email" />
        <p>Mot de passe</p>
        <div class="password-field">
            <input type="password" placeholder="Entrer votre mot de passe" v-model="password" />
        </div>
        <p v-if="erreur" class="erreur-message">{{ erreur }}</p>
        <p class="mot-de-passe-oublie" @click="handleForgotPassword">Mot de passe oublié ?</p>
      </div>

      <div class="button-container">
        <button @click="login">Connexion</button>
      </div>    
    </div>

    <div>
      <button @click="$router.push('/espace/inscription')">Créer un compte</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const erreur = ref('') 

const handleForgotPassword = () => {
  console.log('Mot de passe oublié cliqué')
}
/*
const ouvreRoute = (email) => {
  const partie = email.split('@');
  if (partie.length > 1) {
    const partieCouper = partie[1].split('.');
    if (partieCouper[0] === 'tpg'){
      window.location.href = '/espace/tpg'
    } else {
        window.location.href = '/espace/entreprise'
    }
  }
  return null;
};
*/


const login = async () => {
  erreur.value = '' 

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth', {
      email: email.value,
      password: password.value
    })

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.type === 'entreprise'){
        window.location.href = '/espace/entreprise'
        localStorage.setItem('entrepriseId', response.data.entrepriseId);
      } else {
        window.location.href = '/espace/tpg'
      }
      
    } else {
      erreur.value = 'Identifiant ou mot de passe incorrect.'
    }
  } catch (error) {
    console.log(error)
    if (error.response?.status === 401) {
      erreur.value = 'Identifiant ou mot de passe incorrect.'
    } else {
      erreur.value = 'Erreur serveur. Réessayez plus tard.' 
    }
  }
}
</script>
    

<style scoped>



.erreur-message {
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}

.mon-espace {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px;
  flex-wrap: wrap; 
  gap: 40px;
}   

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  border: #000000 4px solid;
  padding: 30px;
  box-sizing: border-box;
  padding-right: 53px;
}

button {
  padding: 12px 28px;
  font-size: 32px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ED7405;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d36200;
}

p {
  font-size: 28px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

input {
  padding: 10px;
  font-size: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 2px solid #000000;
  border-radius: 5px;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center; 
}

.mot-de-passe-oublie {
  font-size: 22px;
  color: black;
  cursor: pointer;
  text-decoration: none; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 30px; 
  text-align: center; 
}

.mot-de-passe-oublie:hover {
  text-decoration: underline; 
}

.mon-espace > div:last-child {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
}

.password-field {
  position: relative;
  width: 95%;
  padding-right: 30px;
}

.password-field input {
  width: 100%;
  padding-right: 40px; 
}

.toggle-btn {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #666;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}



</style>