<template>
  <div class="container">
    <div class="questionnaire-container">

      <template v-if="step === 1">
        <h1>Réalisez votre diagnostic de mobilité !</h1>
        <p>
          La mobilité est un thème fondamental dans nos sociétés, notamment en lien avec l'urgence climatique. 
          Concrètement, de nouveaux besoins émergeront prochainement et il s'agit d'y apporter des solutions pragmatiques et personnalisées.
          C'est dans cette optique d'identifier et de comprendre les déplacements des collaborateurs et collaboratrices que s'inscrit ce diagnostic.
          Il permettra également d'alimenter de futures réflexions sur les actions à entreprendre dans le but de dlployer des mobilités plus durables et asscociées à des solutions personalisées.
          Toutes les données collectées font l'objet d'une protection sécurisée.
          Merci d'avance pour votre contribution.
        </p>
        <div class="accord-container">
          <input type="checkbox" id="accord" v-model="accordAccepte" />
          <label for="accord">
            En cochant cette case et en participant au diagnostique de mobilité, vous nous permettrez d'analyser vos réponses et données transmises en vue de mettre en place des solution adaptées.
          </label>
        </div>
      </template>

      <template v-if="step === 2">
        <h1>{{ question1 }} </h1>
        <p>Merci de renseigner votre adresse en précisant le n°, la rue, le code postal et votre ville de résidence. Ces données sont annonymes, une addresse précise permettra de vous faire des recomendations pertinentes de solutions à proximité de votre domicile.
            Conformément aux GCU, les données récoltées ne sont utilisées que dans le cadre de cette étude et ne seront en aucun cas partagées avec des acteurs commerciaux.
        </p>
        <input type="text" placeholder="Numéro, rue, ville et code postal" v-model="reponse1"/>

      </template>

      <template v-if="step === 3">
        <h1>Vos déplacements domicile-travail</h1>
        <p>Dans cette partie, il vous est demandé de caractériser vos déplacements domicile-travail (déplacements pendulaires).
            Vous pouvez renseigner votre destination principale. Il vous sera ensuite demandé d'indiquer votre trajet, vos jours et modes de déplacment, ainsi que les inconvenients et satisfactions que vous souhaitez exprimer.
        </p>
      </template>

      <template v-if="step === 4">
        <h1>{{ question2 }}</h1>
        <p>Merci de renseigner l'adresse en précisant le n°, la rue, le code postal et la ville.</p>
        <input type="text" placeholder="Numéro, rue, ville et code postal" v-model="reponse2"/>
      </template>

      <template v-if="step === 5">
        <h1>{{ question3 }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="presentiel" value="En présentiel uniquement" name="modeTravail" v-model="reponse3"/>
            <label for="presentiel">En présentiel uniquement</label>

            <input type="radio" id="distanciel" value="En distanciel uniquement" name="modeTravail" v-model="reponse3" />
            <label for="distanciel">En distanciel uniquement</label>

            <input type="radio" id="deux" value="En présentiel et en distanciel" name="modeTravail" v-model="reponse3"/>
            <label for="deux">En présentiel et en distanciel</label>
        </div>
      </template>

      <template v-if="step === 6">
        <h1>{{ question4 }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="tempsPlein" value="A temps plein" name="tempsTravail" v-model="reponse4"/>
            <label for="tempsPlein">A temps plein</label>

            <input type="radio" id="tempsPartiel" value="A temps partiel" name="tempsTravail" v-model="reponse4"/>
            <label for="tempsPartiel">A temps partiel</label>
        </div>
      </template>

    <template v-if="step === 7">
        <h1>{{ question5 }}</h1>
        <p>Plusieurs réponses possibles.</p>
        <div class="jours-container">
            <template v-for="jour in jours" :key="jour">
            <input
                type="checkbox"
                :id="jour"
                :value="jour"
                v-model="joursSelectionnes"
            />
            <label :for="jour">{{ jour }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 8">
        <h1>{{ question6 }}</h1>
        <div class="central-container">
            <div class="horaire-container">
                <input type="radio" id="horairesFixes" value="Horaires fixes" name="horaireTravailArrive" v-model="horaireType"/>
                <label for="horairesFixes">Horaires fixes</label>

                <input type="radio" id="plageHoraire" value="Plage horaire" name="horaireTravailArrive" v-model="horaireType"/>
                <label for="plageHoraire">Plage horaire</label>

                <input type="radio" id="horairesVariables" value="Horaires variables" name="horaireTravailArrive" v-model="horaireType"/>
                <label for="horairesVariables">Horaires variables</label>

            </div>

            <div style="padding: 40PX;">
                <!-- Si horaires variables, on affiche deux inputs -->
                <div v-if="horaireType === 'Plage horaire'" class="horaire-inputs">
                    <input type="time" v-model="heureDebut" />
                    <input type="time" v-model="heureFin" />
                </div>

                <div v-else-if="horaireType === 'Horaires fixes'" class="horaire-inputs">
                    <input type="time" v-model="heureDebut" />
                </div>

                <div v-else>
                </div>
            </div>
        </div>
    </template>

    <template v-if="step === 9">
        <h1>{{ question7 }}</h1>
        <div class="central-container">
            <div class="horaire-container">
                <input type="radio" id="horairesFixes" value="Horaires fixes" name="horaireTravailArrive" v-model="horaireType1"/>
                <label for="horairesFixes">Horaires fixes</label>

                <input type="radio" id="plageHoraire" value="Plage horaire" name="horaireTravailArrive" v-model="horaireType1"/>
                <label for="plageHoraire">Plage horaire</label>

                <input type="radio" id="horairesVariables" value="Horaires variables" name="horaireTravailArrive" v-model="horaireType1"/>
                <label for="horairesVariables">Horaires variables</label>

            </div>

            <div style="padding: 40PX;">
                <!-- Si horaires variables, on affiche deux inputs -->
                <div v-if="horaireType1 === 'Plage horaire'" class="horaire-inputs">
                    <input type="time" v-model="heureDebut1" />
                    <input type="time" v-model="heureFin1" />
                </div>

                <div v-else-if="horaireType1 === 'Horaires fixes'" class="horaire-inputs">
                    <input type="time" v-model="heureDebut1" />
                </div>

                <div v-else>
                </div>
            </div>
        </div>

    </template>


    <template v-if="step === 10">
        <h1>{{ question8 }}</h1>
        <div class="central-container">
            <div class="horaire-container">
                <input type="radio" id="horairesFixes" value="Horaires fixes" name="horaireTravailArrive" v-model="horaireType2"/>
                <label for="horairesFixes">Horaires fixes</label>

                <input type="radio" id="plageHoraire" value="Plage horaire" name="horaireTravailArrive" v-model="horaireType2"/>
                <label for="plageHoraire">Plage horaire</label>

                <input type="radio" id="horairesVariables" value="Horaires variables" name="horaireTravailArrive" v-model="horaireType2"/>
                <label for="horairesVariables">Horaires variables</label>

            </div>

            <div style="padding: 40PX;">
                <!-- Si horaires variables, on affiche deux inputs -->
                <div v-if="horaireType2 === 'Plage horaire'" class="horaire-inputs">
                    <input type="time" v-model="heureDebut2" />
                    <input type="time" v-model="heureFin2" />
                </div>

                <div v-else-if="horaireType2 === 'Horaires fixes'" class="horaire-inputs">
                    <input type="time" v-model="heureDebut2" />
                </div>

                <div v-else>
                </div>
            </div>
        </div>

    </template>

    <template v-if="step === 11">
        <h1>{{ question9 }}</h1>
        <p>Plusieurs réponses possibles.</p>

        <div class="jours-container">
            <template v-for="q11 in question11" :key="q11">
            <input
                type="checkbox"
                :id="q11"
                :value="q11"
                v-model="q11Selectionnes"
            />
            <label :for="q11">{{ q11 }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 12">
        <h1>{{ question10 }}</h1>
        <p>Plusieurs réponses possibles.</p>

        <div class="jours-container">
            <template v-for="q12 in question12" :key="q12">
            <input
                type="checkbox"
                :id="q12"
                :value="q12"
                v-model="q12Selectionnes"
            />
            <label :for="q12">{{ q12 }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 13">
        <h1>{{ question11ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="ouiDejeuner" value="oui" name="dejeuner" v-model="reponse11"/>
            <label for="ouiDejeuner">Oui</label>

            <input type="radio" id="nonDejeuner" value="non" name="dejeuner" v-model="reponse11"/>
            <label for="nonDejeuner">Non</label>
        </div>
    </template>

    <template v-if="step === 14">
        <h1>{{ question12ecrit }}</h1>
        <p>Plusieurs réponses possibles.</p>
        <div class="jours-container">
            <template v-for="q14 in question14" :key="q14">
            <input
                type="checkbox"
                :id="q14"
                :value="q14"
                v-model="q14Selectionnes"
            />
            <label :for="q14">{{ q14 }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 15">
        <h1>{{ question13ecrit }}</h1>
        <p>Sélectionner le ou les modes que vous utilisez le plus souvent pour un trajet (intermodalité).</p>
        <div class="jours-container">
            <template v-for="q15 in question15" :key="q15">
            <input
                type="checkbox"
                :id="q15"
                :value="q15"
                v-model="q15Selectionnes"
            />
            <label :for="q15">{{ q15 }}</label>
            </template>
        </div>

        <div class="btn-container">
            <div class="button-container">
                <button @click="step--">Précédent</button>

                <button @click="allerEtapeSuivanteDepuis15">Suivant</button>
                
            </div>
        </div>
    </template>



<!--------------------------------------------Vélo personnel électrique------------------------------------------->

    <template v-if="listStepTransport[stepTransport] === 1">
    <h1>{{ question14ecrit }}</h1>
    <p>Plusieurs réponses possibles.</p>
    <div class="jours-container">
        <template 
            v-for="(qInconVeloPersoElectrique, idx) in questionInconVeloPersoElectrique" 
            :key="`incon-velo-elec-${idx}`"
        >
            <input
                type="checkbox"
                :id="`incon-velo-elec-${idx}`"
                :value="qInconVeloPersoElectrique"
                v-model="qInconVeloPersoElectriqueSelectionnes"
            />
            <label :for="`incon-velo-elec-${idx}`">{{ qInconVeloPersoElectrique }}</label>
        </template>
    </div>

    <h1>{{ question15ecrit }}</h1>
    <p>Plusieurs réponses possibles.</p>
    <div class="jours-container">
        <template 
            v-for="(qAvanVeloPersoElectrique, idx) in questionAvanVeloPersoElectrique"  
            :key="`avan-velo-elec-${idx}`"
        >
            <input
                type="checkbox"
                :id="`avan-velo-elec-${idx}`"
                :value="qAvanVeloPersoElectrique"
                v-model="qAvanVeloPersoElectriqueSelectionnes"
            />
            <label :for="`avan-velo-elec-${idx}`">{{ qAvanVeloPersoElectrique }}</label>
        </template>
    </div>

    <div class="btn-container">
        <div class="button-container">
            <button v-if="stepTransport===0" @click="step=15, stepTransport--">Précédent</button>
            <button v-else @click="stepTransport--">Précédent</button>

            <button @click="stepTransport++">Suivant</button>
        </div>
    </div>
</template>


<!-----------------------------------------------Bus--------------------------------------------------------->

    <template v-if="listStepTransport[stepTransport] === 2">
  <h1>{{ question16ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientBus"
      :key="`bus-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`bus-inc-${idx}`"
        :value="item"
        v-model="qInconvenientBusSelectionnes"
      />
      <label :for="`bus-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question17ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvanBus"
      :key="`bus-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`bus-adv-${idx}`"
        :value="item"
        v-model="qAvanBusSelectionnes"
      />
      <label :for="`bus-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">Précédent</button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------bateau navette------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 3">
  <h1>{{ question18ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientBateauNavette"
      :key="`bateau-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`bateau-inc-${idx}`"
        :value="item"
        v-model="qInconvenientBateauNavetteSelectionnes"
      />
      <label :for="`bateau-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question19ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageBateauNavette"
      :key="`bateau-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`bateau-adv-${idx}`"
        :value="item"
        v-model="qAvantageBateauNavetteSelectionnes"
      />
      <label :for="`bateau-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">Précédent</button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Car interurbain------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 4">
  <h1>{{ question20ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientCarInterurbain"
      :key="`car-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`car-inc-${idx}`"
        :value="item"
        v-model="qInconvenientCarInterurbainSelectionnes"
      />
      <label :for="`car-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question21ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageCarInterurbain"
      :key="`car-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`car-adv-${idx}`"
        :value="item"
        v-model="qAvantageCarInterurbainSelectionnes"
      />
      <label :for="`car-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Covoiturage conducteur électrique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 5">
  <h1>{{ question22ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientCovoiConducteurElec"
      :key="`covoi-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-inc-${idx}`"
        :value="item"
        v-model="qInconvenientCovoiConducteurElecSelectionnes"
      />
      <label :for="`covoi-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question23ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageCovoiConducteurElec"
      :key="`covoi-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-adv-${idx}`"
        :value="item"
        v-model="qAvantageCovoiConducteurElecSelectionnes"
      />
      <label :for="`covoi-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Covoiturage conducteur hybride------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 6">
  <h1>{{ question24ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientCovoiConducteurHybride"
      :key="`covoi-hyb-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-hyb-inc-${idx}`"
        :value="item"
        v-model="qInconvenientCovoiConducteurHybrideSelectionnes"
      />
      <label :for="`covoi-hyb-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question25ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageCovoiConducteurHybride"
      :key="`covoi-hyb-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-hyb-adv-${idx}`"
        :value="item"
        v-model="qAvantageCovoiConducteurHybrideSelectionnes"
      />
      <label :for="`covoi-hyb-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Covoiturage conducteur thermique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 7">
  <h1>{{ question26ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientCovoiConducteurThermique"
      :key="`covoi-th-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-th-inc-${idx}`"
        :value="item"
        v-model="qInconvenientCovoiConducteurThermiqueSelectionnes"
      />
      <label :for="`covoi-th-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question27ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageCovoiConducteurThermique"
      :key="`covoi-th-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-th-adv-${idx}`"
        :value="item"
        v-model="qAvantageCovoiConducteurThermiqueSelectionnes"
      />
      <label :for="`covoi-th-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Covoiturage passager------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 8">
  <h1>{{ question28ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientCovoiPassager"
      :key="`covoi-pass-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-pass-inc-${idx}`"
        :value="item"
        v-model="qInconvenientCovoiPassagerSelectionnes"
      />
      <label :for="`covoi-pass-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question29ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageCovoiPassager"
      :key="`covoi-pass-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`covoi-pass-adv-${idx}`"
        :value="item"
        v-model="qAvantageCovoiPassagerSelectionnes"
      />
      <label :for="`covoi-pass-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Moto/Scooter en libre service------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 9">
  <h1>{{ question30ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientMotoLibre"
      :key="`moto-libre-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`moto-libre-inc-${idx}`"
        :value="item"
        v-model="qInconvenientMotoLibreSelectionnes"
      />
      <label :for="`moto-libre-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question31ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageMotoLibre"
      :key="`moto-libre-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`moto-libre-adv-${idx}`"
        :value="item"
        v-model="qAvantageMotoLibreSelectionnes"
      />
      <label :for="`moto-libre-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>

    <!----------------------------------------------Moto/Scooter personnel------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 10">
  <h1>{{ question32ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientMotoPerso"
      :key="`moto-perso-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`moto-perso-inc-${idx}`"
        :value="item"
        v-model="qInconvenientMotoPersoSelectionnes"
      />
      <label :for="`moto-perso-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question33ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageMotoPerso"
      :key="`moto-perso-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`moto-perso-adv-${idx}`"
        :value="item"
        v-model="qAvantageMotoPersoSelectionnes"
      />
      <label :for="`moto-perso-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Navette d'entreprise------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 11">
  <h1>{{ question34ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientNavetteEntreprise"
      :key="`navette-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`navette-inc-${idx}`"
        :value="item"
        v-model="qInconvenientNavetteEntrepriseSelectionnes"
      />
      <label :for="`navette-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question35ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageNavetteEntreprise"
      :key="`navette-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`navette-adv-${idx}`"
        :value="item"
        v-model="qAvantageNavetteEntrepriseSelectionnes"
      />
      <label :for="`navette-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Train------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 12">
  <h1>{{ question36ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientTrain"
      :key="`train-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`train-inc-${idx}`"
        :value="item"
        v-model="qInconvenientTrainSelectionnes"
      />
      <label :for="`train-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question37ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageTrain"
      :key="`train-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`train-adv-${idx}`"
        :value="item"
        v-model="qAvantageTrainSelectionnes"
      />
      <label :for="`train-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>

    
    <!----------------------------------------------Tramway------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 13">
  <h1>{{ question38ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientTramway"
      :key="`tram-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tram-inc-${idx}`"
        :value="item"
        v-model="qInconvenientTramwaySelectionnes"
      />
      <label :for="`tram-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question39ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageTramway"
      :key="`tram-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tram-adv-${idx}`"
        :value="item"
        v-model="qAvantageTramwaySelectionnes"
      />
      <label :for="`tram-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Trottinette en libre service électrique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 14">
  <h1>{{ question40ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientTrottinetteLibreElec"
      :key="`inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`inc-${idx}`"
        :value="item"
        v-model="qInconvenientTrottinetteLibreElecSelectionnes"
      />
      <label :for="`inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>{{ question41ecrit }}</h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageTrottinetteLibreElec"
      :key="`adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`adv-${idx}`"
        :value="item"
        v-model="qAvantageTrottinetteLibreElecSelectionnes"
      />
      <label :for="`adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport === 0" @click="step = 15; stepTransport--">Précédent</button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>

    <!----------------------------------------------Trottinette en libre service mécanique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 15">
  <h1>
    {{ question42ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientTrottinetteLibreMeca"
      :key="`tlm-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tlm-inc-${idx}`"
        :value="item"
        v-model="qInconvenientTrottinetteLibreMecaSelectionnes"
      />
      <label :for="`tlm-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question43ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageTrottinetteLibreMeca"
      :key="`tlm-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tlm-adv-${idx}`"
        :value="item"
        v-model="qAvantageTrottinetteLibreMecaSelectionnes"
      />
      <label :for="`tlm-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step = 15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>

    <!----------------------------------------------Trottinette personnelle électrique------------------------------------------>
   <template v-if="listStepTransport[stepTransport] === 16">
  <h1>
    {{ question44ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientTrottinettePersoElec"
      :key="`tpe-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tpe-inc-${idx}`"
        :value="item"
        v-model="qInconvenientTrottinettePersoElecSelectionnes"
      />
      <label :for="`tpe-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question45ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageTrottinettePersoElec"
      :key="`tpe-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tpe-adv-${idx}`"
        :value="item"
        v-model="qAvantageTrottinettePersoElecSelectionnes"
      />
      <label :for="`tpe-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Trottinette personnelle mécanique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 17">
  <h1>
    {{ question46ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientTrottinettePersoMeca"
      :key="`tpm-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tpm-inc-${idx}`"
        :value="item"
        v-model="qInconvenientTrottinettePersoMecaSelectionnes"
      />
      <label :for="`tpm-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question47ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageTrottinettePersoMeca"
      :key="`tpm-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`tpm-adv-${idx}`"
        :value="item"
        v-model="qAvantageTrottinettePersoMecaSelectionnes"
      />
      <label :for="`tpm-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Vélo cargo personnel électrique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 18">
  <h1>
    {{ question48ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVeloCargoPersoElec"
      :key="`vcpe-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vcpe-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVeloCargoPersoElecSelectionnes"
      />
      <label :for="`vcpe-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question49ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVeloCargoPersoElec"
      :key="`vcpe-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vcpe-adv-${idx}`"
        :value="item"
        v-model="qAvantageVeloCargoPersoElecSelectionnes"
      />
      <label :for="`vcpe-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Vélo cargo personnel mécanique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 19">
  <h1>
    {{ question50ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVeloCargoPersoMeca"
      :key="`vcpm-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vcpm-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVeloCargoPersoMecaSelectionnes"
      />
      <label :for="`vcpm-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question51ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVeloCargoPersoMeca"
      :key="`vcpm-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vcpm-adv-${idx}`"
        :value="item"
        v-model="qAvantageVeloCargoPersoMecaSelectionnes"
      />
      <label :for="`vcpm-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Vélo en libre service électrique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 20">
  <h1>
    {{ question52ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVeloLibreElec"
      :key="`vle-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vle-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVeloLibreElecSelectionnes"
      />
      <label :for="`vle-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question53ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVeloLibreElec"
      :key="`vle-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vle-adv-${idx}`"
        :value="item"
        v-model="qAvantageVeloLibreElecSelectionnes"
      />
      <label :for="`vle-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Vélo en libre service mécanique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 21">
  <h1>
    {{ question54ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVeloLibreMeca"
      :key="`vlm-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vlm-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVeloLibreMecaSelectionnes"
      />
      <label :for="`vlm-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question55ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVeloLibreMeca"
      :key="`vlm-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vlm-adv-${idx}`"
        :value="item"
        v-model="qAvantageVeloLibreMecaSelectionnes"
      />
      <label :for="`vlm-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!--------------------------------------------Vélo personnel mécanique------------------------------------------->

    <template v-if="listStepTransport[stepTransport] === 22">
  <h1>
    {{ question56ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconVeloPersoMeca"
      :key="`vp-meca-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-meca-inc-${idx}`"
        :value="item"
        v-model="qInconVeloPersoMecaSelectionnes"
      />
      <label :for="`vp-meca-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question57ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvanVeloPersoMeca"
      :key="`vp-meca-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-meca-adv-${idx}`"
        :value="item"
        v-model="qAvanVeloPersoMecaSelectionnes"
      />
      <label :for="`vp-meca-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Voiture en libre service électrique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 23">
  <h1>
    {{ question58ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVoitureLibreElec"
      :key="`vl-elec-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vl-elec-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVoitureLibreElecSelectionnes"
      />
      <label :for="`vl-elec-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question59ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVoitureLibreElec"
      :key="`vl-elec-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vl-elec-adv-${idx}`"
        :value="item"
        v-model="qAvantageVoitureLibreElecSelectionnes"
      />
      <label :for="`vl-elec-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Voiture en libre service hybride------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 24">
  <h1>
    {{ question60ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVoitureLibreHybride"
      :key="`vl-hybride-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vl-hybride-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVoitureLibreHybrideSelectionnes"
      />
      <label :for="`vl-hybride-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question61ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVoitureLibreHybride"
      :key="`vl-hybride-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vl-hybride-adv-${idx}`"
        :value="item"
        v-model="qAvantageVoitureLibreHybrideSelectionnes"
      />
      <label :for="`vl-hybride-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Voiture en libre service Thermique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 25">
  <h1>
    {{ question62ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVoitureLibreThermique"
      :key="`vl-therm-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vl-therm-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVoitureLibreThermiqueSelectionnes"
      />
      <label :for="`vl-therm-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question63ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVoitureLibreThermique"
      :key="`vl-therm-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vl-therm-adv-${idx}`"
        :value="item"
        v-model="qAvantageVoitureLibreThermiqueSelectionnes"
      />
      <label :for="`vl-therm-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Voiture personnelle électrique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 26">
  <h1>
    {{ question64ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVoiturePersoElec"
      :key="`vp-elec-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-elec-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVoiturePersoElecSelectionnes"
      />
      <label :for="`vp-elec-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question65ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVoiturePersoElec"
      :key="`vp-elec-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-elec-adv-${idx}`"
        :value="item"
        v-model="qAvantageVoiturePersoElecSelectionnes"
      />
      <label :for="`vp-elec-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>

    <!----------------------------------------------Voiture personnelle hybride------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 27">
  <h1>
    {{ question66ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVoiturePersoHybride"
      :key="`vp-hybride-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-hybride-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVoiturePersoHybrideSelectionnes"
      />
      <label :for="`vp-hybride-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question67ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVoiturePersoHybride"
      :key="`vp-hybride-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-hybride-adv-${idx}`"
        :value="item"
        v-model="qAvantageVoiturePersoHybrideSelectionnes"
      />
      <label :for="`vp-hybride-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>



    <!----------------------------------------------Voiture personnelle Thermique------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 28">
  <h1>
    {{ question68ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientVoiturePersoThermique"
      :key="`vp-thermique-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-thermique-inc-${idx}`"
        :value="item"
        v-model="qInconvenientVoiturePersoThermiqueSelectionnes"
      />
      <label :for="`vp-thermique-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question69ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageVoiturePersoThermique"
      :key="`vp-thermique-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`vp-thermique-adv-${idx}`"
        :value="item"
        v-model="qAvantageVoiturePersoThermiqueSelectionnes"
      />
      <label :for="`vp-thermique-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------Transport spécialisé personnes à mobilité réduite------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 29">
  <h1>
    {{ question70ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientReduite"
      :key="`reduit-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`reduit-inc-${idx}`"
        :value="item"
        v-model="qInconvenientReduiteSelectionnes"
      />
      <label :for="`reduit-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question71ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantageReduite"
      :key="`reduit-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`reduit-adv-${idx}`"
        :value="item"
        v-model="qAvantageReduiteSelectionnes"
      />
      <label :for="`reduit-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>


    <!----------------------------------------------À pied------------------------------------------>
    <template v-if="listStepTransport[stepTransport] === 30">
  <h1>
    {{ question72ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionInconvenientPied"
      :key="`pied-inc-${idx}`"
    >
      <input
        type="checkbox"
        :id="`pied-inc-${idx}`"
        :value="item"
        v-model="qInconvenientPiedSelectionnes"
      />
      <label :for="`pied-inc-${idx}`">{{ item }}</label>
    </template>
  </div>

  <h1>
    {{ question73ecrit }}
  </h1>
  <p>Plusieurs réponses possibles.</p>
  <div class="jours-container">
    <template
      v-for="(item, idx) in questionAvantagePied"
      :key="`pied-adv-${idx}`"
    >
      <input
        type="checkbox"
        :id="`pied-adv-${idx}`"
        :value="item"
        v-model="qAvantagePiedSelectionnes"
      />
      <label :for="`pied-adv-${idx}`">{{ item }}</label>
    </template>
  </div>

  <div class="btn-container">
    <div class="button-container">
      <button v-if="stepTransport===0" @click="step=15; stepTransport--">
        Précédent
      </button>
      <button v-else @click="stepTransport--">Précédent</button>
      <button @click="stepTransport++">Suivant</button>
    </div>
  </div>
</template>





    <template v-if="listStepTransport[stepTransport] === 31">
        <h1>Votre pratique du travail à distance</h1>
        <p>Dans cette partie, il vous est demandé de caractériser votre pratique du travail à distance.</p>

        <div class="btn-container">
            <div class="button-container">
                <button v-if="stepTransport===0" @click="step=15, stepTransport--">Précédent</button>
                <button v-else @click="stepTransport--">Précédent</button>

                <button @click="apresTransport">Suivant</button>
                
            </div>
        </div>
    </template>

    <template v-if="step === 16">
        <h1>{{ question74ecrit }}</h1>
        <p>Nous définissons le travail à la maison comme le travail effectué à la maison plutôt que sur le lieu de travail conventionnel, aux heure de travail habituelles.
            Nous définissons le coworking comme le travail effectué dans un espace dédié au travail et partagé entre plusieurs actifs plutôt que sur le lieu de travail.
            Plusieurs réponses possibles.
        </p>
        <div class="jours-container">
            <template v-for="q23 in question23" :key="q23">
            <input
                type="checkbox"
                :id="q23"
                :value="q23"
                v-model="q23Selectionnes"
            />
            <label :for="q23">{{ q23 }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 17">
        <h1>{{ question75ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="1" value="1" name="jTravailDistance" v-model="reponse75"/>
            <label for="1">1</label>

            <input type="radio" id="2" value="2" name="jTravailDistance" v-model="reponse75"/>
            <label for="2">2</label>

            <input type="radio" id="3" value="3" name="jTravailDistance" v-model="reponse75"/>
            <label for="3">3</label>

            <input type="radio" id="4" value="4" name="jTravailDistance" v-model="reponse75"/>
            <label for="4">4</label>

            <input type="radio" id="5" value="5" name="jTravailDistance" v-model="reponse75"/>
            <label for="5">5</label>

            <input type="radio" id="plus5" value="Plus de 5" name="jTravailDistance" v-model="reponse75"/>
            <label for="plus5">Plus de 5</label>

            <input type="radio" id="quelqueJoursParMois" value="Quelque jours par mois" name="jTravailDistance" v-model="reponse75"/>
            <label for="quelqueJoursParMois">Quelque jours par mois</label>

            <input type="radio" id="joursVariable" value="Jours variables" name="jTravailDistance" v-model="reponse75"/>
            <label for="joursVariable">Jours variables</label>
        </div>
    </template>

    <template v-if="step === 18">
        <h1>{{ question76ecrit }}</h1>
        <p>Plusieurs réponses possibles.</p>
        <div class="jours-container">
            <template v-for="q25 in question25" :key="q25">
            <input
                type="checkbox"
                :id="q25"
                :value="q25"
                v-model="q25Selectionnes"
            />
            <label :for="q25">{{ q25 }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 19">
        <h1>{{ question77ecrit }}</h1>
        <p>Plusieurs réponses possibles.</p>
        <div class="jours-container">
            <template v-for="q26 in question26" :key="q26">
            <input
                type="checkbox"
                :id="q26"
                :value="q26"
                v-model="q26Selectionnes"
            />
            <label :for="q26">{{ q26 }}</label>
            </template>
        </div>
    </template>
    <!--
    <template v-if="step === 20">
        <h1>souhaitez-vous faire un diagnostic pour vos déplacements inter-sites ?</h1>
        <p>Par déplacement inter-sites, on qualifie les déplacements entre votre lieu de travail principal et d'autre lieux de travail.
            Une seule réponse possible 
        </p>
        <div class="radio-container">
            <input type="radio" id="ouiInterSite" value="oui" name="interSite"/>
            <label for="ouiInterSite">Oui</label>

            <input type="radio" id="nonInterSite" value="non" name="interSite"/>
            <label for="nonInterSite">Non</label>
        </div>
    </template>-->

    <template v-if="step === 20">
        <h1>Votre rapport à la mobilité</h1>
        <p>Dans cette partie, il vous est demnandé d'indiquer votre perception vis-à-vis des différents modes de transport.
            L'idée étant, si vous le souhaitez, de vous accompagner dans un changement de pratiques de déplacements, pour tendre vers une mobilité plus durable.
        </p>
    </template>

    <template v-if="step === 21">
        <h1>{{ question78ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="ouiChangementMob" value="oui" name="changementMob" v-model="reponse78"/>
            <label for="ouiChangementMob">Oui</label>

            <input type="radio" id="nonChangementMob" value="non" name="changementMob" v-model="reponse78"/>
            <label for="nonChangementMob">Non</label>
        </div>
    </template>

    <template v-if="step === 22">
        <h1>{{ question79ecrit }}</h1>
        <p>Plusieurs réponses possibles.</p>
        <div class="jours-container">
            <template v-for="q30 in question30" :key="q30">
            <input
                type="checkbox"
                :id="q30"
                :value="q30"
                v-model="q30Selectionnes"
            />
            <label :for="q30">{{ q30 }}</label>
            </template>
        </div>
    </template>

    <template v-if="step === 23">
        <h1>{{ question80ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="ouiModulerHoraire" value="oui" name="modulerHoraire" v-model="reponse80"/>
            <label for="ouiModulerHoraire">Oui</label>

            <input type="radio" id="pasPossibleModulerHoraire" value="J'aimerais, mais ce n'est pas compatible avec mes obligations personnelles" name="modulerHoraire" v-model="reponse80"/>
            <label for="pasPossibleModulerHoraire">J'aimerais, mais ce n'est pas compatible avec mes obligations personnelles</label>

            <input type="radio" id="nonModulerHoraire" value="non" name="modulerHoraire" v-model="reponse80"/>
            <label for="nonModulerHoraire">Non</label>
        </div>
    </template>

    <template v-if="step === 24">
        <h1>{{ question81ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="covoiturageAttractif" value="Un mode de tansport attractif" name="covoiturage" v-model="reponse81"/>
            <label for="covoiturageAttractif">Un mode de tansport attractif</label>

            <input type="radio" id="covoiturageInteressant" value="Une alternative qui peut être iteressante" name="covoiturage" v-model="reponse81"/>
            <label for="covoiturageInteressant">Une alternative qui peut être iteressante</label>

            <input type="radio" id="covoiturageNon" value="N'est pas ce que je recherche commet alternativede transport" name="covoiturage" v-model="reponse81"/>
            <label for="covoiturageNon">N'est pas ce que je recherche commet alternativede transport</label>
        </div>
    </template>

    <template v-if="step === 25">
        <h1>{{ question82ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="veloAttractif" value="Un mode de tansport attractif" name="velo" v-model="reponse82"/>
            <label for="veloAttractif">Un mode de tansport attractif</label>

            <input type="radio" id="veloInteressant" value="Une alternative qui peut être iteressante" name="velo" v-model="reponse82"/>
            <label for="veloInteressant">Une alternative qui peut être iteressante</label>

            <input type="radio" id="veloNon" value="N'est pas ce que je recherche commet alternativede transport" name="velo" v-model="reponse82"/>
            <label for="veloNon">N'est pas ce que je recherche commet alternativede transport</label>
        </div>
    </template>

    <template v-if="step === 26">
        <h1>{{ question83ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="transportAttractif" value="Un mode de tansport attractif" name="transport" v-model="reponse83"/>
            <label for="transportAttractif">Un mode de tansport attractif</label>

            <input type="radio" id="transportInteressant" value="Une alternative qui peut être iteressante" name="transport" v-model="reponse83"/>
            <label for="transportInteressant">Une alternative qui peut être iteressante</label>

            <input type="radio" id="transportNon" value="N'est pas ce que je recherche commet alternativede transport" name="transport" v-model="reponse83"/>
            <label for="transportNon">N'est pas ce que je recherche commet alternativede transport</label>
        </div>
    </template>

    <template v-if="step === 27">
        <h1>{{ question84ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="voitureDemode" value="Pas au goût du jour" name="voiture" v-model="reponse84"/>
            <label for="voitureDemode">Pas au goût du jour</label>

            <input type="radio" id="voitureAvantage" value="Je resiste mais ce mode présente beaucoup d'avantages" name="voiture" v-model="reponse84"/>
            <label for="voitureAvantage">Je resiste mais ce mode présente beaucoup d'avantages</label>

            <input type="radio" id="voitureDeja" value="Je l'utilise déjà" name="voiture" v-model="reponse84"/>
            <label for="voitureDeja">Je l'utilise déjà</label>
        </div>
    </template>

    <template v-if="step === 28">
        <h1>{{ question85ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="journeeTravailDistancePlusProductif" value="Plus productif qu'au bureau" name="journeeTravailDistance" v-model="reponse85"/>
            <label for="journeeTravailDistancePlusProductif">Plus productif qu'au bureau</label>

            <input type="radio" id="journeeTravailDistanceAussiProductif" value="Aussi productif qu'au bureau" name="journeeTravailDistance" v-model="reponse85"/>
            <label for="journeeTravailDistanceAussiProductif">Aussi productif qu'au bureau</label>

            <input type="radio" id="journeeTravailDistanceMoinsProductif" value="Moins productif qu'au bureau" name="journeeTravailDistance" v-model="reponse85"/>
            <label for="journeeTravailDistanceMoinsProductif">Moins productif qu'au bureau</label>

            <input type="radio" id="journeeTravailDistanceSansAvis" value="Je n'ai pas d'avis car je n'en ai jamais fait" name="journeeTravailDistance" v-model="reponse85"/>
            <label for="journeeTravailDistanceSansAvis">Je n'ai pas d'avis car je n'en ai jamais fait</label>
        </div>
    </template>

    <template v-if="step === 29">
        <h1>Votre profil</h1>
        <p>Dans cette dernières partie, il vous est demandé d'indiquer quelques informations sur votre profil.</p>
    </template>

    <template v-if="step === 30">
        <h1>{{ question86ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="ouiEnfant" value="oui" name="Enfant" v-model="reponse86"/>
            <label for="ouiEnfant">Oui</label>

            <input type="radio" id="nonEnfant" value="non" name="Enfant" v-model="reponse86"/>
            <label for="nonEnfant">Non</label>

            <input type="radio" id="pasReponseEnfant" value="Je ne souhaite pas répondre" name="Enfant" v-model="reponse86"/>
            <label for="pasReponseEnfant">Je ne souhaite pas répondre</label>
        </div>
    </template>

    <template v-if="step === 31">
        <h1>{{ question87ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="ouiAccessibilite" value="oui" name="Accessibilite" v-model="accessibilite"/>
            <label for="ouiAccessibilite">Oui</label>

            <input type="radio" id="nonAccessibilite" value="non" name="Accessibilite" v-model="accessibilite"/>
            <label for="nonAccessibilite">Non</label>

            <input type="radio" id="pasReponseAccessibilite" value="Je ne souhaite pas répondre" name="Accessibilite" v-model="accessibilite"/>
            <label for="pasReponseAccessibilite">Je ne souhaite pas répondre</label>
        </div>
    </template>

    <template v-if="accessibilite === 'oui' && step === 31">
        <h1>{{ question88ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="pasProbleme" value="Je ne peux pas me déplacer en dehors de chez moi" name="Probleme" v-model="reponse88"/>
            <label for="pasProbleme">Je ne peux pas me déplacer en dehors de chez moi</label>

            <input type="radio" id="autourProbleme" value="Je peux marcher autour de mon pâté de maison" name="Probleme" v-model="reponse88"/>
            <label for="autourProbleme">Je peux marcher autour de mon pâté de maison</label>

            <input type="radio" id="moyenneProbleme" value="Je peux marcher sur de moyennes distances mais avec difficulté" name="Probleme" v-model="reponse88"/>
            <label for="moyenneProbleme">Je peux marcher sur de moyennes distances mais avec difficulté</label>
        </div>
    </template>

    <template v-if="step === 32">
        <h1>{{ question89ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="hommeGenre" value="Un homme" name="Genre" v-model="reponse89"/>
            <label for="hommeGenre">Un homme</label>

            <input type="radio" id="femmeGenre" value="Une femme" name="Genre" v-model="reponse89"/>
            <label for="femmeGenre">Une femme</label>

            <input type="radio" id="pasGenre" value="Je ne préfère pas répondre" name="Genre"v-model="reponse89"/>
            <label for="pasGenre">Je ne préfère pas répondre</label>
        </div>
    </template>

    <template v-if="step === 33">
        <h1>{{ question90ecrit }}</h1>
        <p>Une seule réponse possible.</p>
        <div class="radio-container">
            <input type="radio" id="moins18Age" value="J'ai moins de 18 ans" name="Age" v-model="reponse90"/>
            <label for="moins18Age">J'ai moins de 18 ans</label>

            <input type="radio" id="18entre25Age" value="J'ai entre 18 et 25 ans" name="Age" v-model="reponse90"/>
            <label for="18entre25Age">J'ai entre 18 et 25 ans</label>

            <input type="radio" id="26entre40Age" value="J'ai entre 26 et 40 ans" name="Age" v-model="reponse90"/>
            <label for="26entre40Age">J'ai entre 26 et 40 ans</label>

            <input type="radio" id="41entre60Age" value="J'ai entre 41 et 60 ans" name="Age" v-model="reponse90"/>
            <label for="41entre60Age">J'ai entre 41 et 60 ans</label>

            <input type="radio" id="plus60Age" value="J'ai plus de 60 ans" name="Age" v-model="reponse90"/>
            <label for="plus60Age">J'ai plus de 60 ans</label>

            <input type="radio" id="pasAge" value="Je ne préfère pas répondre" name="Age" v-model="reponse90"/>
            <label for="pasAge">Je ne préfère pas répondre</label>
        </div>
    </template>

    <template v-if="step === 34">
        <div class="central-container">
            <h1>Merci pour votre participation !</h1>
        </div>
        
    </template>

    

        <div class="btn-container">
            <div class="button-container">
                <button
                v-if="step > 1 && step !== 15 && listStepTransport.length===0"
                @click="step--"
                :disabled="isSubmitting"
                >
                Précédent
                </button>

                <button
                v-if="step < totalSteps && step !== 15"
                @click="step++"
                :disabled="isSubmitting || (step === 1 && !accordAccepte)"
                >
                Suivant
                </button>

                <button
                v-else-if="step === totalSteps"
                @click="chargeTout"
                :disabled="isSubmitting"
                class="submit-btn"
                >
                <span v-if="!isSubmitting">Terminé mon questionnaire</span>
                <span v-else class="spinner"></span>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const step = ref(1);
const totalSteps = 34;
const accordAccepte = ref(false);

const affiche = ref(true);






const submitForm = () => {
  console.log("Formulaire soumis");
};


const jours = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
  'Jours variables'
]
const joursSelectionnes = ref([])


const question11 = [
    'Je ne fait pas d\'étape le matin',
    'Je dépose mon/mes enfant(s) à l\'école au moins 2 fois par semaine',
    "J'ai une activité sportive ou loisir au moins 2 fois par semaine",
    'Je fais des courses personnelles au moins 2 fois par semaine',
    'Je fais ponctuellement des étapes diverses'
]
const q11Selectionnes = ref([])


const question12 = [
    'Je ne fait pas d\'étape le soir',
    'Je vais chercher mon/mes enfant(s) à l\'école au moins 2 fois par semaine',
    "J'ai une activité sportive ou loisir au moins 2 fois par semaine",
    'Je fais des courses personnelles au moins 2 fois par semaine',
    'Je fais ponctuellement des étapes diverses'
]
const q12Selectionnes = ref([])

const question14 = [
    "Je n'ai pas assez de temps",
    "Il n'y a pas d'offre de restauration à proximité",
    "Je ne connais pas l'offre de restauration",
    "L'offre de restauration environante ne me satisfait pas",
    "L'offre de restauration est trop chère",
    "Il n'y a pas d'offre de transport pour un accéder",
    "L'offre de transport existante n'est pas adaptée à la pause déjeuner",
    "Aucun inconvénient"
]
const q14Selectionnes = ref([])



const stepTransport = ref(0);


const questionInconVeloPersoElectrique = [
    "Autonomie de la batterie",
    "Coût d’entretien et d’équipement",
    "Dénivelé",
    "Douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Manque d’équipement",
    "Manque de casiers à destination",
    "Manque de stationnement",
    "Météo",
    "Qualité de la chaussée",
    "Rechargement à destination",
    "Réparation / entretien compliqué",
    "Sécurisation du stationnement",
    "Sécurité",
    "Travaux",
    "Difficile de transporter des achats",
    "Pas pratique avec les enfants",
    "Difficile de transporter son vélo",
    "Pistes cyclables encombrées",
    "Manque de pistes cyclables",
    "Trop de trafic",
    "Trop de pollution",
    "Aucun inconvénient"
]
const qInconVeloPersoElectriqueSelectionnes = ref([])

const questionInconvenientBus = [
    "Absence d’abri bus",
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Impact environnemental",
    "Manque d’information",
    "Je manque de flexibilité avec ce mode de déplacement",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ponctualité",
    "Propreté et confort",
    "Risque sanitaire",
    "Sécurité",
    "Temps de marche total excessif",
    "Trop de monde à bord",
    "Difficile de transporter des achats",
    "Pas pratique avec les enfants",
    "Fiabilité du service",
    "Faible fréquence en heures creuses",
    "Faible fréquence en période de vacances",
    "Trop de changements",
    "Peu de sièges disponibles",
    "Achat de billet compliqué",
    "Aucun inconvénient"
];
const qInconvenientBusSelectionnes = ref([])

const questionAvanVeloPersoElectrique = [
    "Facile de transporter son vélo",
    "Pistes cyclables respectées",
    "Facile de transporter des achats",
    "Pratique avec les enfants",
    "Trafic fluide",
    "Peu de pollution",
    "Possibilité transport multimodal",
    "Autonomie de la batterie",
    "Entretien et équipement peu coûteux",
    "Peu de dénivelé",
    "Présence de douche",
    "Trajet rapide",
    "Éclairage",
    "Reposant / Relaxant",
    "Équipement mis à disposition",
    "Présence de casiers à destination",
    "Place de stationnement disponible",
    "Qualité de la chaussée",
    "Rechargement à destination",
    "Réparation / entretien facile",
    "Sécurisation du stationnement",
    "Sécurité",
    "Présence de pistes cyclables",
    "Bon pour la santé/forme",
    "Aucune satisfaction"
];
const qAvanVeloPersoElectriqueSelectionnes = ref([])

const questionAvanBus = [
    "Facile de transporter des achats",
    "Pratique avec les enfants",
    "Fiabilité du service",
    "Bonne fréquence en heures creuses",
    "Bonne fréquence en période de vacances",
    "Abribus adapté",
    "Arrêt proche de mon domicile",
    "Économe",
    "Bon maillage du transport en commun / bus",
    "Trajet rapide",
    "Trafic fluide",
    "Reposant / Relaxant",
    "Passage fréquent",
    "Horaires adaptés",
    "Plus écologique",
    "Information claire et compréhensible",
    "Flexible",
    "Services à bord",
    "Facilité d’accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Respect des gestes barrières",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Distance entre chaque arrêt",
    "Possibilité de faire une autre activité (lire, regarder un film…)",
    "Achat de billet facile",
    "Peu ou pas de changements",
    "Aucune satisfaction"
];
const qAvanBusSelectionnes = ref([])

const question21 = [
    "Abribus adapté",
    "Arrêt proche de mon domicile",
    "Économe",
    "Bon maillage du transport en commun / bus",
    "Trajet rapide",
    "Trafic fluide",
    "Reposant / Relaxant",
    "Passage fréquent",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Flexible",
    "Services à bord",
    "Facilité d’accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Réservation facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Distance entre chaque arrêt",
    "Possibilité de faire une autre activité (lire, regarder un film…)",
    "Peu ou pas de changements",
    "Aucune satisfaction"
];
const q21Selectionnes = ref([])

const question23 = [
    'Maison',
    'Coworking'
]
const q23Selectionnes = ref([])

const question25 = [
    "Pas ou mauvaise connexion internet",
    "Mon mobilier n'est pas adapté (bureau, chaise de bureau…)",
    "Je n'ai pas d'ordinateur professionnel / mon ordinateur personnel n'est pas adapté",
    "Je ne peux pas suffisamment me concentrer",
    "Je me sens isolé(e)",
    "De travailler depuis chez soi est mal vu dans l'entreprise",
    "Obtenir une autorisation pour travailler depuis chez soi est trop compliqué dans mon entreprise",
    "Je n'arrive pas à trouver l'équilibre entre vie professionnelle et vie personnelle",
    "Je ne suis pas/moins productif(ve)",
    "Je suis mal installé(e), je souffre physiquement du fait de cette installation",
    "J'ai l'impression de plus travailler en télétravail",
    "Il me manque des compétences d'organisation",
    "Mon process n'est pas adapté au télétravail",
    "Aucun inconvénient"
];
const q25Selectionnes = ref([])

const question26 = [
    "Une productivité accrue",
    "Une meilleure concentration",
    "Une transition digitale relativement réussie",
    "Une augmentation de l'autonomie",
    "Une relation de confiance renouvelée entre collaborateurs et managers",
    "Une préservation des collaborations avec des outils permettant des moments conviviaux et informels",
    "Une meilleure flexibilité entre le professionnel et le privé",
    "Aucun avantage"
];
const q26Selectionnes = ref([])

const question30 = [
    "Je souhaite me déplacer moins",
    "Je souhaite réduire l'utilisation de ma voiture individuelle",
    "Je souhaite faire plus de covoiturage en tant que conducteur",
    "Je souhaite changer la motorisation de mon véhicule pour aller vers des énergies électriques, hybrides ou hydrogène",
    "Je souhaite davantage me déplacer en transports en commun",
    "Je souhaite davantage me déplacer à vélo",
    "Je souhaite me déplacer davantage à pied",
    "Je souhaite faire plus de covoiturage en tant que passager",
    "Je me déplace déjà de manière durable",
    "Aucune"
];
const q30Selectionnes = ref([])

const questionInconvenientBateauNavette = [
    "Absence d'abribus",
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Impact environnemental",
    "Manque d'informations \"usager\"",
    "Manque de flexibilité",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ne passe / ne s'arrête pas systématiquement",
    "Ponctualité",
    "Propreté et confort",
    "Achat de billet compliqué",
    "Risque sanitaire",
    "Sentiment d'insécurité",
    "Peu de sièges disponibles",
    "Temps de marche total excessif",
    "Trop de changements",
    "Trop de monde à bord",
    "Météo",
    "Difficile de transporter des achats",
    "Pas pratique avec les enfants",
    "Fiabilité du service",
    "Faible fréquence en heures creuses",
    "Faible fréquence en période de vacances",
    "Manque de correspondances",
    "Aucun inconvénient"
];
const qInconvenientBateauNavetteSelectionnes = ref([])

const questionAvantageBateauNavette = [
    "Abribus adapté",
    "Arrêt proche",
    "Plus économique",
    "Bon réseau de transports en commun",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Passage fréquent",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Plus écologique",
    "Flexibilité",
    "Services à bord",
    "Facilité d'accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Bonne fréquence en heures creuses",
    "Bonne fréquence en période de vacances",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Achat de billet facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Peu ou pas de changements",
    "Facile de transporter des charges",
    "Pratique avec les enfants",
    "Fiabilité du service",
    "Aucune satisfaction"
];
const qAvantageBateauNavetteSelectionnes = ref([])

const questionInconvenientCarInterurbain = [
    "Absence d'abribus",
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Impact environnemental",
    "Manque d'informations \"usager\"",
    "Manque de flexibilité",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ne passe / ne s'arrête pas systématiquement",
    "Ponctualité",
    "Propreté et confort",
    "Achat de billet compliqué",
    "Risque sanitaire",
    "Sentiment d'insécurité",
    "Peu de sièges disponibles",
    "Temps de marche total excessif",
    "Trop de changements",
    "Trop de monde à bord",
    "Difficile de transporter des achats",
    "Pas pratique avec les enfants",
    "Fiabilité du service",
    "Faible fréquence en heures creuses",
    "Faible fréquence en période de vacances",
    "Manque de correspondances",
    "Aucun inconvénient"
];
const qInconvenientCarInterurbainSelectionnes = ref([])

const questionAvantageCarInterurbain = [
    "Abribus adapté",
    "Arrêt proche",
    "Bon réseau de transports en commun",
    "Circulation fluide",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Passage fréquent",
    "Plus écologique",
    "Plus économique",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Flexibilité",
    "Services à bord",
    "Facilité d'accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Bonne fréquence en heures creuses",
    "Bonne fréquence en période de vacances",
    "Respect des arrêts",
    "Respect des gestes barrières",
    "Ponctualité",
    "Propreté et confort",
    "Achat de billet facile",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Facile de transporter des charges",
    "Pratique avec les enfants",
    "Peu ou pas de changements",
    "Fiabilité du service",
    "Aucune satisfaction"
];
const qAvantageCarInterurbainSelectionnes = ref([])

const questionInconvenientCovoiConducteurElec = [
    "Autonomie de la batterie",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fiabilité du covoitureur",
    "Garantie du trajet retour",
    "Impact environnemental",
    "Manque de flexibilité",
    "Manque de stationnement",
    "Mobilité des premiers / derniers mètres",
    "Ponctualité",
    "Propreté et confort",
    "Manque de rechargement batterie à destination",
    "Réservation / mise en relation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Je n'aime pas conduire",
    "Aucun inconvénient"
];
const qInconvenientCovoiConducteurElecSelectionnes = ref([])

const questionAvantageCovoiConducteurElec = [
    "Autonomie de la batterie",
    "Plus économique",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Fiabilité du covoitureur",
    "Plus écologique",
    "Flexibilité",
    "Place de stationnement disponible",
    "Facilité d'accès des premiers / derniers mètres",
    "Propreté et confort",
    "Ponctualité",
    "Rechargement à destination",
    "Réservation / mise en relation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "J'aime conduire",
    "Aucune satisfaction"
];
const qAvantageCovoiConducteurElecSelectionnes = ref([])

const questionInconvenientCovoiConducteurHybride = [
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fiabilité du covoitureur",
    "Garantie du trajet retour",
    "Impact environnemental",
    "Manque de flexibilité",
    "Manque de stationnement",
    "Mobilité des premiers / derniers mètres",
    "Ponctualité",
    "Propreté et confort",
    "Réservation / mise en relation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Je n'aime pas conduire",
    "Aucun inconvénient"
];
const qInconvenientCovoiConducteurHybrideSelectionnes = ref([])

const questionAvantageCovoiConducteurHybride = [
    "Plus économique",
    "Trajet rapide",
    "Circulation fluide",
    "Flexibilité",
    "Reposant / Relaxant",
    "Fiabilité du covoitureur",
    "Plus écologique",
    "Place de stationnement disponible",
    "Facilité d'accès des premiers / derniers mètres",
    "Ponctualité",
    "Propreté et confort",
    "Réservation / mise en relation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "J'aime conduire",
    "Aucune satisfaction"
];
const qAvantageCovoiConducteurHybrideSelectionnes = ref([])

const questionInconvenientCovoiConducteurThermique = [
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fiabilité du covoitureur",
    "Garantie du trajet retour",
    "Impact environnemental",
    "Manque de flexibilité",
    "Manque de stationnement",
    "Mobilité des premiers / derniers mètres",
    "Ponctualité",
    "Propreté et confort",
    "Réservation / mise en relation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Je n'aime pas conduire",
    "Aucun inconvénient"
];
const qInconvenientCovoiConducteurThermiqueSelectionnes = ref([])

const questionAvantageCovoiConducteurThermique = [
    "Plus économique",
    "Facilité d'accès des premiers / derniers mètres",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Fiabilité du covoitureur",
    "Plus écologique",
    "Flexibilité",
    "Ponctualité",
    "Propreté et confort",
    "Réservation / mise en relation facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Place de stationnement disponible",
    "Stationnement sécurisé",
    "J'aime conduire",
    "Aucune satisfaction"
];
const qAvantageCovoiConducteurThermiqueSelectionnes = ref([])

const questionInconvenientCovoiPassager = [
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fiabilité du covoitureur",
    "Garantie du trajet retour",
    "Impact environnemental",
    "Manque de flexibilité",
    "Mobilité des premiers / derniers mètres",
    "Ponctualité",
    "Propreté et confort",
    "Réservation / mise en relation compliquée",
    "Risque sanitaire",
    "Sentiment d'insécurité",
    "S'adapter aux contraintes du conducteur",
    "Aucun inconvénient"
];
const qInconvenientCovoiPassagerSelectionnes = ref([])

const questionAvantageCovoiPassager = [
    "Plus économique",
    "Facilité d'accès des premiers / derniers mètres",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Fiabilité du covoitureur",
    "Plus écologique",
    "Flexibilité",
    "Ponctualité",
    "Propreté et confort",
    "Réservation / mise en relation facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Aucune satisfaction"
];
const qAvantageCovoiPassagerSelectionnes = ref([])

const questionInconvenientMotoLibre = [
    "Capacité de rangement (coffre)",
    "Coût de location",
    "Disponibilité",
    "Fatigue",
    "Garantie du trajet retour",
    "Impact environnemental",
    "Manque d'équipement",
    "Manque de stationnement",
    "Mauvais entretien",
    "Météo",
    "Mauvaise qualité du matériel",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Embouteillage",
    "Travaux",
    "Propreté et confort",
    "Aucun inconvénient"
];
const qInconvenientMotoLibreSelectionnes = ref([])

const questionAvantageMotoLibre = [
  "Capacité de rangement (coffre)",
  "Coût de location avantageux",
  "Disponibilité",
  "Reposant / Relaxant",
  "Equipement mis à disposition",
  "Place de stationnement disponible",
  "Bon entretien",
  "Qualité du matériel",
  "Réservation facile",
  "Respect des gestes barrières",
  "Stationnement sécurisé",
  "Sécurité",
  "Trajet rapide",
  "Aucune satisfaction"
];
const qAvantageMotoLibreSelectionnes = ref([])

const questionInconvenientMotoPerso = [
    "Capacité de rangement (coffre)",
    "Coût",
    "Fatigue",
    "Impact environnemental",
    "Manque d'équipement",
    "Manque de stationnement",
    "Météo",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Embouteillage",
    "Travaux",
    "Aucun inconvénient"
];
const qInconvenientMotoPersoSelectionnes = ref([])

const questionAvantageMotoPerso = [
    "Capacité de rangement (coffre)",
    "Plus économique",
    "Reposant / Relaxant",
    "Equipement mis à disposition",
    "Place de stationnement disponible",
    "Stationnement sécurisé",
    "Sécurité",
    "Trajet rapide",
    "Aucune satisfaction"
];
const qAvantageMotoPersoSelectionnes = ref([])


const questionInconvenientNavetteEntreprise = [
    "Absence d'abri bus",
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Impact environnemental",
    "Manque d'informations \"usager\"",
    "Manque de flexibilité",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ne passe / ne s'arrête pas systématiquement",
    "Ponctualité",
    "Propreté et confort",
    "Réservation compliquée",
    "Risque sanitaire",
    "Sentiment d'insécurité",
    "Peu de sièges disponibles",
    "Temps de marche total excessif",
    "Trop de monde à bord",
    "Trop de changements",
    "Fiabilité du service",
    "Faible fréquence en heures creuses",
    "Faible fréquence en période de vacances",
    "Aucun inconvénient"
];
const qInconvenientNavetteEntrepriseSelectionnes = ref([])

const questionAvantageNavetteEntreprise = [
    "Abribus adapté",
    "Arrêt proche",
    "Plus économique",
    "Bon réseau de transports en commun",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Passage fréquent",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Flexibilité",
    "Services à bord",
    "Facilité d'accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Bonne fréquence en heures creuses",
    "Bonne fréquence en période de vacances",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Réservation facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Peu ou pas de changements",
    "Fiabilité du service",
    "Aucune satisfaction"
];
const qAvantageNavetteEntrepriseSelectionnes = ref([])

const questionInconvenientTrain = [
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Manque d’information",
    "Manque de flexibilité",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ponctualité",
    "Propreté et confort",
    "Risque sanitaire",
    "Sécurité",
    "Temps de marche total excessif",
    "Trop de monde à bord",
    "Absence d’abris à l’arrêt",
    "Trop de changements",
    "Achat de billet compliqué",
    "Peu de sièges disponibles",
    "Aucun inconvénient"
];
const qInconvenientTrainSelectionnes = ref([])

const questionAvantageTrain = [
    "Abribus adapté",
    "Arrêt proche de mon domicile",
    "Économe",
    "Bon maillage du transport en commun / bus",
    "Trajet rapide",
    "Trafic fluide",
    "Reposant / Relaxant",
    "Passage fréquent",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Flexible",
    "Services à bord",
    "Facilité d’accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Réservation facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Distance entre chaque arrêt",
    "Possibilité de faire une autre activité (lire, regarder un film…)",
    "Peu ou pas de changements",
    "Aucune satisfaction"
];
const qAvantageTrainSelectionnes = ref([])

const questionInconvenientTramway = [
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Manque d'informations \"usager\"",
    "Manque de flexibilité",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ne passe / ne s'arrête pas systématiquement",
    "Ponctualité",
    "Propreté et confort",
    "Risque sanitaire",
    "Sentiment d'insécurité",
    "Peu de sièges disponibles",
    "Temps de marche total excessif",
    "Trop de monde à bord",
    "Absence d'abris à l'arrêt",
    "Achat de billet compliqué",
    "Trop de changements",
    "Difficile de transporter des achats",
    "Pas pratique avec les enfants",
    "Fiabilité du service",
    "Faible fréquence en heures creuses",
    "Faible fréquence en période de vacances",
    "Manque de correspondances",
    "Aucun inconvénient"
];
const qInconvenientTramwaySelectionnes = ref([])

const questionAvantageTramway = [
    "Abribus adapté",
    "Arrêt proche",
    "Bon réseau de transports en commun",
    "Plus économique",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Passage fréquent",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Facilité d'accès des premiers / derniers mètres",
    "Fonctionne le week-end / la nuit",
    "Bonne fréquence en heures creuses",
    "Bonne fréquence en période de vacances",
    "Fiabilité du service",
    "Flexibilité",
    "Services à bord",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Achat de billet facile",
    "Respect des gestes barrières",
    "Sécurité",
    "Sièges disponibles",
    "Temps de marche total acceptable",
    "Peu ou pas de changements",
    "Facile de transporter des charges",
    "Plus écologique",
    "Aucune satisfaction"
];
const qAvantageTramwaySelectionnes = ref([])


const questionInconvenientTrottinetteLibreElec = [
    "Absence de possibilité de transport multimodal",
    "Autonomie de la batterie",
    "Coût d'entretien et d'équipement",
    "Coût de location",
    "Dénivelé",
    "Disponibilité",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Garantie du trajet retour",
    "Manque d'équipement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement",
    "Mauvais entretien",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Mauvaise qualité du matériel",
    "Manque de rechargement batterie à destination",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Aucun inconvénient"
];
const qInconvenientTrottinetteLibreElecSelectionnes = ref([])

const questionAvantageTrottinetteLibreElec = [
    "Possibilité de combiner plusieurs modes de transport",
    "Autonomie de la batterie",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Coût de location avantageux",
    "Peu de dénivelé",
    "Disponibilité",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Casiers de rangement à destination",
    "Place de stationnement disponible",
    "Bon entretien",
    "Qualité de la chaussée",
    "Qualité du matériel",
    "Rechargement à destination",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Plus écologique",
    "Plus économique",
    "Aucune satisfaction"
];
const qAvantageTrottinetteLibreElecSelectionnes = ref([])

const questionInconvenientTrottinetteLibreMeca = [
    "Absence de possibilité de transport multimodal",
    "Coût d'entretien et d'équipement",
    "Coût de location",
    "Disponibilité",
    "Manque de douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Garantie du trajet retour",
    "Manque d'équipement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement",
    "Mauvais entretien",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Mauvaise qualité du matériel",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Dénivelé",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Aucun inconvénient"
];
const qInconvenientTrottinetteLibreMecaSelectionnes = ref([])

const questionAvantageTrottinetteLibreMeca = [
    "Possibilité de combiner plusieurs modes de transport",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Coût de location avantageux",
    "Peu de dénivelé",
    "Disponibilité",
    "Présence de douche",
    "Trajet rapide",
    "Circulation fluide",
    "Casiers de rangement à destination",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Bon entretien",
    "Qualité de la chaussée",
    "Qualité du matériel",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "Plus écologique",
    "Plus économique",
    "Bon pour la santé/forme",
    "Aucune satisfaction"
];
const qAvantageTrottinetteLibreMecaSelectionnes = ref([])

const questionInconvenientTrottinettePersoElec = [
    "Absence de possibilité de transport multimodal",
    "Autonomie de la batterie",
    "Coût d'entretien et d'équipement",
    "Dénivelé",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Manque d'équipement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Manque de rechargement batterie à destination",
    "Réparation / entretien compliqué",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Difficile de transporter sa trottinette",
    "Aucun inconvénient"
];
const qInconvenientTrottinettePersoElecSelectionnes = ref([])

const questionAvantageTrottinettePersoElec = [
    "Possibilité de combiner plusieurs modes de transport",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Reposant / Relaxant",
    "Autonomie de la batterie",
    "Peu de dénivelé",
    "Trajet rapide",
    "Circulation fluide",
    "Casiers de rangement à destination",
    "Place de stationnement disponible",
    "Qualité de la chaussée",
    "Rechargement à destination",
    "Réparation / entretien facile",
    "Stationnement sécurisé",
    "Sécurité",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Facile de transporter sa trottinette",
    "Plus écologique",
    "Plus économique",
    "Aucune satisfaction"
];
const qAvantageTrottinettePersoElecSelectionnes = ref([])

const questionInconvenientTrottinettePersoMeca = [
    "Absence de possibilité de transport multimodal",
    "Coût d'entretien et d'équipement",
    "Dénivelé",
    "Manque de douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Manque d'équipement",
    "Manque de stationnement",
    "Manque de casiers de rangement à destination",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Réparation / entretien compliqué",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Difficile de transporter sa trottinette",
    "Aucun inconvénient"
];
const qInconvenientTrottinettePersoMecaSelectionnes = ref([])

const questionAvantageTrottinettePersoMeca = [
    "Possibilité de combiner plusieurs modes de transport",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Peu de dénivelé",
    "Présence de douche",
    "Casiers de rangement à destination",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Qualité de la chaussée",
    "Réparation / entretien facile",
    "Stationnement sécurisé",
    "Sécurité",
    "Facile de transporter sa trottinette",
    "Plus écologique",
    "Plus économique",
    "Bon pour la santé/forme",
    "Aucune satisfaction"
];
const qAvantageTrottinettePersoMecaSelectionnes = ref([])

const questionInconvenientVeloCargoPersoElec = [
    "Coût d'entretien et d'équipement",
    "Dénivelé",
    "Manque de douche",
    "Durée du trajet",
    "Fatigue",
    "Manque d'équipement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Manque de rechargement batterie à destination",
    "Réparation / entretien compliqué",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Absence de possibilité de transport multimodal",
    "Autonomie de la batterie",
    "Manque de places appropriées",
    "Difficile à manœuvrer (poids, taille)",
    "Difficile de transporter de la charge",
    "Manque de flexibilité",
    "Aucun inconvénient"
];
const qInconvenientVeloCargoPersoElecSelectionnes = ref([])

const questionAvantageVeloCargoPersoElec = [
    "Possibilité de combiner plusieurs modes de transport",
    "Autonomie de la batterie",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Peu de dénivelé",
    "Présence de douche",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Casiers de rangement à destination",
    "Place de stationnement disponible",
    "Qualité de la chaussée",
    "Rechargement à destination",
    "Réparation / entretien facile",
    "Stationnement sécurisé",
    "Sécurité",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Bon pour la santé/forme",
    "Plus écologique",
    "Plus économique",
    "Conciliation vie pro/vie perso",
    "Flexibilité",
    "Praticité pour transport de charge",
    "Aucune satisfaction"
];
const qAvantageVeloCargoPersoElecSelectionnes = ref([])

const questionInconvenientVeloCargoPersoMeca = [
    "Absence de possibilité de transport multimodal",
    "Dénivelé",
    "Manque de douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Manque d'équipement",
    "Météo",
    "Manque de stationnement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Mauvaise qualité de la chaussée",
    "Coût d'entretien et d'équipement",
    "Réparation / entretien compliqué",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Manque de places appropriées",
    "Difficile à manœuvrer (poids, taille)",
    "Difficile de transporter de la charge",
    "Manque de flexibilité",
    "Aucun inconvénient"
];
const qInconvenientVeloCargoPersoMecaSelectionnes = ref([])

const questionAvantageVeloCargoPersoMeca = [
    "Possibilité de combiner plusieurs modes de transport",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Peu de dénivelé",
    "Casiers de rangement à destination",
    "Présence de douche",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Qualité de la chaussée",
    "Réparation / entretien facile",
    "Stationnement sécurisé",
    "Sécurité",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Bon pour la santé/forme",
    "Plus écologique",
    "Plus économique",
    "Conciliation vie pro/vie perso",
    "Flexibilité",
    "Praticité pour transport de charge",
    "Aucune satisfaction"
];
const qAvantageVeloCargoPersoMecaSelectionnes = ref([])


const questionInconvenientVeloLibreElec = [
    "Absence de possibilité de transport multimodal",
    "Autonomie de la batterie",
    "Coût d'entretien et d'équipement",
    "Coût de location",
    "Dénivelé",
    "Disponibilité",
    "Manque de douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Garantie du trajet retour",
    "Manque d'équipement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement",
    "Mauvais entretien",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Mauvaise qualité du matériel",
    "Manque de rechargement batterie à destination",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Trop de trafic",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Pollution de l'air/sonore",
    "Difficile de transporter de la charge",
    "Manque de flexibilité",
    "Aucun inconvénient"
];
const qInconvenientVeloLibreElecSelectionnes = ref([])

const questionAvantageVeloLibreElec = [
    "Possibilité de combiner plusieurs modes de transport",
    "Autonomie de la batterie",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Coût de location avantageux",
    "Peu de dénivelé",
    "Disponibilité",
    "Casiers de rangement à destination",
    "Présence de douche",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Bon entretien",
    "Bon pour la santé/forme",
    "Qualité de la chaussée",
    "Qualité du matériel",
    "Rechargement à destination",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Plus écologique",
    "Plus économique",
    "Flexibilité",
    "Facile de transporter des charges",
    "Pratique avec les enfants",
    "Aucune satisfaction"
];
const qAvantageVeloLibreElecSelectionnes = ref([])

const questionInconvenientVeloLibreMeca = [
    "Absence de possibilité de transport multimodal",
    "Coût d'entretien et d'équipement",
    "Coût de location",
    "Dénivelé",
    "Disponibilité",
    "Manque de douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Garantie du trajet retour",
    "Manque d'équipement",
    "Manque de casiers de rangement à destination",
    "Manque de stationnement",
    "Mauvais entretien",
    "Météo",
    "Mauvaise qualité de la chaussée",
    "Mauvaise qualité du matériel",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Trop de trafic",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Pollution de l'air/sonore",
    "Difficile de transporter de la charge",
    "Manque de flexibilité",
    "Aucun inconvénient"
];
const qInconvenientVeloLibreMecaSelectionnes = ref([])

const questionAvantageVeloLibreMeca = [
    "Possibilité de combiner plusieurs modes de transport",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Éclairage",
    "Disponibilité",
    "Coût de location avantageux",
    "Peu de dénivelé",
    "Casiers de rangement à destination",
    "Présence de douche",
    "Trajet rapide",
    "Circulation fluide",
    "Plus économique",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Bon entretien",
    "Bon pour la santé/forme",
    "Qualité de la chaussée",
    "Qualité du matériel",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Plus écologique",
    "Flexibilité",
    "Praticité pour transport de charge",
    "Aucune satisfaction"
];
const qAvantageVeloLibreMecaSelectionnes = ref([])


const questionInconVeloPersoMeca = [
    "Absence de possibilité de transport multimodal",
    "Dénivelé",
    "Manque de douche",
    "Durée du trajet",
    "Éclairage",
    "Fatigue",
    "Manque d'équipement",
    "Météo",
    "Manque de stationnement",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Manque de casiers de rangement à destination",
    "Mauvaise qualité de la chaussée",
    "Coût d'entretien et d'équipement",
    "Réparation / entretien compliqué",
    "Manque de pistes cyclables",
    "Pistes cyclables encombrées",
    "Trop de trafic",
    "Difficile de transporter son vélo",
    "Pollution de l'air/sonore",
    "Difficile de transporter de la charge",
    "Manque de flexibilité",
    "Aucun inconvénient"
];
const qInconVeloPersoMecaSelectionnes = ref([])

const questionAvanVeloPersoMeca = [
    "Possibilité de combiner plusieurs modes de transport",
    "Peu de dénivelé",
    "Présence de douche",
    "Casiers de rangement à destination",
    "Trajet rapide",
    "Circulation fluide",
    "Éclairage",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Stationnement sécurisé",
    "Sécurité",
    "Qualité de la chaussée",
    "Entretien et équipement peu coûteux",
    "Équipement mis à disposition",
    "Réparation / entretien facile",
    "Présence de pistes cyclables",
    "Pistes cyclables respectées",
    "Bon pour la santé/forme",
    "Plus écologique",
    "Plus économique",
    "Flexibilité",
    "Praticité pour transport de charge",
    "Aucune satisfaction"
];
const qAvanVeloPersoMecaSelectionnes = ref([])


const questionInconvenientVoitureLibreElec = [
    "Autonomie de la batterie",
    "Coût",
    "Coût de location",
    "Disponibilité",
    "Durée du trajet",
    "Fatigue",
    "Manque de stationnement",
    "Mauvais entretien",
    "Mobilité des premiers / derniers mètres",
    "Mauvaise qualité du matériel",
    "Manque de rechargement batterie à destination",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Embouteillage",
    "Propreté et confort",
    "Je n'aime pas conduire",
    "Stress",
    "Aucun inconvénient"
];
const qInconvenientVoitureLibreElecSelectionnes = ref([])

const questionAvantageVoitureLibreElec = [
    "Autonomie de la batterie",
    "Disponibilité",
    "Coût de location avantageux",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Bon entretien",
    "Facilité d'accès des premiers / derniers mètres",
    "Qualité du matériel",
    "Rechargement à destination",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "J'aime conduire",
    "Conciliation vie pro/vie perso",
    "Capacité de rangement (coffre)",
    "Aucune satisfaction"
];
const qAvantageVoitureLibreElecSelectionnes = ref([])

const questionInconvenientVoitureLibreHybride = [
    "Coût",
    "Coût de location",
    "Disponibilité",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Impact environnemental",
    "Manque de stationnement",
    "Mauvais entretien",
    "Mobilité des premiers / derniers mètres",
    "Mauvaise qualité du matériel",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Propreté et confort",
    "Je n'aime pas conduire",
    "Stress",
    "Aucun inconvénient"
];
const qInconvenientVoitureLibreHybrideSelectionnes = ref([])

const questionAvantageVoitureLibreHybride = [
    "Coût de location avantageux",
    "J'aime conduire",
    "Disponibilité",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Bon entretien",
    "Qualité du matériel",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "Conciliation vie pro/vie perso",
    "Capacité de rangement (coffre)",
    "Aucune satisfaction"
];
const qAvantageVoitureLibreHybrideSelectionnes = ref([])

const questionInconvenientVoitureLibreThermique = [
    "Coût",
    "Coût de location",
    "Disponibilité",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Impact environnemental",
    "Manque de stationnement",
    "Mauvais entretien",
    "Mobilité des premiers / derniers mètres",
    "Mauvaise qualité du matériel",
    "Réservation compliquée",
    "Risque sanitaire",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Propreté et confort",
    "Je n'aime pas conduire",
    "Stress",
    "Aucun inconvénient"
];
const qInconvenientVoitureLibreThermiqueSelectionnes = ref([])

const questionAvantageVoitureLibreThermique = [
    "Coût de location avantageux",
    "Disponibilité",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Bon entretien",
    "Facilité d'accès des premiers / derniers mètres",
    "Qualité du matériel",
    "Réservation facile",
    "Respect des gestes barrières",
    "Stationnement sécurisé",
    "Sécurité",
    "J'aime conduire",
    "Conciliation vie pro/vie perso",
    "Capacité de rangement (coffre)",
    "Aucune satisfaction"
];
const qAvantageVoitureLibreThermiqueSelectionnes = ref([])


const questionInconvenientVoiturePersoElec = [
    "Autonomie de la batterie",
    "Coût",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Manque de stationnement",
    "Manque de rechargement batterie à destination",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Mobilité des premiers / derniers mètres",
    "Je n'aime pas conduire",
    "Stress",
    "Aucun inconvénient"
];
const qInconvenientVoiturePersoElecSelectionnes = ref([])

const questionAvantageVoiturePersoElec = [
    "Autonomie de la batterie",
    "Plus économique",
    "Trajet rapide",
    "Circulation fluide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Facilité d'accès des premiers / derniers mètres",
    "Rechargement à destination",
    "Stationnement sécurisé",
    "Sécurité",
    "J'aime conduire",
    "Confort",
    "Aucune satisfaction"
];
const qAvantageVoiturePersoElecSelectionnes = ref([])

const questionInconvenientVoiturePersoHybride = [
    "Coût",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Impact environnemental",
    "Manque de stationnement",
    "Mobilité des premiers / derniers mètres",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Je n'aime pas conduire",
    "Stress",
    "Aucun inconvénient"
];
const qInconvenientVoiturePersoHybrideSelectionnes = ref([])

const questionAvantageVoiturePersoHybride = [
    "Plus économique",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Facilité d'accès des premiers / derniers mètres",
    "Sécurité",
    "Stationnement sécurisé",
    "J'aime conduire",
    "Confort",
    "Aucune satisfaction"
];
const qAvantageVoiturePersoHybrideSelectionnes = ref([])

const questionInconvenientVoiturePersoThermique = [
    "Coût",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Impact environnemental",
    "Manque de stationnement",
    "Mobilité des premiers / derniers mètres",
    "Manque de stationnement sécurisé",
    "Sentiment d'insécurité",
    "Travaux",
    "Je n'aime pas conduire",
    "Stress",
    "Aucun inconvénient"
];
const qInconvenientVoiturePersoThermiqueSelectionnes = ref([])

const questionAvantageVoiturePersoThermique = [
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Place de stationnement disponible",
    "Facilité d'accès des premiers / derniers mètres",
    "Stationnement sécurisé",
    "Sécurité",
    "J'aime conduire",
    "Aucune satisfaction"
];
const qAvantageVoiturePersoThermiqueSelectionnes = ref([])

const questionInconvenientReduite = [
    "Absence d'abribus",
    "Arrêt trop loin",
    "Coût",
    "Déplacement restreint",
    "Durée du trajet",
    "Embouteillage",
    "Fatigue",
    "Fréquence de passage",
    "Horaires inadaptés",
    "Impact environnemental",
    "Manque d'informations \"usager\"",
    "Manque de flexibilité",
    "Manque de services à bord",
    "Mobilité des premiers / derniers mètres",
    "Ne fonctionne pas le week-end / la nuit",
    "Ne passe / ne s'arrête pas systématiquement",
    "Ponctualité",
    "Propreté et confort",
    "Réservation compliquée",
    "Risque sanitaire",
    "Sentiment d'insécurité",
    "Peu de sièges disponibles",
    "Temps de marche",
    "Trop de monde à bord",
    "Trop de changements",
    "Difficile de transporter des achats",
    "Pas pratique avec les enfants",
    "Fiabilité du service",
    "Faible fréquence en heures creuses",
    "Faible fréquence en période de vacances",
    "Manque de correspondances",
    "Aucun inconvénient"
];
const qInconvenientReduiteSelectionnes = ref([])

const questionAvantageReduite = [
    "Abribus adapté",
    "Arrêt proche",
    "Bon réseau de transports en commun",
    "Plus économique",
    "Circulation fluide",
    "Trajet rapide",
    "Reposant / Relaxant",
    "Horaires adaptés",
    "Information claire et compréhensible",
    "Passage fréquent",
    "Flexibilité",
    "Fiabilité du service",
    "Fonctionne le week-end / la nuit",
    "Bonne fréquence en heures creuses",
    "Bonne fréquence en période de vacances",
    "Services à bord",
    "Sécurité",
    "Sièges disponibles",
    "Facilité d'accès des premiers / derniers mètres",
    "Respect des arrêts",
    "Ponctualité",
    "Propreté et confort",
    "Réservation facile",
    "Temps de marche total acceptable",
    "Peu ou pas de changements",
    "Facile de transporter des charges",
    "Pratique avec les enfants",
    "Aucune satisfaction"
];
const qAvantageReduiteSelectionnes = ref([])

const questionInconvenientPied = [
    "Dénivelé",
    "Manque de douche",
    "Éclairage",
    "Fatigue",
    "Météo",
    "Propreté de la chaussée",
    "Mauvaise qualité de la chaussée",
    "Sentiment d'insécurité",
    "Temps de marche",
    "Travaux",
    "Trop de trafic",
    "Pollution de l'air/sonore",
    "Vêtements peu adaptés",
    "Aucun inconvénient"
];
const qInconvenientPiedSelectionnes = ref([])

const questionAvantagePied = [
    "Peu de dénivelé",
    "Présence de douche",
    "Éclairage",
    "Propreté de la chaussée",
    "Qualité de la chaussée",
    "Sécurité",
    "Peu de temps de marche",
    "Circulation fluide",
    "Bon pour la santé/forme",
    "Plus écologique",
    "Plus économique",
    "Aucune satisfaction"
];
const qAvantagePiedSelectionnes = ref([])

//ICI ---------------------------------------------------------------------------------
const question15 = [
    "Bus",
    "Tramway",
    "Train",
    "Car interurbain",
    "Transport spécialisé personnes à mobilité réduite",
    "Marche à pied",
    "Navette d'entreprise",
    "Bateau navette",
    "Vélo Personnel électrique",
    "Vélo Personnel mécanique",
    "Vélopartage public électrique",
    "Vélopartage public mécanique",
    "Vélo cargo personnel électrique",
    "Vélo cargo personnel mécanique",
    "Trottinette personnelle électrique",
    "Trottinette personnelle mécanique",
    "Trottinette partage public électrique",
    "Trottinette partage public mécanique",
    "Moto/scooter personnel",
    "Moto/scooter en libre service",
    "Voiture personnelle électrique",
    "Voiture personnelle hybride",
    "Voiture personnelle thermique",
    "Voiture en autopartage public électrique",
    "Voiture en autopartage public hybride",
    "Voiture en autopartage public thermique",
    "Covoiturage passager",
    "Covoiturage conducteur électrique",
    "Covoiturage conducteur hybride",
    "Covoiturage conducteur thermique"
]
const q15Selectionnes = ref([])



const listStepTransport = ref([])
function allerEtapeSuivanteDepuis15() {
    stepTransport.value = 0;
    listStepTransport.value = [];
  // Si vélo électrique sélectionné → aller à la 16
  if (q15Selectionnes.value.includes("Vélo Personnel électrique")) {
    listStepTransport.value.push(1);
  }
  // Si vélo électrique pas sélectionné mais bus oui → aller à la 18
  if (q15Selectionnes.value.includes("Bus")) {
    listStepTransport.value.push(2);
  }
  if (q15Selectionnes.value.includes("Bateau navette")) {
    listStepTransport.value.push(3);
  }
  if (q15Selectionnes.value.includes("Car interurbain")) {
    listStepTransport.value.push(4);
  }
  if (q15Selectionnes.value.includes("Covoiturage conducteur électrique")) {
    listStepTransport.value.push(5);
  }
  if (q15Selectionnes.value.includes("Covoiturage conducteur hybride")) {
    listStepTransport.value.push(6);
  }
  if (q15Selectionnes.value.includes("Covoiturage conducteur thermique")) {
    listStepTransport.value.push(7);
  }
  if (q15Selectionnes.value.includes("Covoiturage passager")) {
    listStepTransport.value.push(8);
  }
  if (q15Selectionnes.value.includes("Moto/scooter en libre service")) {
    listStepTransport.value.push(9);
  }
  if (q15Selectionnes.value.includes("Moto/scooter personnel")) {
    listStepTransport.value.push(10);
  }
  if (q15Selectionnes.value.includes("Navette d'entreprise")) {
    listStepTransport.value.push(11);
  }
  if (q15Selectionnes.value.includes("Train")) {
    listStepTransport.value.push(12);
  }
  if (q15Selectionnes.value.includes("Tramway")) {
    listStepTransport.value.push(13);
  }
  if (q15Selectionnes.value.includes("Trottinette partage public électrique")) {
    listStepTransport.value.push(14);
  }
  if (q15Selectionnes.value.includes("Trottinette partage public mécanique")) {
    listStepTransport.value.push(15);
  }
  if (q15Selectionnes.value.includes("Trottinette personnelle électrique")) {
    listStepTransport.value.push(16);
  }
  if (q15Selectionnes.value.includes("Trottinette personnelle mécanique")) {
    listStepTransport.value.push(17);
  }
  if (q15Selectionnes.value.includes("Vélo cargo personnel électrique")) {
    listStepTransport.value.push(18);
  }
  if (q15Selectionnes.value.includes("Vélo cargo personnel mécanique")) {
    listStepTransport.value.push(19);
  }
  if (q15Selectionnes.value.includes("Vélopartage public électrique")) {
    listStepTransport.value.push(20);
  }
  if (q15Selectionnes.value.includes("Vélopartage public mécanique")) {
    listStepTransport.value.push(21);
  }
  if (q15Selectionnes.value.includes("Vélo Personnel mécanique")) {
    listStepTransport.value.push(22);
  }
  if (q15Selectionnes.value.includes("Voiture en autopartage public électrique")) {
    listStepTransport.value.push(23);
  }
  if (q15Selectionnes.value.includes("Voiture en autopartage public hybride")) {
    listStepTransport.value.push(24);
  }
  if (q15Selectionnes.value.includes("Voiture en autopartage public thermique")) {
    listStepTransport.value.push(25);
  }
  if (q15Selectionnes.value.includes("Voiture personnelle électrique")) {
    listStepTransport.value.push(26);
  }
  if (q15Selectionnes.value.includes("Voiture personnelle hybride")) {
    listStepTransport.value.push(27);
  }
  if (q15Selectionnes.value.includes("Voiture personnelle thermique")) {
    listStepTransport.value.push(28);
  }
  if (q15Selectionnes.value.includes("Transport spécialisé personnes à mobilité réduite")) {
    listStepTransport.value.push(29);
  }
  if (q15Selectionnes.value.includes("Marche à pied")) {
    listStepTransport.value.push(30);
  }
  
  listStepTransport.value.push(31)
  step.value = 100;

  console.log(listStepTransport.value)
}

function apresTransport (){
    stepTransport.value = 0;
    listStepTransport.value = [];
    step.value=16
}

const question1 = ref('Quelle est votre addresse de domicile ?');
const reponse1 = ref('');

const question2 = ref("Quelle est l'adresse de votre lieu de travail ?");
const reponse2 = ref('');

const question3 = ref('Concernant votre environnement professionnel, vous travaillez :');
const reponse3 = ref('');

const question4 = ref('Travaillez-vous :');
const reponse4 = ref('');

const question5 = ref('Quels sont les jours où vous vous déplacez vers votre lieu de travail ?');

const question6 = ref('Les jours où vous vous rendez sur votre lieu de travail, quelle est votre heure de prise de poste ?');

const question7 = ref('Les jours où vous vous rendez sur votre lieu de travail, à quelle heure quittez-vous votre poste ?');

const question8 = ref('Les jours où vous vous rendez sur votre lieu de travail, à quelle heure arrivez-vous chez vous ?');

const question9 = ref('Les jours où vous vous rendez sur votre lieu de travail, réalisez-vous une ou plusieurs étapes le matin ?');

const question10 = ref('Les jours où vous vous rendez sur votre lieu de travail, réalisez-vous une ou plusieurs étapes le soir ?');

const horaireType = ref('')
const heureDebut = ref('')
const heureFin = ref('')

const horaireType1 = ref('')
const heureDebut1 = ref('')
const heureFin1 = ref('')

const horaireType2 = ref('')
const heureDebut2 = ref('')
const heureFin2 = ref('')

const question11ecrit = ref("Est-ce que vous vous déplacez à l'extérieur pour votre pause déjeuné");
const reponse11 = ref('');

const question12ecrit = ref("Quel(s) inconvenient(s) rencontrez-vous pour vous restaurer en dehors de l'entreprise ?")

const question13ecrit = ref("Sélections des modes de transport");

const question14ecrit = ref('Quel(s) inconvenient(s) rencontrez-vous avec ce mode "Vélo personnel électrique" pour votre déplacements "Domicile-Travail" ?');
const question15ecrit = ref('Quel(s) satisfaction(s) rencontrez-vous avec ce mode "Vélo personnel électrique" pour votre déplacements "Domicile-Travail" ?');

const question16ecrit = ref('Inconvénients du mode "Bus" pour votre déplacements "Domicile-Travail" ?');
const question17ecrit = ref('Satisfaction(s) du mode "Bus" pour votre déplacements "Domicile-Travail" ?');

const question18ecrit = ref('Inconvénients du mode "Bateau navette" pour votre déplacements "Domicile-Travail" ?');
const question19ecrit = ref('Satisfaction(s) du mode "Bateau navette" pour votre déplacements "Domicile-Travail" ?');

const question20ecrit = ref('Inconvénients du mode "Car interurbain" pour votre déplacements "Domicile-Travail" ?');
const question21ecrit = ref('Satisfaction(s) du mode "Car interurbain" pour votre déplacements "Domicile-Travail" ?');

const question22ecrit = ref('Inconvénients du mode "Covoiturage conducteur électrique" pour votre déplacements "Domicile-Travail" ?');
const question23ecrit = ref('Satisfaction(s) du mode "Covoiturage conducteur électrique" pour votre déplacements "Domicile-Travail" ?');

const question24ecrit = ref('Inconvénients du mode "Covoiturage conducteur hybride" pour votre déplacements "Domicile-Travail" ?');
const question25ecrit = ref('Satisfaction(s) du mode "Covoiturage conducteur hybride" pour votre déplacements "Domicile-Travail" ?');

const question26ecrit = ref('Inconvénients du mode "Covoiturage conducteur thermique" pour votre déplacements "Domicile-Travail" ?');
const question27ecrit = ref('Satisfaction(s) du mode "Covoiturage conducteur thermique" pour votre déplacements "Domicile-Travail" ?');

const question28ecrit = ref('Inconvénients du mode "Covoiturage passager" pour votre déplacements "Domicile-Travail" ?');
const question29ecrit = ref('Satisfaction(s) du mode "Covoiturage passager" pour votre déplacements "Domicile-Travail" ?');

const question30ecrit = ref('Inconvénients du mode "Moto/Scooter en libre service" pour votre déplacements "Domicile-Travail" ?');
const question31ecrit = ref('Satisfaction(s) du mode "Moto/Scooter en libre service" pour votre déplacements "Domicile-Travail" ?');

const question32ecrit = ref('Inconvénients du mode "Moto/Scooter personelle" pour votre déplacements "Domicile-Travail" ?');
const question33ecrit = ref('Satisfaction(s) du mode "Moto/Scooter personelle" pour votre déplacements "Domicile-Travail" ?');

const question34ecrit = ref('Inconvénients du mode "Navette d\'entreprise" pour votre déplacements "Domicile-Travail" ?');
const question35ecrit = ref('Satisfaction(s) du mode "Navette d\'entreprise" pour votre déplacements "Domicile-Travail" ?');

const question36ecrit = ref('Inconvénients du mode "Train" pour votre déplacements "Domicile-Travail" ?');
const question37ecrit = ref('Satisfaction(s) du mode "Train" pour votre déplacements "Domicile-Travail" ?');

const question38ecrit = ref('Inconvénients du mode "Tramway" pour votre déplacements "Domicile-Travail" ?');
const question39ecrit = ref('Satisfaction(s) du mode "Tramway" pour votre déplacements "Domicile-Travail" ?');

const question40ecrit = ref('Inconvénients du mode "Trottinette en libre service électrique" pour votre déplacements "Domicile-Travail" ?');
const question41ecrit = ref('Satisfaction(s) du mode "Trottinette en libre service électrique" pour votre déplacements "Domicile-Travail" ?');

const question42ecrit = ref('Inconvénients du mode "Trottinette en libre service mécanique" pour votre déplacements "Domicile-Travail" ?');
const question43ecrit = ref('Satisfaction(s) du mode "Trottinette en libre service mécanique" pour votre déplacements "Domicile-Travail" ?');

const question44ecrit = ref('Inconvénients du mode "Trottinette personnelle électrique" pour votre déplacements "Domicile-Travail" ?');
const question45ecrit = ref('Satisfaction(s) du mode "Trottinette personnelle électrique" pour votre déplacements "Domicile-Travail" ?');

const question46ecrit = ref('Inconvénients du mode "Trottinette personnelle mécanique" pour votre déplacements "Domicile-Travail" ?');
const question47ecrit = ref('Satisfaction(s) du mode "Trottinette personnelle mécanique" pour votre déplacements "Domicile-Travail" ?');

const question48ecrit = ref('Inconvénients du mode "Vélo cargo personnel électrique" pour votre déplacements "Domicile-Travail" ?');
const question49ecrit = ref('Satisfaction(s) du mode "Vélo cargo personnel électrique" pour votre déplacements "Domicile-Travail" ?');

const question50ecrit = ref('Inconvénients du mode "Vélo cargo personnel mécanique" pour votre déplacements "Domicile-Travail" ?');
const question51ecrit = ref('Satisfaction(s) du mode "Vélo cargo personnel mécanique" pour votre déplacements "Domicile-Travail" ?');

const question52ecrit = ref('Inconvénients du mode "Vélo en libre service électrique" pour votre déplacements "Domicile-Travail" ?');
const question53ecrit = ref('Satisfaction(s) du mode "Vélo en libre service électrique" pour votre déplacements "Domicile-Travail" ?');

const question54ecrit = ref('Inconvénients du mode "Vélo en libre service mécanique" pour votre déplacements "Domicile-Travail" ?');
const question55ecrit = ref('Satisfaction(s) du mode "Vélo en libre service mécanique" pour votre déplacements "Domicile-Travail" ?');

const question56ecrit = ref('Quel(s) inconvénient(s) rencontrez-vous avec ce mode "Vélo personnel mécanique" pour votre déplacements "Domicile-Travail" ?');
const question57ecrit = ref('Quel(s) satisfaction(s) rencontrez-vous avec ce mode "Vélo personnel mécanique" pour votre déplacements "Domicile-Travail" ?');

const question58ecrit = ref('Inconvénients du mode "Voiture en libre service électrique" pour votre déplacements "Domicile-Travail" ?');
const question59ecrit = ref('Satisfaction(s) du mode "Voiture en libre service électrique" pour votre déplacements "Domicile-Travail" ?');

const question60ecrit = ref('Inconvénients du mode "Voiture en libre service hybride" pour votre déplacements "Domicile-Travail" ?');
const question61ecrit = ref('Satisfaction(s) du mode "Voiture en libre service hybride" pour votre déplacements "Domicile-Travail" ?');

const question62ecrit = ref('Inconvénients du mode "Voiture en libre service Thermique" pour votre déplacements "Domicile-Travail" ?');
const question63ecrit = ref('Satisfaction(s) du mode "Voiture en libre service Thermique" pour votre déplacements "Domicile-Travail" ?');

const question64ecrit = ref('Inconvénients du mode "Voiture personnelle électrique" pour votre déplacements "Domicile-Travail" ?');
const question65ecrit = ref('Satisfaction(s) du mode "Voiture personnelle électrique" pour votre déplacements "Domicile-Travail" ?');

const question66ecrit = ref('Inconvénients du mode "Voiture personnelle hybride" pour votre déplacements "Domicile-Travail" ?');
const question67ecrit = ref('Satisfaction(s) du mode "Voiture personnelle hybride" pour votre déplacements "Domicile-Travail" ?');

const question68ecrit = ref('Inconvénients du mode "Voiture personnelle Thermique" pour votre déplacements "Domicile-Travail" ?');
const question69ecrit = ref('Satisfaction(s) du mode "Voiture personnelle Thermique" pour votre déplacements "Domicile-Travail" ?');

const question70ecrit = ref('Inconvénients du mode "Transport spécialisé personnes à mobilité réduite" pour votre déplacements "Domicile-Travail" ?');
const question71ecrit = ref('Satisfaction(s) du mode "Transport spécialisé personnes à mobilité réduite" pour votre déplacements "Domicile-Travail" ?');

const question72ecrit = ref('Inconvénients du mode "À pied" pour votre déplacements "Domicile-Travail" ?');
const question73ecrit = ref('Satisfaction(s) du mode "À pied" pour votre déplacements "Domicile-Travail" ?');

const question74ecrit = ref('Êtes-vous en travail à la maison ou en coworking ?');

const question75ecrit = ref('Combien de jours par semaine travaillez-vous à distance');
const reponse75 = ref('');

const question76ecrit = ref('Quel(s) inconvenient(s) rencontrez-vous avec le travail à distance ?');

const question77ecrit = ref('Quel(s) avantage(s) rencontrez-vous avec le travail à distance ?');

const question78ecrit = ref('Souhaitez-vous faire évoluer vos comportements de mobilité ?');
const reponse78 = ref('');

const question79ecrit = ref('Parmi les propositions suivantes, lesquelles vous paraîtraient les plus acceptables ?');

const question80ecrit = ref('Accepteriez-vous de moduler vos horaires de travail pour faciliter la décongestion du trafic routier ou du transport en commun ?');
const reponse80 = ref('');

const question81ecrit = ref('Pour vous, le covoiturage, c\'est :');
const reponse81 = ref('');

const question82ecrit = ref('Pour vous, le vélo, c\'est :');
const reponse82 = ref('');

const question83ecrit = ref('Pour vous, le transport en commun, c\'est :');
const reponse83 = ref('');

const question84ecrit = ref('Pour vous, la voiture, c\'est :');
const reponse84 = ref('');

const question85ecrit = ref("D'après vous, une journée de travail à distance c'est :");
const reponse85 = ref('');

const question86ecrit = ref("Avez-vous des enfants à charge ?");
const reponse86 = ref('');

const question87ecrit = ref("Avez-vous des problèmes d'accessibilité à la mobilité (raisons médicales, handicaps, conditions de ressources, etc.) ?");
//const reponse87 = ref(''); -> const accessibilite

const question88ecrit = ref("Comment graduez-vous ce problème ?");
const reponse88 = ref('');

const question89ecrit = ref("Êtes-vous ?");
const reponse89 = ref('');

const question90ecrit = ref("Dans quelle tranche d'âge vous situez-vous ?");
const reponse90 = ref('');

const accessibilite = ref('')

const erreur = ref('');

const isSubmitting = ref(false)

const ajouterQuestion = async (question, reponse) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/reponse', {
      que_question: question,
      dia_no: localStorage.getItem('diagId'),
      lst_rep: reponse
    })

    if (response.status === 200) {
      console.log('réussie')
    } 
  } catch (error) {
    console.log(error)
  }
}

const ajouteParticipant = async () => {
  try {
    const response = await axios.put('http://127.0.0.1:8000/api/diagnostic/ajouter', {
      dia_no: localStorage.getItem('diagId'),
    })

    if (response.status === 200) {
      //console.log('réussie')
    } 
  } catch (error) {
    console.log(error)
  }
}

const chargeTout = async () => {
    if (isSubmitting.value) return 
    isSubmitting.value = true
    erreur.value = '';
    
    try {
        if (reponse1.value.length > 0) {
            await ajouterQuestion(question1.value, reponse1.value); 
        }
        if (reponse2.value.length > 0) {
            await ajouterQuestion(question2.value, reponse2.value); 
        }
        if (reponse3.value.length > 0) {
            await ajouterQuestion(question3.value, reponse3.value); 
        }
        if (reponse4.value.length > 0) {
            await ajouterQuestion(question4.value, reponse4.value); 
        }
        if (Array.isArray(joursSelectionnes.value) && joursSelectionnes.value.length > 0) {
            for (const jour of joursSelectionnes.value) {
                await ajouterQuestion(question5.value, jour);
            }
        }
        if (horaireType.value.length > 0) {
            if(heureDebut.value.length > 0 && heureFin.value.length>0){
                const rep = ref(horaireType.value+' : '+heureDebut.value+' à '+heureFin.value);
                await ajouterQuestion(question6.value, rep.value); 
            } else if(heureDebut.value.length > 0){
                const rep = ref(horaireType.value+' : '+heureDebut.value);
                await ajouterQuestion(question6.value, rep.value); 
            } else {
                await ajouterQuestion(question6.value, horaireType.value);
            }
        }
        if (horaireType1.value.length > 0) {
            if(heureDebut1.value.length > 0 && heureFin1.value.length>0){
                const rep = ref(horaireType1.value+' : '+heureDebut1.value+' à '+heureFin1.value);
                await ajouterQuestion(question7.value, rep.value); 
            } else if(heureDebut1.value.length > 0){
                const rep = ref(horaireType1.value+' : '+heureDebut1.value);
                await ajouterQuestion(question7.value, rep.value); 
            } else {
                await ajouterQuestion(question7.value, horaireType1.value);
            }
        }
        if (horaireType2.value.length > 0) {
            if(heureDebut2.value.length > 0 && heureFin2.value.length>0){
                const rep = ref(horaireType2.value+' : '+heureDebut2.value+' à '+heureFin2.value);
                await ajouterQuestion(question8.value, rep.value); 
            } else if(heureDebut2.value.length > 0){
                const rep = ref(horaireType2.value+' : '+heureDebut2.value);
                await ajouterQuestion(question8.value, rep.value); 
            } else {
                await ajouterQuestion(question8.value, horaireType2.value);
            }
        }
        if (Array.isArray(q11Selectionnes.value) && q11Selectionnes.value.length > 0) {
            for (const q of q11Selectionnes.value) {
                await ajouterQuestion(question9.value, q);
            }
        }
        if (Array.isArray(q12Selectionnes.value) && q12Selectionnes.value.length > 0) {
            for (const q of q12Selectionnes.value) {
                await ajouterQuestion(question10.value, q);
            }
        }
        if (reponse11.value.length > 0) {
            await ajouterQuestion(question11ecrit.value, reponse11.value); 
        }
        if (Array.isArray(q14Selectionnes.value) && q14Selectionnes.value.length > 0) {
            for (const q of q14Selectionnes.value) {
                await ajouterQuestion(question12ecrit.value, q);
            }
        }
        if (Array.isArray(q15Selectionnes.value) && q15Selectionnes.value.length > 0) {
            for (const q of q15Selectionnes.value) {
                await ajouterQuestion(question13ecrit.value, q);
            }
        }
        if (Array.isArray(qInconVeloPersoElectriqueSelectionnes.value) && qInconVeloPersoElectriqueSelectionnes.value.length > 0) {
            for (const q of qInconVeloPersoElectriqueSelectionnes.value) {
                await ajouterQuestion(question14ecrit.value, q);
            }
        }
        if (Array.isArray(qAvanVeloPersoElectriqueSelectionnes.value) && qAvanVeloPersoElectriqueSelectionnes.value.length > 0) {
            for (const q of qAvanVeloPersoElectriqueSelectionnes.value) {
                await ajouterQuestion(question15ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientBusSelectionnes.value) && qInconvenientBusSelectionnes.value.length > 0) {
            for (const q of qInconvenientBusSelectionnes.value) {
                await ajouterQuestion(question16ecrit.value, q);
            }
        }
        if (Array.isArray(qAvanBusSelectionnes.value) && qAvanBusSelectionnes.value.length > 0) {
            for (const q of qAvanBusSelectionnes.value) {
                await ajouterQuestion(question17ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientBateauNavetteSelectionnes.value) && qInconvenientBateauNavetteSelectionnes.value.length > 0) {
            for (const q of qInconvenientBateauNavetteSelectionnes.value) {
                await ajouterQuestion(question18ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageBateauNavetteSelectionnes.value) && qAvantageBateauNavetteSelectionnes.value.length > 0) {
            for (const q of qAvantageBateauNavetteSelectionnes.value) {
                await ajouterQuestion(question19ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientCarInterurbainSelectionnes.value) && qInconvenientCarInterurbainSelectionnes.value.length > 0) {
            for (const q of qInconvenientCarInterurbainSelectionnes.value) {
                await ajouterQuestion(question20ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageCarInterurbainSelectionnes.value) && qAvantageCarInterurbainSelectionnes.value.length > 0) {
            for (const q of qAvantageCarInterurbainSelectionnes.value) {
                await ajouterQuestion(question21ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientCovoiConducteurElecSelectionnes.value) && qInconvenientCovoiConducteurElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientCovoiConducteurElecSelectionnes.value) {
                await ajouterQuestion(question22ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageCovoiConducteurElecSelectionnes.value) && qAvantageCovoiConducteurElecSelectionnes.value.length > 0) {
            for (const q of qAvantageCovoiConducteurElecSelectionnes.value) {
                await ajouterQuestion(question23ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientCovoiConducteurHybrideSelectionnes.value) && qInconvenientCovoiConducteurHybrideSelectionnes.value.length > 0) {
            for (const q of qInconvenientCovoiConducteurHybrideSelectionnes.value) {
                await ajouterQuestion(question24ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageCovoiConducteurHybrideSelectionnes.value) && qAvantageCovoiConducteurHybrideSelectionnes.value.length > 0) {
            for (const q of qAvantageCovoiConducteurHybrideSelectionnes.value) {
                await ajouterQuestion(question25ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientCovoiConducteurThermiqueSelectionnes.value) && qInconvenientCovoiConducteurThermiqueSelectionnes.value.length > 0) {
            for (const q of qInconvenientCovoiConducteurThermiqueSelectionnes.value) {
                await ajouterQuestion(question26ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageCovoiConducteurThermiqueSelectionnes.value) && qAvantageCovoiConducteurThermiqueSelectionnes.value.length > 0) {
            for (const q of qAvantageCovoiConducteurThermiqueSelectionnes.value) {
                await ajouterQuestion(question27ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientCovoiPassagerSelectionnes.value) && qInconvenientCovoiPassagerSelectionnes.value.length > 0) {
            for (const q of qInconvenientCovoiPassagerSelectionnes.value) {
                await ajouterQuestion(question28ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageCovoiPassagerSelectionnes.value) && qAvantageCovoiPassagerSelectionnes.value.length > 0) {
            for (const q of qAvantageCovoiPassagerSelectionnes.value) {
                await ajouterQuestion(question29ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientMotoLibreSelectionnes.value) && qInconvenientMotoLibreSelectionnes.value.length > 0) {
            for (const q of qInconvenientMotoLibreSelectionnes.value) {
                await ajouterQuestion(question30ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageMotoLibreSelectionnes.value) && qAvantageMotoLibreSelectionnes.value.length > 0) {
            for (const q of qAvantageMotoLibreSelectionnes.value) {
                await ajouterQuestion(question31ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientMotoPersoSelectionnes.value) && qInconvenientMotoPersoSelectionnes.value.length > 0) {
            for (const q of qInconvenientMotoPersoSelectionnes.value) {
                await ajouterQuestion(question32ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageMotoPersoSelectionnes.value) && qAvantageMotoPersoSelectionnes.value.length > 0) {
            for (const q of qAvantageMotoPersoSelectionnes.value) {
                await ajouterQuestion(question33ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientNavetteEntrepriseSelectionnes.value) && qInconvenientNavetteEntrepriseSelectionnes.value.length > 0) {
            for (const q of qInconvenientNavetteEntrepriseSelectionnes.value) {
                await ajouterQuestion(question34ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageNavetteEntrepriseSelectionnes.value) && qAvantageNavetteEntrepriseSelectionnes.value.length > 0) {
            for (const q of qAvantageNavetteEntrepriseSelectionnes.value) {
                await ajouterQuestion(question35ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientTrainSelectionnes.value) && qInconvenientTrainSelectionnes.value.length > 0) {
            for (const q of qInconvenientTrainSelectionnes.value) {
                await ajouterQuestion(question36ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageTrainSelectionnes.value) && qAvantageTrainSelectionnes.value.length > 0) {
            for (const q of qAvantageTrainSelectionnes.value) {
                await ajouterQuestion(question37ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientTramwaySelectionnes.value) && qInconvenientTramwaySelectionnes.value.length > 0) {
            for (const q of qInconvenientTramwaySelectionnes.value) {
                await ajouterQuestion(question38ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageTramwaySelectionnes.value) && qAvantageTramwaySelectionnes.value.length > 0) {
            for (const q of qAvantageTramwaySelectionnes.value) {
                await ajouterQuestion(question39ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientTrottinetteLibreElecSelectionnes.value) && qInconvenientTrottinetteLibreElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientTrottinetteLibreElecSelectionnes.value) {
                await ajouterQuestion(question40ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageTrottinetteLibreElecSelectionnes.value) && qAvantageTrottinetteLibreElecSelectionnes.value.length > 0) {
            for (const q of qAvantageTrottinetteLibreElecSelectionnes.value) {
                await ajouterQuestion(question41ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientTrottinetteLibreMecaSelectionnes.value) && qInconvenientTrottinetteLibreMecaSelectionnes.value.length > 0) {
            for (const q of qInconvenientTrottinetteLibreMecaSelectionnes.value) {
                await ajouterQuestion(question42ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageTrottinetteLibreMecaSelectionnes.value) && qAvantageTrottinetteLibreMecaSelectionnes.value.length > 0) {
            for (const q of qAvantageTrottinetteLibreMecaSelectionnes.value) {
                await ajouterQuestion(question43ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientTrottinettePersoElecSelectionnes.value) && qInconvenientTrottinettePersoElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientTrottinettePersoElecSelectionnes.value) {
                await ajouterQuestion(question44ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageTrottinettePersoElecSelectionnes.value) && qAvantageTrottinettePersoElecSelectionnes.value.length > 0) {
            for (const q of qAvantageTrottinettePersoElecSelectionnes.value) {
                await ajouterQuestion(question45ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientTrottinettePersoMecaSelectionnes.value) && qInconvenientTrottinettePersoMecaSelectionnes.value.length > 0) {
            for (const q of qInconvenientTrottinettePersoMecaSelectionnes.value) {
                await ajouterQuestion(question46ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageTrottinettePersoMecaSelectionnes.value) && qAvantageTrottinettePersoMecaSelectionnes.value.length > 0) {
            for (const q of qAvantageTrottinettePersoMecaSelectionnes.value) {
                await ajouterQuestion(question47ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVeloCargoPersoElecSelectionnes.value) && qInconvenientVeloCargoPersoElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientVeloCargoPersoElecSelectionnes.value) {
                await ajouterQuestion(question48ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVeloCargoPersoElecSelectionnes.value) && qAvantageVeloCargoPersoElecSelectionnes.value.length > 0) {
            for (const q of qAvantageVeloCargoPersoElecSelectionnes.value) {
                await ajouterQuestion(question49ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVeloCargoPersoMecaSelectionnes.value) && qInconvenientVeloCargoPersoMecaSelectionnes.value.length > 0) {
            for (const q of qInconvenientVeloCargoPersoMecaSelectionnes.value) {
                await ajouterQuestion(question50ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVeloCargoPersoMecaSelectionnes.value) && qAvantageVeloCargoPersoMecaSelectionnes.value.length > 0) {
            for (const q of qAvantageVeloCargoPersoMecaSelectionnes.value) {
                await ajouterQuestion(question51ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVeloLibreElecSelectionnes.value) && qInconvenientVeloLibreElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientVeloLibreElecSelectionnes.value) {
                await ajouterQuestion(question52ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVeloLibreMecaSelectionnes.value) && qAvantageVeloLibreMecaSelectionnes.value.length > 0) {
            for (const q of qAvantageVeloLibreMecaSelectionnes.value) {
                await ajouterQuestion(question53ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVeloLibreMecaSelectionnes.value) && qInconvenientVeloLibreMecaSelectionnes.value.length > 0) {
            for (const q of qInconvenientVeloLibreMecaSelectionnes.value) {
                await ajouterQuestion(question54ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVeloLibreMecaSelectionnes.value) && qAvantageVeloLibreMecaSelectionnes.value.length > 0) {
            for (const q of qAvantageVeloLibreMecaSelectionnes.value) {
                await ajouterQuestion(question55ecrit.value, q);
            }
        }
        if (Array.isArray(qInconVeloPersoMecaSelectionnes.value) && qInconVeloPersoMecaSelectionnes.value.length > 0) {
            for (const q of qInconVeloPersoMecaSelectionnes.value) {
                await ajouterQuestion(question56ecrit.value, q);
            }
        }
        if (Array.isArray(qAvanVeloPersoMecaSelectionnes.value) && qAvanVeloPersoMecaSelectionnes.value.length > 0) {
            for (const q of qAvanVeloPersoMecaSelectionnes.value) {
                await ajouterQuestion(question57ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVoitureLibreElecSelectionnes.value) && qInconvenientVoitureLibreElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientVoitureLibreElecSelectionnes.value) {
                await ajouterQuestion(question58ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVoitureLibreElecSelectionnes.value) && qAvantageVoitureLibreElecSelectionnes.value.length > 0) {
            for (const q of qAvantageVoitureLibreElecSelectionnes.value) {
                await ajouterQuestion(question59ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVoitureLibreHybrideSelectionnes.value) && qInconvenientVoitureLibreHybrideSelectionnes.value.length > 0) {
            for (const q of qInconvenientVoitureLibreHybrideSelectionnes.value) {
                await ajouterQuestion(question60ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVoitureLibreHybrideSelectionnes.value) && qAvantageVoitureLibreHybrideSelectionnes.value.length > 0) {
            for (const q of qAvantageVoitureLibreHybrideSelectionnes.value) {
                await ajouterQuestion(question61ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVoitureLibreThermiqueSelectionnes.value) && qInconvenientVoitureLibreThermiqueSelectionnes.value.length > 0) {
            for (const q of qInconvenientVoitureLibreThermiqueSelectionnes.value) {
                await ajouterQuestion(question62ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVoitureLibreThermiqueSelectionnes.value) && qAvantageVoitureLibreThermiqueSelectionnes.value.length > 0) {
            for (const q of qAvantageVoitureLibreThermiqueSelectionnes.value) {
                await ajouterQuestion(question63ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVoiturePersoElecSelectionnes.value) && qInconvenientVoiturePersoElecSelectionnes.value.length > 0) {
            for (const q of qInconvenientVoiturePersoElecSelectionnes.value) {
                await ajouterQuestion(question64ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVoiturePersoElecSelectionnes.value) && qAvantageVoiturePersoElecSelectionnes.value.length > 0) {
            for (const q of qAvantageVoiturePersoElecSelectionnes.value) {
                await ajouterQuestion(question65ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVoiturePersoHybrideSelectionnes.value) && qInconvenientVoiturePersoHybrideSelectionnes.value.length > 0) {
            for (const q of qInconvenientVoiturePersoHybrideSelectionnes.value) {
                await ajouterQuestion(question66ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVoiturePersoHybrideSelectionnes.value) && qAvantageVoiturePersoHybrideSelectionnes.value.length > 0) {
            for (const q of qAvantageVoiturePersoHybrideSelectionnes.value) {
                await ajouterQuestion(question67ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientVoiturePersoThermiqueSelectionnes.value) && qInconvenientVoiturePersoThermiqueSelectionnes.value.length > 0) {
            for (const q of qInconvenientVoiturePersoThermiqueSelectionnes.value) {
                await ajouterQuestion(question68ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageVoiturePersoThermiqueSelectionnes.value) && qAvantageVoiturePersoThermiqueSelectionnes.value.length > 0) {
            for (const q of qAvantageVoiturePersoThermiqueSelectionnes.value) {
                await ajouterQuestion(question69ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientReduiteSelectionnes.value) && qInconvenientReduiteSelectionnes.value.length > 0) {
            for (const q of qInconvenientReduiteSelectionnes.value) {
                await ajouterQuestion(question70ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantageReduiteSelectionnes.value) && qAvantageReduiteSelectionnes.value.length > 0) {
            for (const q of qAvantageReduiteSelectionnes.value) {
                await ajouterQuestion(question71ecrit.value, q);
            }
        }
        if (Array.isArray(qInconvenientPiedSelectionnes.value) && qInconvenientPiedSelectionnes.value.length > 0) {
            for (const q of qInconvenientPiedSelectionnes.value) {
                await ajouterQuestion(question72ecrit.value, q);
            }
        }
        if (Array.isArray(qAvantagePiedSelectionnes.value) && qAvantagePiedSelectionnes.value.length > 0) {
            for (const q of qAvantagePiedSelectionnes.value) {
                await ajouterQuestion(question73ecrit.value, q);
            }
        }
        if (Array.isArray(q23Selectionnes.value) && q23Selectionnes.value.length > 0) {
            for (const q of q23Selectionnes.value) {
                await ajouterQuestion(question74ecrit.value, q);
            }
        }
        if (reponse75.value.length > 0) {
            await ajouterQuestion(question75ecrit.value, reponse75.value); 
        }
        if (Array.isArray(q25Selectionnes.value) && q25Selectionnes.value.length > 0) {
            for (const q of q25Selectionnes.value) {
                await ajouterQuestion(question76ecrit.value, q);
            }
        }
        if (Array.isArray(q26Selectionnes.value) && q26Selectionnes.value.length > 0) {
            for (const q of q26Selectionnes.value) {
                await ajouterQuestion(question77ecrit.value, q);
            }
        }
        if (reponse78.value.length > 0) {
            await ajouterQuestion(question78ecrit.value, reponse78.value); 
        }
        if (Array.isArray(q30Selectionnes.value) && q30Selectionnes.value.length > 0) {
            for (const q of q30Selectionnes.value) {
                await ajouterQuestion(question79ecrit.value, q);
            }
        }
        if (reponse80.value.length > 0) {
            await ajouterQuestion(question80ecrit.value, reponse80.value); 
        }
        if (reponse81.value.length > 0) {
            await ajouterQuestion(question81ecrit.value, reponse81.value); 
        }
        if (reponse82.value.length > 0) {
            await ajouterQuestion(question82ecrit.value, reponse82.value); 
        }
        if (reponse83.value.length > 0) {
            await ajouterQuestion(question83ecrit.value, reponse83.value); 
        }
        if (reponse84.value.length > 0) {
            await ajouterQuestion(question84ecrit.value, reponse84.value); 
        }
        if (reponse85.value.length > 0) {
            await ajouterQuestion(question85ecrit.value, reponse85.value); 
        }
        if (reponse86.value.length > 0) {
            await ajouterQuestion(question86ecrit.value, reponse86.value); 
        }
        if (accessibilite.value.length > 0) {
            await ajouterQuestion(question87ecrit.value, accessibilite.value); 
        }
        if (reponse88.value.length > 0) {
            await ajouterQuestion(question88ecrit.value, reponse88.value); 
        }
        if (reponse89.value.length > 0) {
            await ajouterQuestion(question89ecrit.value, reponse89.value); 
        }
        if (reponse90.value.length > 0) {
            await ajouterQuestion(question90ecrit.value, reponse90.value); 
        }
        await ajouteParticipant();

        window.location.href = '/';
    } catch (e) {
        console.error(e)
        erreur.value = "Une erreur est survenue pendant l'envoi."
    } finally {
        isSubmitting.value = false
    }
}

//console.log(localStorage.getItem('diagId'));

</script>

<style scoped>

.central-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #ED7405;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
}

.questionnaire-container {
  max-width: 1800px;
  margin: 50px auto 0;
  padding: 60px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

p {
  font-size: 22px;
  line-height: 1.6;
  color: #000000;
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #d36200;
}

.btn-container {
  margin-top: 30px;
}

.accord-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 15px;
  background-color: #fff8f0;
  border: 2px solid #ED7405;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.accord-container input[type="checkbox"] {
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-top: 4px;
}

.accord-container label {
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  cursor: pointer;
}

input[type="text"] {
  padding: 10px;
  font-size: 22px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 2px solid #000000;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
}


.radio-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.radio-container input[type="radio"] {
  display: none;
}

.radio-container label {
  display: block;
  padding: 12px 18px;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  background-color: #fff;
  transition: all 0.2s ease;
}

.radio-container label:hover {
  border-color: #ED7405;
  background-color: #fff4ec;
}

.radio-container input[type="radio"]:checked + label {
  border-color: #ED7405;
  background-color: #ED7405;
  color: white;
  font-weight: bold;
}

.selection {
  margin-top: 20px;
  font-size: 18px;
}



.jours-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.jours-container input[type="checkbox"] {
  display: none;
}

.jours-container label {
  padding: 8px 16px;
  border: 2px solid #e27b64;
  border-radius: 50px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #e27b64;
  background-color: white;
}

.jours-container label:hover {
  border-color: #ED7405;
  color: #ED7405;
}

.jours-container input[type="checkbox"]:checked + label {
  background-color: #ED7405;
  color: white;
  border-color: #ED7405;
  font-weight: bold;
}





.horaire-container {
  display: flex;
  gap: 80px;
  flex-wrap: wrap;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.horaire-container input[type="radio"] {
  display: none;
}

.horaire-container label {
  padding: 8px 16px;
  border: 2px solid #e27b64;
  border-radius: 50px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #e27b64;
  background-color: white;
}

.horaire-container label:hover {
  border-color: #ED7405;
  color: #ED7405;
}

.horaire-container input[type="radio"]:checked + label {
  background-color: #ED7405;
  color: white;
  border-color: #ED7405;
  font-weight: bold;
}


.horaire-inputs {
  display: flex;
  gap: 15px;
  align-items: center;
  background: #fff8f0;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ED7405;
}

.horaire-inputs label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.horaire-inputs input[type="time"] {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-top: 4px;
  width: 100%;
}

button:disabled { opacity: .6; cursor: not-allowed; }

.spinner {
  display:inline-block; width:18px; height:18px;
  border:2px solid rgba(255,255,255,.4);
  border-top-color:#fff; border-radius:50%;
  animation:spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }


</style>
