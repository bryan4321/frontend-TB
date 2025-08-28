<template>
  <div class="card">
    <h3 class="title">{{ title }}</h3>

    <div v-if="loading" class="state">Chargement…</div>
    <div v-else-if="error" class="state error">{{ error }}</div>

    <div v-else class="canvas-wrap">
      <canvas ref="canvasEl" width="760" height="660"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, nextTick, watch } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

const props = defineProps({
  diaId: { type: Number, required: true },
  queNo: { type: Number, required: true },
  title: { type: String, default: '' }
})

const canvasEl = ref(null)
let chart = null
const loading = ref(false)
const error = ref('')

const baseColors = [
  'rgba(255, 99, 132, 0.6)',   
  'rgba(54, 162, 235, 0.6)',   
  'rgba(255, 206, 86, 0.6)',   
  'rgba(75, 192, 192, 0.6)',   
  'rgba(153, 102, 255, 0.6)', 
  'rgba(255, 159, 64, 0.6)',  
  'rgba(199, 199, 199, 0.6)',  
  'rgba(255, 99, 255, 0.6)',   
  'rgba(99, 255, 132, 0.6)',   
  'rgba(99, 132, 255, 0.6)'   
]
const toOpaque = c => c.replace(/0\.6\)/, '1)') 
const genColors = n => Array.from({ length: n }, (_, i) => baseColors[i % baseColors.length])

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
      destroyChart()
      return
    }

    const labels = data.map(d => d.lst_rep)
    const values = data.map(d => d.count)
    const bg = genColors(values.length)
    const borders = bg.map(toOpaque)

    loading.value = false
    await nextTick()
    if (!canvasEl.value) {
      error.value = 'Canvas introuvable.'
      return
    }

    destroyChart()
    chart = new Chart(canvasEl.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Nombre de réponses',
          data: values,
          backgroundColor: bg,
          borderColor: borders,
          borderWidth: 1
        }]
      },
      options: {
        responsive: false, 
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y ?? ctx.parsed}`
            }
          },
        },
        scales: {
          x: {
            ticks: { font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
            grid: { color: 'rgba(0,0,0,0.05)' }
          }
        }
      }
    })
  } catch (e) {
    console.error(e)
    error.value = e?.response?.status === 401 ? 'Non autorisé (401).' : 'Erreur lors de la récupération.'
    loading.value = false
    destroyChart()
  }
}

const destroyChart = () => {
  if (chart) {
    chart.destroy()
    chart = null
  }
}

watch(() => [props.diaId, props.queNo], fetchAndDraw, { immediate: true })
onBeforeUnmount(destroyChart)
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
