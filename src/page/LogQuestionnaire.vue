<template>
    <div class="log-questionnaire">
        <div class="form-container">
            <div class="form">
                <p>Nom de votre entreprise</p>
                <input type="text" placeholder="Entrez le nom de votre entreprise" v-model="nomEntreprise"/>
                <p>Code de validation</p>
                <input type="text" placeholder="Entrez le code de validation" v-model="code"/>
                <div class="erreur">
                  <p v-if="erreur.length>0">{{ erreur }}</p>
                </div>
            </div>
            <button @click="valide()" >Passer au questionnaire</button>
        </div>
        <img src="../assets/image_log_questionnaire.png" class="image-log-questionnaire" />
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const erreur = ref('');
const nomEntreprise = ref('');
const code = ref('');

const valide = async () => {
  erreur.value = '' 

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/diagnostic/valide', {
      ent_nom: nomEntreprise.value,
      dia_code: code.value
    })

    if (response.status === 200) {
      if(response.data!==null && response.data.dia_status === 1){
        localStorage.setItem('diagId', response.data.dia_no);
        window.location.href = '/espace/questionnaire'
      } else {
        erreur.value = 'Nom ou code incorecte.' 
      }
    }
  } catch (error) {
    console.log(error)
    erreur.value = 'Erreur serveur. Réessayez plus tard.' 
  }
}

</script>

<style scoped>
.log-questionnaire {
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
  max-width: 550px;
  border: #000000 4px solid;
  padding: 40px;
  box-sizing: border-box;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 30px;
}

p {
  font-size: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

input {
  padding: 10px;
  font-size: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 2px solid #000000;
  border-radius: 5px;
}

.image-log-questionnaire {
  max-width: 100%;
  height: auto;
  object-fit: contain;
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

@media (max-width: 768px) {
  .log-questionnaire {
    flex-direction: column;
    padding: 20px;
  }

  .form-container {
    width: 100%;
    padding: 20px;
  }

  p, input {
    font-size: 18px;
  }

  button {
    font-size: 18px;
  }
}

.erreur{
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 17px;
  color: red;
}

</style>