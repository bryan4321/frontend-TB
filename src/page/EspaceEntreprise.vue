<template>
  
  <div
    v-if="notificationMessage"
    :class="['notification', notificationType]"
  >
    {{ notificationMessage }}
  </div>

  
  <div class="etude-gratuit" v-if="etat === 'false'">
    <button @click="openLink">Etude gratuite</button>
    <button @click="creerDiagnostic()">Nouveau diagnostic</button>
  </div>

  <div class="questionnaire-container" v-else-if="etat === 'true'">
    <button>Nouveau diagnostic</button>
  </div>

  <h2>Liste des diagnostics</h2>

  <div class="diagnostic-list" v-if="diagnostics.length > 0">
    <div
      v-for="diag in diagnostics"
      :key="diag.dia_no"
      class="diagnostic-card"
    >
      <p>Date de création : {{ diag.dia_dateCreation }}</p>
      <p v-if="diag.dia_status === 0">Terminé</p>
      <p v-else>Fin le : {{ diag.dia_dateFin }}</p>
      <button @click="voirDetails(diag.dia_no)">Voir plus</button>
    </div>
  </div>

  <div class="info" v-else>
    <p>Vous n'avez réalisé aucun diagnostic</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const etat = ref('false');
const diagnostics = ref([]);
const erreur = ref('');
const erreurChargement = ref('');
const notificationMessage = ref('');
const notificationType = ref(''); 

const openLink = () => {
  window.open('https://toolkit.modus-ge.ch/go/site-web-web0625-gvs2', '_blank');
};

const voirDetails = (id) => {
  window.location.href = `/espace/diagnostic/${id}`;
};

const afficherNotification = (message, type) => {
  notificationMessage.value = message;
  notificationType.value = type;

  setTimeout(() => {
    notificationMessage.value = '';
    notificationType.value = '';
  }, 3000);
};

const chargerDiagnostics = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const entrepriseId = localStorage.getItem('entrepriseId'); 

    const response = await axios.get(
      `http://localhost:8000/api/diagnostics/${entrepriseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    diagnostics.value = response.data;
  } catch (error) {
    console.error(error);
    erreurChargement.value = 'Erreur lors du chargement des données.';
  }
};


onMounted(() => {
  chargerDiagnostics();
});

const creerDiagnostic = async () => {
  erreur.value = '';

  try {
    const token = localStorage.getItem('token'); 

    const response = await axios.post(
      'http://127.0.0.1:8000/api/diagnostic/creer',
      {
        dia_ent_no: localStorage.getItem('entrepriseId'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 201) {
      chargerDiagnostics();
      afficherNotification('Diagnostic créé avec succès', 'success');
    }
  } catch (error) {
    console.error(error);
    afficherNotification('Création échouée', 'error');
    erreur.value = 'Erreur lors de la création';
  }
};

</script>

<style scoped>
.notification {
  position: fixed;
  top: 120px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.notification.success {
  background-color: #28a745;
}

.notification.error {
  background-color: #dc3545;
}


.etude-gratuit {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 100px;
}

.questionnaire-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
}

button {
  padding: 12px 24px;
  font-size: 26px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ed7405;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d36200;
}

.diagnostic-list {
  padding-top: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.diagnostic-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: #000000 4px solid;
  padding: 10px;
}

.diagnostic-card button {
  padding: 8px 16px;
  background-color: #ed7405;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

h2 {
  font-size: 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-top: 50px;
}

.info {
  font-size: 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

</style>