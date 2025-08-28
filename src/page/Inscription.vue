<template>
  <div class="mon-espace">
    
    <div class="barre-ecriture">
      <span>Étape {{ step }}</span>
    </div>

    <div class="barre">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <div class="form-container">
      <div class="form">
        <!-- Étape 1 -->
        <template v-if="step === 1">
          <p>Vous êtes ?</p>
          <div class="radio-container">
            <input type="radio" id="entrepriseType" value="Entreprise" name="Type" v-model="type"/>
            <label for="entrepriseType">Entreprise</label>

            <input type="radio" id="collectiviteType" value="Collectivité" name="Type" v-model="type"/>
            <label for="collectiviteType">Collectivité</label>
          </div>


          <p>Nom de votre entreprise ou collectivité</p>
          <input type="text" placeholder="Entrer le nom de votre entreprise" v-model="nomEntreprise"/>

          <p>Nom de la personne référente</p>
          <input type="text" placeholder="Entrer le nom de la personne référente" v-model="nomReferent"/>

          <p>Adresse e-mail</p>
          <input type="email" placeholder="Entrer votre adresse e-mail" v-model="mail"/>
        </template>

        <!-- Étape 2 -->
        <template v-if="step === 2">
          <p>Nombre d'employés</p>
          <input type="text" placeholder="Entrer votre nombre d'employés" v-model="nbEmploye"/>

          <p>Nombre de site</p>
          <input type="text" placeholder="Entrer votre nombre de site" v-model="nbSites"/>

          <p>Nombre d'employés par site</p>
          <input type="text" placeholder="Entrer votre nombre d'employés par site" v-model="nbEmpSite"/>
        </template>

        <!-- Étape 3 -->
        <template v-if="step === 3">
          <p>Adresse avec numéro</p>
          <input type="text" placeholder="Entrer votre adresse avec numéro" v-model="numAdresse"/>

          <p>NPA</p>
          <input type="text" placeholder="Entrer votre NPA" v-model="npa"/>

          <p>Localité</p>
          <input type="text" placeholder="Entrer votre localité" v-model="localite"/>
        </template>

        <!-- Étape 4 -->
        <template v-else-if="step === 4">
          <p>Mot de passe</p>
          <div class="password-field">
            <input :type="showPassword ? 'text' : 'password'" placeholder="Entrer votre mot de passe" v-model="motDePasse"/>
            <button type="button" class="toggle-btn" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>

          <p>Confirmer le mot de passe</p>
          <div class="password-field">
            <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirmer votre mot de passe" v-model="confirmeMotDePasse"/>
            <button type="button" class="toggle-btn" @click="showConfirmPassword = !showConfirmPassword">
              <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
          <p v-if="erreur.value!==''" class="message-erreur">{{ erreur }}</p>
        </template>
      </div>

      <div class="button-container">
        <button v-if="step > 1" @click="step--">Précédent</button>
        <button v-if="step < totalSteps" @click="step++">Suivant</button>
        <button v-else @click="creerCompte">Créer mon compte</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios'

const step = ref(1);
const totalSteps = 4;

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const progressPercent = computed(() => (step.value / totalSteps) * 100);

const type = ref('');
const nomEntreprise = ref('');
const nomReferent = ref('');
const mail = ref('');
const nbEmploye = ref('');
const nbSites = ref('');
const nbEmpSite = ref('');
const numAdresse = ref('');
const npa = ref('');
const localite = ref('');

const motDePasse = ref('');
const confirmeMotDePasse = ref('');

const erreur = ref('');



function estEmailValide(email) {
  const atIndex = email.indexOf('@');

  if (atIndex <= 0 || atIndex === email.length - 1) {
    return false;
  }

  const domainPart = email.slice(atIndex + 1);
  return domainPart.includes('.');
}

const creerCompte = async () => {
  erreur.value = '' 
  if (motDePasse.value===confirmeMotDePasse.value){
    if (nomReferent.value.length>0 && type.value.length>0 && nomEntreprise.value.length>0 && nbEmploye.value.length>0 && nbEmpSite.value.length>0 && numAdresse.value.length>0 && npa.value.length>0 && localite.value.length>0 && nbSites.value.length>0){
      if (estEmailValide(mail.value)){
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/entreprise/creer', {
            name: nomReferent.value,
            email: mail.value,
            password: motDePasse.value,
            ent_type: type.value,
            ent_nom: nomEntreprise.value,
            ent_nbEmploye: nbEmploye.value,
            ent_nbEmpSites: nbEmpSite.value,
            ent_adresse: numAdresse.value+' '+npa.value+' '+localite.value,
            ent_nbSites: nbSites.value
          })

          console.log(response.status)

          if (response.status === 201) {
            window.location.href = '/espace'
            
          }
  } catch (error) {
    console.log(error)
    if (error.response?.status === 402) {
      erreur.value = error.response.data.message
    } else {
      erreur.value = 'Ce mail est déjà utilisé.' 
    }
  }
      } else {
        erreur.value = 'Veillez entrer un mail correct'
      }
    } else {
      erreur.value = 'Veillez compléter tout les champs.'
    }
    
  } else {
    erreur.value = 'Les mots de passes ne sont pas identique.'
  }
}
</script>

<style scoped>
.mon-espace {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  flex-wrap: wrap;
  gap: 40px;
  flex-direction: column;
}

.barre-ecriture {
  display: flex;
  justify-content: right;
  width: 100%;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.barre {
  width: 100%;
  height: 12px;
  background-color: #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #ED7405;
  transition: width 0.3s ease;
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
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

p {
  font-size: 28px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

input {
  padding: 10px;
  font-size: 22px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 2px solid #000000;
  border-radius: 5px;
  width: 100%;
}

.password-field {
  display: flex;
  align-items: center;
  position: relative;
}

.password-field input {
  flex: 1;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

button {
  padding: 12px 24px;
  font-size: 26px;
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


.radio-container {
  justify-content: center;
  display: flex;
  gap: 80px;
  flex-wrap: wrap;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.radio-container input[type="radio"] {
  display: none;
}

.radio-container label {
  padding: 8px 16px;
  border: 2px solid #e27b64;
  border-radius: 50px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #e27b64;
  background-color: white;
}


.radio-container label:hover {
  border-color: #ED7405;
  color: #ED7405;
}


.radio-container input[type="radio"]:checked + label {
  background-color: #ED7405;
  color: white;
  border-color: #ED7405;
  font-weight: bold;
}


.radio-inputs {
  display: flex;
  gap: 15px;
  align-items: center;
  background: #fff8f0;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ED7405;
}

.radio-inputs label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.radio-inputs input[type="time"] {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-top: 4px;
  width: 100%;
}

.message-erreur{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  color: red;
}
</style>
