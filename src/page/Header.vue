<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="navpol" @click.prevent="handleAccueil">Accueil</router-link>
      <router-link to="/questionnaire" class="navpol" @click.prevent="handleQuestionnaire">Questionnaire</router-link>
      <router-link v-if="isLoggedIn" to="/espace" class="navpol" @click.prevent="handleDeconnexion">Déconnexion</router-link>
      <router-link v-else to="/espace" class="navpol">Mon Espace</router-link>
    </nav>

    <img src="../assets/logo_tpg.png" alt="logo TPG" class="logo" />
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const isLoggedIn = ref(!!localStorage.getItem('token'))

async function apiLogout() {
  const token = localStorage.getItem('token')
  try {
    if (token) {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
    }
  } catch (e) {
    console.warn('Erreur réseau lors de la déconnexion :', e)
  } finally {
    localStorage.removeItem('token')
    isLoggedIn.value = false
  }
}


async function handleAccueil() {
  if (isLoggedIn.value) {
    await apiLogout()
  }
  router.push('/')
}


async function handleQuestionnaire() {
  if (isLoggedIn.value) {
    await apiLogout()
  }
  router.push('/questionnaire')
}


async function handleDeconnexion() {
  await apiLogout()
  router.push('/espace')
}

function onStorage(e) {
  if (e.key === 'token') {
    isLoggedIn.value = !!e.newValue
  }
}
onMounted(() => window.addEventListener('storage', onStorage))
onBeforeUnmount(() => window.removeEventListener('storage', onStorage))
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.logo {
  height: 80px;
  width: auto;
  margin-left: auto;
}

.header {
  width: 100%;
  height: 100px;
  background-color: #ED7405;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ED7405;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav {
  display: flex;
  gap: 3rem;
}

.navpol {
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  transition: color 0.3s ease;
}
</style>
