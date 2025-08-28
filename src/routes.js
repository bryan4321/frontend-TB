import Acceuil from './page/Acceuil.vue'
import LogQuestionnaire from './page/LogQuestionnaire.vue'
import MonEspace from './page/MonEspace.vue'
import Inscription from './page/Inscription.vue'
import Entreprise from './page/EspaceEntreprise.vue'
import DiagnosticInfo from './page/DiagnosticInfo.vue'
import TpgEspace from './page/TpgEspace.vue'
import TpgDetailsEntreprise from './page/TpgDetailsEntreprise.vue'
import Questionnaire from './page/Questionnaire.vue'
import DiagnosticResultat from './page/DiagnosticResultat.vue'
import QuestionChart from './page/QuestionChart.vue'


export const routes = [
    {path: '/', component: Acceuil},
    {path: '/questionnaire', component: LogQuestionnaire},
    {path: '/espace', component: MonEspace},
    {path: '/espace/inscription', component: Inscription},
    {path: '/espace/entreprise', component: Entreprise},
    {path: '/espace/diagnostic/:id', component: DiagnosticInfo},
    {path: '/espace/tpg', component: TpgEspace},
    {path: '/espace/tpg/entreprise/:id', component: TpgDetailsEntreprise},
    {path: '/espace/questionnaire', component: Questionnaire},
    {path: '/espace/tpg/entreprise/diagnostic/:id', component: DiagnosticResultat},
    
]