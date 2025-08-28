<template>
  <div class="center-container">
    <img src="../assets/image_acceuil_1.png" alt="" class="img-entete" />

    <div class="intro-text">
      <p>
        Tpg evomoov est une solution d’accompagnement des entreprises, institutions et collectivités dans l’amélioration de leur mobilité. Notre mission est de vous aider à modifier les comportements de mobilité de vos équipes en vous proposant les solutions les plus impactantes en fonction de vos problématiques.
      </p>
      <p>
        Découvrez comment tpg evomoov encourage l’utilisation des transports publics, des vélos et du covoiturage auprès de vos équipes !
      </p>
    </div>

    <div class="info">
      <div class="text">
        <p class="titre">Encourager le changement des habitudes de déplacement</p>
        <p>
          tpg evomoov est un ensemble de solutions de mobilité basé sur les comportements humains et les usages en matière de déplacements
          <strong>pendulaires et professionnels</strong>.
        </p>
        <p>
          Cette solution innovante qui s’appuie sur des plateformes digitales permet de concevoir et de mettre en œuvre des plans de mobilité personnalisés centrés sur la
          <strong>diversité des modes de transports durables</strong> et l’incitation au changement des habitudes de déplacement.
        </p>
      </div>

      <div class="video">
        <iframe
          src="https://www.youtube.com/embed/ZeqhTibE4YA"
          title="Vidéo YouTube TPG"
          allowfullscreen
          frameborder="0">
        </iframe>
      </div>
    </div>
    <div class="info">
        <div class="text">
            <p class="titre">Module Stratégie de mobilité</p>
            <p>En partant de la réalisation de diagnostics de mobilité, le module Stratégie de mobilité permet de collecter les besoins de mobilité de votre personnel et d’étudier des potentiels de report des transports individuels motorisés vers des modes plus durables, avant de proposer un panel de solutions de mobilité.</p>
            <p>La démarche se veut collaborative et évolutive, et s’appuie sur 3 axes-clés :</p>
            <ul>
                <li>Comprendre les comportements de mobilité</li>
                <li>Définir la stratégie de mobilité</li>
                <li>Mettre en œuvre les solutions personnalisées</li>
            </ul>
        </div>
        <div class="image">
            <img src="../assets/image_acceuil_2.png" alt="Image Stratégie de mobilité" />
        </div>
    </div>

    <button @click="$router.push('/espace')">Réaliser un questionnaire</button>
  </div>
</template>

<script setup></script>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.img-entete {
  width: 100%;
  height: auto;
  max-height: 100vh;
  object-fit: contain;
  margin-bottom: 80px;
}

.intro-text {
  max-width: 3000px;
  text-align: center;
  margin-bottom: 80px;
}

.intro-text p {
  font-size: 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 30px;
  line-height: 1.6;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between; 
  max-width: 1600px; 
  width: 100%;
  margin-bottom: 100px;
  gap: 40px; 
}


.text {
  flex: 1;
  min-width: 300px;
  max-width: 900px;
}

.text .titre {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.text p {
  font-size: 28px;
  line-height: 1.6;
  margin-bottom: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.video {
  padding-top: 30px;
  flex: 1;
  min-width: 300px;
  max-width: 900px;
  aspect-ratio: 16 / 9;
}

.video iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
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
  margin-bottom: 100px;
}

button:hover {
  background-color: #d36200;
}

.image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.image {
  flex: 1;
  max-width: 900px; 
  text-align: center;


}

.text,
.video,
.image {
  flex: 1 1 48%; 
  max-width: 800px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  font-size: 28px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

</style>
