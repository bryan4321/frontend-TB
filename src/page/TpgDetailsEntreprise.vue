<template>
  <div style="text-align: right;">
    <button @click="router.back()" class="btn-retour">Retour</button>
  </div>

    <div class="info">
        <p><strong>{{ entrepriseSelectionnee.ent_nom }}</strong></p>
        <p>{{ entrepriseSelectionnee.user_name }}</p>
        <p>{{ entrepriseSelectionnee.user_email }}</p>
        <p>{{ entrepriseSelectionnee.ent_adresse }}</p>
        <p>{{ entrepriseSelectionnee.ent_nbEmploye }} employés</p>

    </div>
    

    <div class="entreprise-container">
    <div class="liste-entreprises">
        <p>Listes des diagnostics :</p>
      <div
        class="entreprise-bar"
        v-for="diag in diagnostics"
        :key="diag.id"
      >
        <span>Date de création : {{ diag.dia_dateCreation }}</span>
        <span v-if="diag.dia_status === 0">Terminé</span>
        <span v-else>Fin le : {{ diag.dia_dateFin }}</span>
        <button @click="voirPlus(diag.dia_no)">Voir plus</button>
      </div>
    </div>
  </div>
    

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();


const route = useRoute()
const id = Number(route.params.id)

const entrepriseSelectionnee = ref('');
const erreurChargement = ref('');

const diagnostics = ref([
  { id: 1, date: '2024-05-02', fini: true, dateFin: '2024-05-10', code : 'ER414E', participants: 180},
  { id: 2, date: '2024-06-10', fini: true, dateFin: '2024-06-30', code : 'JJ534R', participants: 220 },
  { id: 3, date: '2025-07-15', fini: false, dateFin: '2025-10-15', code : 'GB478B', participants: 200 }
]);

const voirPlus = (id) => {
  window.location.href = `/espace/tpg/entreprise/diagnostic/${id}`; 
};

const chargerEntreprise = async () => {
  try {
    const token = localStorage.getItem('token'); 

    const response = await axios.get(
      'http://localhost:8000/api/entreprise/' + id,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    entrepriseSelectionnee.value = response.data;
  } catch (error) {
    console.error(error);
    erreurChargement.value = 'Erreur lors du chargement des données.';
  }
};


const chargerDiagnostics = async () => {
  try {
    const token = localStorage.getItem('token'); 

    const response = await axios.get(
      'http://localhost:8000/api/diagnostics/' + id,
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
  chargerEntreprise();
  chargerDiagnostics();
});

</script>



<style scoped>

.info {
  padding: 20px;
}

.info p {
  margin: 5px 0;
  font-size: 26px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.info strong {
  font-size: 33px;
  color: #333;
}

.liste-entreprises {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
}

.entreprise-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #ccc;
  padding: 12px 20px;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
}

.entreprise-bar button {
  padding: 6px 16px;
  font-size: 16px;
  border-radius: 6px;
  background-color: #ED7405;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 26px;
}

.entreprise-bar button:hover {
  background-color: #d36200;
}

.liste-entreprises p {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
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