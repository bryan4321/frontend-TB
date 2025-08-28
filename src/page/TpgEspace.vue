<template>
  <div class="filtre-section">
    <div class="search-container">
      <input
        class="input-search"
        type="text"
        v-model="recherche"
        placeholder="Rechercher"
      />
      <i class="fa-solid fa-magnifying-glass search-icon"></i>
    </div>

    <div class="filtres">
      <input type="number" min="0" v-model.number="nbEmployesMin" placeholder="Min. employés" />
      <input type="date" v-model="dateMin" />
      <input type="date" v-model="dateMax" />
      <select v-model="communeFiltre">
        <option value="">Toutes les communes</option>
        <option v-for="commune in communesGeneve" :key="commune" :value="commune">
          {{ commune }}
      </option>
  </select>
    </div>
  </div>

  <div class="entreprise-container">
    <div class="liste-entreprises">
      <div
        class="entreprise-bar"
        v-for="entreprise in entreprises"
        :key="entreprise.ent_no"
      >
        <span>{{ entreprise.ent_nom }}</span>
        <span>{{ entreprise.ent_nbEmploye }} employés</span>
        <span>{{ entreprise.ent_dateCreation }}</span>
        <button @click="voirPlus(entreprise.ent_no)">Voir plus</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

const recherche = ref('');
const nbEmployesMin = ref(0);
const dateMin = ref('');
const dateMax = ref('');

const entreprises = ref([
  
]);

const communeFiltre = ref('')


const communesGeneve = [
  "Aire-la-Ville", "Anières", "Avully", "Avusy", "Bardonnex", "Bellevue",
  "Bernex", "Carouge", "Cartigny", "Céligny", "Chancy", "Chêne-Bougeries",
  "Chêne-Bourg", "Choulex", "Collex-Bossy", "Collonge-Bellerive", "Cologny",
  "Confignon", "Corsier", "Dardagny", "Genève", "Genthod", "Grand-Saconnex",
  "Gy", "Hermance", "Jussy", "Laconnex", "Lancy", "Meinier", "Meyrin",
  "Onex", "Perly-Certoux", "Plan-les-Ouates", "Pregny-Chambésy", "Presinge",
  "Puplinge", "Russin", "Satigny", "Soral", "Thônex", "Troinex",
  "Vandoeuvres", "Vernier", "Versoix", "Veyrier"
];

const voirPlus = (id) => {
  window.location.href = `/espace/tpg/entreprise/${id}`; 
};

const erreurChargement = ref('');

const chargerEntreprise = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const params = {};

    if (recherche.value) params.search = recherche.value;
    if (nbEmployesMin.value !== null && nbEmployesMin.value !== 0) params.minEmployes = nbEmployesMin.value;
    if (dateMin.value) params.dateMin = dateMin.value;
    if (dateMax.value) params.dateMax = dateMax.value;
    if (communeFiltre.value) params.commune = communeFiltre.value;

    console.log(params);

    const response = await axios.get(
      'http://localhost:8000/api/entreprises/filtrees',
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);
    entreprises.value = response.data;
    
  } catch (error) {
    console.error(error);
    erreurChargement.value = 'Erreur lors du chargement des données.';
  }
};




onMounted(() => {
  chargerEntreprise();
});

watch([recherche, nbEmployesMin, dateMin, dateMax, communeFiltre], () => {
  chargerEntreprise();
});

</script>

<style scoped>
.filtre-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
  max-width: 1200px;
}

.search-container {
  position: relative;
  width: 100%;
}

.input-search {
  width: 100%;
  padding: 14px 50px 14px 18px;
  font-size: 24px;
  border: 2px solid #ccc;
  border-radius: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #888;
  pointer-events: none;
}

.filtres {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filtres input {
  padding: 10px;
  font-size: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 200px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 22px;
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

.filtres select {
  padding: 10px;
  font-size: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 250px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

</style>
