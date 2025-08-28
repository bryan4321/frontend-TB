<template>
  <div class="w-full h-full">
    <div v-if="loading" class="p-2">Chargement…</div>
    <div v-else-if="error" class="p-2 text-red-600">{{ error }}</div>
    <div id="map" style="height: 60vh;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'
import axios from 'axios'

const { diaId } = defineProps({ diaId: { type: Number, required: true } })
const API = 'http://localhost:8000'

const map = ref(null)
const cluster = ref(null)          
const workLayer = ref(null)        
const routesLayer = ref(null)      
const loading = ref(true)
const error = ref(null)


const blueDot = L.divIcon({
  className: '',
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 2px rgba(0,0,0,.25)"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11]
})

const redDot = L.divIcon({
  className: '',
  html: '<div style="width:22px;height:22px;border-radius:50%;background:#ef4444;border:3px solid #fff;box-shadow:0 0 0 2px rgba(0,0,0,.25)"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14]
})


onMounted(async () => {
  try {
    const token = localStorage.getItem('token')

    map.value = L.map('map').setView([46.2, 6.15], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; OpenStreetMap'
    }).addTo(map.value)

    map.value.createPane('workPane')
    map.value.getPane('workPane').style.zIndex = 650

    cluster.value = L.markerClusterGroup({
      maxClusterRadius: 50,
      disableClusteringAtZoom: 16,
      chunkedLoading: true
    })
    workLayer.value = L.layerGroup([], { pane: 'workPane' })
    routesLayer.value = L.layerGroup()

    map.value.addLayer(cluster.value)
    map.value.addLayer(workLayer.value)
    map.value.addLayer(routesLayer.value)

    // Appels API avec le token dans les headers
    const [homeRes, workRes] = await Promise.all([
      axios.get(`${API}/api/stats/diagnostic/adresse/${diaId}/geojson`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API}/api/stats/diagnostic/adresse/${diaId}/geojson/travail`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])

    const homes = homeRes.data?.features ?? []
    const works = workRes.data?.features ?? []

    const workById = new Map()
    for (const f of works) {
      const wid = f?.properties?.id
      if (wid != null) workById.set(String(wid), f)
    }

    const dist = (a, b) => {
      const dx = a[0] - b[0], dy = a[1] - b[1]
      return Math.sqrt(dx*dx + dy*dy)
    }
    const findNearestWork = (coord) => {
      let best = null, bestD = Infinity
      for (const f of works) {
        const d = dist(coord, f.geometry.coordinates)
        if (d < bestD) { bestD = d; best = f }
      }
      return best
    }

    const workMarkers = []
    for (const f of works) {
      const [lng, lat] = f.geometry.coordinates
      workMarkers.push(L.marker([lat, lng], { icon: redDot, pane: 'workPane', interactive: false }))
    }
    workLayer.value.addLayer(L.featureGroup(workMarkers))

    const homeMarkers = []
    for (const f of homes) {
      const [lng, lat] = f.geometry.coordinates
      homeMarkers.push(L.marker([lat, lng], { icon: blueDot }))
    }
    cluster.value.addLayers(homeMarkers)

    for (const f of homes) {
      const [hlng, hlat] = f.geometry.coordinates
      const id = f?.properties?.id ?? null
      let wf = (id != null && workById.size) ? workById.get(String(id)) : null
      if (!wf) wf = findNearestWork([hlng, hlat])
      if (!wf) continue
      const [wlng, wlat] = wf.geometry.coordinates
      await drawRoute([hlng, hlat], [wlng, wlat])
      await delay(200)
    }

    const group = L.featureGroup([...homeMarkers, ...workMarkers])
    const b = group.getBounds()
    if (b.isValid()) map.value.fitBounds(b, { padding: [24, 24] })

  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Erreur chargement des données'
  } finally {
    loading.value = false
  }
})


function delay(ms){ return new Promise(res => setTimeout(res, ms)) }

async function drawRoute([fromLng, fromLat], [toLng, toLat]) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
    const { data } = await axios.get(url)
    if (!data?.routes?.[0]?.geometry) return

    const feature = {
      type: 'Feature',
      geometry: data.routes[0].geometry,
      properties: {}
    }
    const layer = L.geoJSON(feature, { style: { weight: 4 } })
    routesLayer.value.addLayer(layer)
  } catch (e) {
    const layer = L.polyline([[fromLat, fromLng], [toLat, toLng]], { weight: 2, dashArray: '4,6' })
    routesLayer.value.addLayer(layer)
  }
}
</script>

<style scoped>
.dot { 
  width: 18px; height: 18px; border-radius: 50%;
  border: 3px solid #fff; box-shadow: 0 0 0 2px rgba(0,0,0,.25);
}
.dot-blue { background: #2563eb; }
.dot-red  { background: #ef4444; }
.big { width: 24px; height: 24px; border-width: 3px; }

.marker-cluster div {
  background: rgba(37, 99, 235, 0.95);
  border: 3px solid #fff;
  color: #fff; font-weight: 700;
  box-shadow: 0 0 0 2px rgba(0,0,0,.25);
}


</style>
