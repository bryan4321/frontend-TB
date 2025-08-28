<template>
  <div class="card">
    <h3 class="title">{{ title }}</h3>

    <div v-if="loading" class="state">Chargement…</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <canvas v-else ref="canvasEl" width="760" height="660"
            style="max-width:760px;max-height:760px;display:block;margin:auto"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

const props = defineProps({ diaId:Number, queNo:Number, title:String })
const canvasEl = ref(null)
let chart = null
const loading = ref(false)
const error = ref('')

const fetchAndDraw = async () => {
  loading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(
      `http://localhost:8000/api/stats/diagnostic/${props.diaId}/question/${props.queNo}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    )

    if (!data || data.length === 0) {
      loading.value = false
      error.value = 'Aucune réponse reçue.'
      return
    }

    const labels = data.map(d => `${d.lst_rep} (${d.count})`)
    const values = data.map(d => d.count)

    loading.value = false
    await nextTick()

    if (!canvasEl.value) {
      error.value = 'Canvas introuvable.'
      return
    }
    if (chart) chart.destroy()

    chart = new Chart(canvasEl.value.getContext('2d'), {
      type: 'doughnut',
      data: { labels, datasets: [{ data: values }] },
      options: {
        responsive: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: c => `${c.label.replace(/\s\(\d+\)$/, '')}: ${c.parsed}` } }
        },
        cutout: '60%'
      }
    })
  } catch (e) {
    console.error(e)
    error.value = e?.response?.status === 401 ? 'Non autorisé (401).' : 'Erreur lors de la récupération.'
    loading.value = false
  }
}

onMounted(fetchAndDraw)
onBeforeUnmount(() => { if (chart) chart.destroy() })
</script>

<style scoped>
.card {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 14px;
  background: #fff;
}
.title {
  margin: 0 0 8px 0;
  font: 600 18px/1.3 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.state { padding: 8px 0; color: #444; }
.state.error { color: #b91c1c; }
.canvas-wrap {
  display: flex;
  justify-content: center;
}
</style>
