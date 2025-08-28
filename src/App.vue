<template>
  <Header />
  <div class="app-container">
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './page/Header.vue';

</script>

<style>
@import "leaflet/dist/leaflet.css";
@import "leaflet/dist/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";



.app-container {
  padding-top: 100px; /* Compense la hauteur du Header */
  padding-left: 20px;
  padding-right: 20px;
  /* Autres styles possibles, mais pas position: fixed */
}
</style>