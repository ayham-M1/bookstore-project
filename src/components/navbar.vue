<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const isLoggedIn = computed(() => !!localStorage.getItem('token'))
const isAdmin = computed(() => localStorage.getItem('role') === 'admin')

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
</script>

<template>
  <nav>
    <router-link to="/" class="nav-brand">
      {{ isAdmin ? 'Book Shop' : 'Bookstore' }}
    </router-link>

    <div class="nav-links">

      <!-- Non connecté -->
      <template v-if="!isLoggedIn">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </template>

      <!-- Utilisateur connecté -->
      <template v-else-if="!isAdmin">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/books" class="nav-link">All-Books</router-link>
        <router-link to="/add" class="nav-link">Add</router-link>
        <router-link to="/favourites" class="nav-link">Favourites</router-link>
        <button class="nav-link red" @click="logout">Logout</button>
      </template>

      <!-- Admin connecté -->
      <template v-else>
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/admin/books" class="nav-link">Books</router-link>
        <router-link to="/admin/authors" class="nav-link">Authors</router-link>
        <button class="nav-link red" @click="logout">Logout</button>
      </template>

    </div>
  </nav>
</template>