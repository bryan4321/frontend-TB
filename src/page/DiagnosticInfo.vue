<template>
  <div class="container">
    <div style="text-align: right;">
    <button @click="router.back()" class="btn-retour">Retour</button>
    </div>
      <h2>Détails du diagnostic</h2>
      <p v-if="selectedDiagnostic">Date de création : {{ selectedDiagnostic.dia_dateCreation }}</p>
      <p v-if="selectedDiagnostic">Date de fin du questionnaire : {{ selectedDiagnostic.dia_dateFin }}</p>
      <p v-if="selectedDiagnostic">Nombre de participants : {{ selectedDiagnostic.dia_nbParticipants }}</p>
      <p v-else>Aucun diagnostic trouvé</p>
      <p v-if="selectedDiagnostic && selectedDiagnostic.dia_status === 1">Code : {{ selectedDiagnostic.dia_code }}</p>
      <p v-if="selectedDiagnostic && selectedDiagnostic.dia_status === 0">Récolte Terminé</p>
      <div class="button-container">
          <button
              :disabled="selectedDiagnostic.dia_status_rapport === 0"
              :class="{ 'disabled-btn': selectedDiagnostic.dia_status_rapport === 0 }"
              @click="selectedDiagnostic.dia_status_rapport !== 0 && downloadRapport()">
              Télécharger le rapport
            </button>
      </div>
      
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute()
const id = Number(route.params.id) 

const selectedDiagnostic = ref('');
const erreurChargement = ref('');

const chargerDiagnostics = async () => {
  console.log('id du diag :' + id)
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(
      'http://localhost:8000/api/diagnostic/' + id,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    selectedDiagnostic.value = response.data[0];
  } catch (error) {
    console.error(error);
    erreurChargement.value = 'Erreur lors du chargement des données.';
  }
};


onMounted(() => {
  chargerDiagnostics();
});

async function downloadRapport(id) {
  const token = localStorage.getItem('token'); 

  try {
    const response = await axios.get(`http://localhost:8000/api/diagnostic/${id}/rapport`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob'
    });

    // Créer un lien temporaire pour télécharger
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rapport_${id}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Nettoyage
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Erreur lors du téléchargement du rapport :', error);
    alert('Impossible de télécharger le rapport.');
  }
}


</script>

<style scoped>

.container {
  padding: 20px;
  align-items: center;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 44px;
}

p {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  margin: 10px 0;
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

.button-container {
  margin-top: 35px;
  display: flex;
  justify-content: center;
}

.disabled-btn {
  background-color: grey !important;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-retour {
  padding: 10px 24px;
  font-size: 20px;
  border-radius: 30px;
  background-color: #ED7405;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
}

.btn-retour:hover {
  background-color: #d36200;
  transform: translateY(-2px);
}

.btn-retour:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

</style>
