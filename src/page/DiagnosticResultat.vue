<template>
    <div style="text-align:right">
        <button @click="router.back()" class="btn-retour">Retour</button>
    </div>

    <div class="top-container">
        <div class="info-container">
        <p v-if="selectedDiagnostic?.dia_status === 0">Status : terminé</p>
        <p v-else>Status : en cours</p>
        <p>Date de création : {{ selectedDiagnostic?.dia_dateCreation }}</p>
        <p>Date de fin : {{ selectedDiagnostic?.dia_dateFin }}</p>
        <p>Code : {{ selectedDiagnostic?.dia_code }}</p>
        </div>
        <div>
            <button class="btn-genere" @click="chargerStatus">
                {{ selectedDiagnostic?.dia_status === 1 ? 'Arrêter le diagnostic' : 'Relancer le diagnostic' }}
            </button>

        </div>
    </div>

    <div>
    <input type="file" ref="fileInput" @change="uploadRapport" accept="application/pdf" style="display: none" />
    <button class="btn-upload" @click="$refs.fileInput.click()" :disabled="loading">
      <span v-if="loading" class="spinner"></span>
      {{ loading ? 'Envoi...' : 'Upload rapport' }}
    </button>
  </div>

    <h1>Voici une carte représentant les lieu de domicile des participants</h1>
    <div>
        
        <Map 
          :dia-id="id"
        />
    </div>
  

    <h1>Graphique des résultats obtenus</h1>
    <div v-for="q in questions" :key="q.que_no" class="chart-wrapper">
    
    <QuestionChart
        v-if="q.graph === 0"
        :dia-id="id"
        :que-no="q.que_no"
        :title="q.que_question"
    />

    
    <QuestionChartBar
        v-else
        :dia-id="id"
        :que-no="q.que_no"
        :title="q.que_question"
    />
    </div>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import QuestionChart from '@/page/QuestionChart.vue' 
import QuestionChartBar from '@/page/QuestionChartBar.vue' 
import Map from '@/page/Map.vue'


const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)

const fileInput = ref(null)
const loading = ref(false)

const selectedDiagnostic = ref(null)
const error = ref('')

const questions = [
  //{ que_no: 1, que_question: "Quelle est votre adresse de domicile ?", graph: 0 },
  //{ que_no: 2, que_question: "Quelle est l’adresse de votre lieu de travail ?", graph: 0 },
  { que_no: 3, que_question: "Concernant votre environnement professionnel, vous travaillez :", graph: 0 },
  { que_no: 4, que_question: "Travaillez-vous :", graph: 0 },
  { que_no: 5, que_question: "Quels sont les jours où vous vous déplacez vers votre lieu de travail ?", graph: 1 },
  { que_no: 6, que_question: "Les jours où vous vous rendez sur votre lieu de travail, quelle est votre heure de prise de poste ?", graph: 1 },
  { que_no: 7, que_question: "Les jours où vous vous rendez sur votre lieu de travail, à quelle heure quittez-vous votre poste ?", graph: 1 },
  { que_no: 8, que_question: "Les jours où vous vous rendez sur votre lieu de travail, à quelle heure arrivez-vous chez vous ?", graph: 1 },
  { que_no: 9, que_question: "Les jours où vous vous rendez sur votre lieu de travail, réalisez-vous une ou plusieurs étapes le matin ?", graph: 0 },
  { que_no: 10, que_question: "Les jours où vous vous rendez sur votre lieu de travail, réalisez-vous une ou plusieurs étapes le soir ?", graph: 0 },
  { que_no: 11, que_question: "Est-ce que vous vous déplacez à l’extérieur pour votre pause déjeuner", graph: 0 },
  { que_no: 12, que_question: "Pour vous restaurer en dehors de l’entreprise ?", graph: 0 },
  { que_no: 13, que_question: "Sélections des modes de transport", graph: 1 },
  { que_no: 14, que_question: "Quel(s) inconvénient(s) rencontrez-vous avec ce mode « Vélo personnel électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 15, que_question: "Quel(s) satisfaction(s) rencontrez-vous avec ce mode « Vélo personnel électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 16, que_question: "Inconvénients du mode « Bus » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 17, que_question: "Satisfaction(s) du mode « Bus » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 18, que_question: "Inconvénients du mode « Bateau navette » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 19, que_question: "Satisfaction(s) du mode « Bateau navette » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 20, que_question: "Inconvénients du mode « Car interurbain » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 21, que_question: "Satisfaction(s) du mode « Car interurbain » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 22, que_question: "Inconvénients du mode « Covoiturage conducteur électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 23, que_question: "Satisfaction(s) du mode « Covoiturage conducteur électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 24, que_question: "Inconvénients du mode « Covoiturage conducteur hybride » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 25, que_question: "Satisfaction(s) du mode « Covoiturage conducteur hybride » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 26, que_question: "Inconvénients du mode « Covoiturage conducteur thermique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 27, que_question: "Satisfaction(s) du mode « Covoiturage conducteur thermique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 28, que_question: "Inconvénients du mode « Covoiturage passager » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 29, que_question: "Satisfaction(s) du mode « Covoiturage passager » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 30, que_question: "Inconvénients du mode « Moto/Scooter en libre service » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 31, que_question: "Satisfaction(s) du mode « Moto/Scooter en libre service » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 32, que_question: "Inconvénients du mode « Moto/Scooter personnel » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 33, que_question: "Satisfaction(s) du mode « Moto/Scooter personnel » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 34, que_question: "Inconvénients du mode « Navette d'entreprise » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 35, que_question: "Satisfaction(s) du mode « Navette d'entreprise » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 36, que_question: "Inconvénients du mode « Train » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 37, que_question: "Satisfaction(s) du mode « Train » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 38, que_question: "Inconvénients du mode « Tramway » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 39, que_question: "Satisfaction(s) du mode « Tramway » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 40, que_question: "Inconvénients du mode « Trottinette en libre service électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 41, que_question: "Satisfaction(s) du mode « Trottinette en libre service électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 42, que_question: "Inconvénients du mode « Trottinette en libre service mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 43, que_question: "Satisfaction(s) du mode « Trottinette en libre service mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 44, que_question: "Inconvénients du mode « Trottinette personnelle électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 45, que_question: "Satisfaction(s) du mode « Trottinette personnelle électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 46, que_question: "Inconvénients du mode « Trottinette personnelle mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 47, que_question: "Satisfaction(s) du mode « Trottinette personnelle mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 48, que_question: "Inconvénients du mode « Vélo cargo personnel électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 49, que_question: "Satisfaction(s) du mode « Vélo cargo personnel électrique » pour vos déplacements « Domicile-Travail » ?" , graph: 1},
  { que_no: 50, que_question: "Inconvénients du mode « Vélo cargo personnel mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 51, que_question: "Satisfaction(s) du mode « Vélo cargo personnel mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 52, que_question: "Inconvénients du mode « Vélo en libre service électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 53, que_question: "Satisfaction(s) du mode « Vélo en libre service électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 54, que_question: "Inconvénients du mode « Vélo en libre service mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 55, que_question: "Satisfaction(s) du mode « Vélo en libre service mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 56, que_question: "Quel(s) inconvénient(s) rencontrez-vous avec ce mode « Vélo personnel mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 57, que_question: "Quel(s) satisfaction(s) rencontrez-vous avec ce mode « Vélo personnel mécanique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 58, que_question: "Inconvénients du mode « Voiture en libre service électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 59, que_question: "Satisfaction(s) du mode « Voiture en libre service électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 60, que_question: "Inconvénients du mode « Voiture en libre service hybride » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 61, que_question: "Satisfaction(s) du mode « Voiture en libre service hybride » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 62, que_question: "Inconvénients du mode « Voiture en libre service thermique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 63, que_question: "Satisfaction(s) du mode « Voiture en libre service thermique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 64, que_question: "Inconvénients du mode « Voiture personnelle électrique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 65, que_question: "Satisfaction(s) du mode « Voiture personnelle électrique » pour vos déplacements « Domicile-Travail » ?" , graph: 1},
  { que_no: 66, que_question: "Inconvénients du mode « Voiture personnelle hybride » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 67, que_question: "Satisfaction(s) du mode « Voiture personnelle hybride » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 68, que_question: "Inconvénients du mode « Voiture personnelle thermique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 69, que_question: "Satisfaction(s) du mode « Voiture personnelle thermique » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 70, que_question: "Inconvénients du mode « Transport spécialisé personnes à mobilité réduite » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 71, que_question: "Satisfaction(s) du mode « Transport spécialisé personnes à mobilité réduite » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 72, que_question: "Inconvénients du mode « À pied » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 73, que_question: "Satisfaction(s) du mode « À pied » pour vos déplacements « Domicile-Travail » ?", graph: 1 },
  { que_no: 74, que_question: "Êtes-vous en travail à la maison ou en coworking ?", graph: 0 },
  { que_no: 75, que_question: "Combien de jours par semaine travaillez-vous à distance", graph: 0 },
  { que_no: 76, que_question: "Quel(s) inconvénient(s) rencontrez-vous avec le travail à distance ?", graph: 1 },
  { que_no: 77, que_question: "Quel(s) avantage(s) rencontrez-vous avec le travail à distance ?", graph: 1 },
  { que_no: 78, que_question: "Souhaitez-vous faire évoluer vos comportements de mobilité ?", graph: 0 },
  { que_no: 79, que_question: "Parmi les propositions suivantes, lesquelles vous paraîtraient les plus acceptables ?", graph: 0 },
  { que_no: 80, que_question: "Accepteriez-vous de moduler vos horaires de travail pour faciliter la décongestion du trafic routier ou du transport en commun ?", graph: 0 },
  { que_no: 81, que_question: "Pour vous, le covoiturage, c’est :", graph: 0 },
  { que_no: 82, que_question: "Pour vous, le vélo, c’est :" , graph: 0},
  { que_no: 83, que_question: "Pour vous, le transport en commun, c’est :", graph: 0 },
  { que_no: 84, que_question: "Pour vous, la voiture, c’est :", graph: 0 },
  { que_no: 85, que_question: "D’après vous, une journée de travail à distance c’est :", graph: 0 },
  { que_no: 86, que_question: "Avez-vous des enfants à charge ?", graph: 0 },
  { que_no: 87, que_question: "Avez-vous des problèmes d’accessibilité à la mobilité (raisons médicales, handicaps, conditions de ressources, etc.) ?", graph: 0 },
  { que_no: 88, que_question: "Comment graduez-vous ce problème ?", graph: 0 },
  { que_no: 89, que_question: "Êtes-vous ?", graph: 0 },
  { que_no: 90, que_question: "Dans quelle tranche d’âge vous situez-vous ?", graph: 0 },
  //{ que_no: 91, que_question: "Travaillez-vous :", graph: 0 }
]

const chargerDiagnostics = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`http://localhost:8000/api/diagnostic/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    selectedDiagnostic.value = Array.isArray(data) ? data[0] : data
  } catch (e) {
    console.error(e)
    error.value = 'Erreur lors du chargement du diagnostic.'
  }
}

const chargerStatus = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8000/api/diagnostic/status`, 
    { dia_no: id, },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })

    selectedDiagnostic.value.dia_status = selectedDiagnostic.value.dia_status === 1 ? 0 : 1

  } catch (e) {
    console.error(e)
    error.value = 'Erreur lors du chargement du diagnostic.'
  }
}

onMounted(chargerDiagnostics)


const uploadRapport = async (event) => {
  const token = localStorage.getItem('token');
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('rapport', file);

  loading.value = true;
  try {
    await axios.post(
      `http://localhost:8000/api/diagnostic/${id}/rapport`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
    fileInput.value.value = ''; 
  }
};



</script>

<style scoped>
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
.btn-retour:hover { background-color: #d36200; transform: translateY(-2px); }
.btn-retour:active { transform: translateY(0); box-shadow: 0 2px 4px rgba(0,0,0,0.2); }

.btn-genere {
  padding: 12px 28px;
  font-size: 28px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ED7405;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 100px;
}
.btn-genere:hover { background-color: #d36200; transform: translateY(-2px); }
.btn-genere:active { transform: translateY(0); box-shadow: 0 2px 4px rgba(0,0,0,0.2); }

.info-container {
  font-size: 23px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(980px, 1fr));
  gap: 16px;
  margin-top: 12px;
}
.card {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
}
.btn-retour{ padding:10px 24px; font-size:20px; border-radius:30px; background:#ED7405; color:#fff; border:0; cursor:pointer }
.btn-retour:hover{ background:#d36200 }
.btn-genere{ padding:12px 28px; font-size:28px; background:#ED7405; color:#fff; border:0; border-radius:50px; cursor:pointer }
.info-container{ font-size:23px; padding-bottom:30px }

h1{
  font-size: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


.btn-upload {
  padding: 12px 28px;
  font-size: 28px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ED7405;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
}

.btn-upload:hover:not(:disabled) {
  background-color: #c95f03;
}

.btn-upload:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
