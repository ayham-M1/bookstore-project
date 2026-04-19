<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api.js'

const books = ref([])
const favourites = ref(JSON.parse(localStorage.getItem('favourites') || '[]'))
const filterStartYear = ref('')
const filterEndYear = ref('')
const activeStart = ref(null)
const activeEnd = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/books/all')

    // sécurité : toujours tableau
    books.value = Array.isArray(res.data)
      ? res.data
      : res.data.data || res.data.books || []

  } catch (e) {
    console.error(e)
  }
})

const filteredBooks = computed(() => {
  return books.value.filter(b => {
    if (activeStart.value && b.year < activeStart.value) return false
    if (activeEnd.value && b.year > activeEnd.value) return false
    return true
  })
})

function applyFilter() {
  activeStart.value = filterStartYear.value || null
  activeEnd.value = filterEndYear.value || null
}

function isFavourite(id) {
  return favourites.value.some(f => f.id === id)
}

function addFavourite(book) {
  if (!isFavourite(book.id)) {
    favourites.value.push(book)
    localStorage.setItem('favourites', JSON.stringify(favourites.value))
  }
}

function removeFavourite(id) {
  favourites.value = favourites.value.filter(f => f.id !== id)
  localStorage.setItem('favourites', JSON.stringify(favourites.value))
}
</script>

<template>
  <div style="padding:2rem;">
    <!-- Filtre -->
    <div style="display:flex;gap:1rem;margin-bottom:1.5rem;align-items:flex-end;flex-wrap:wrap;">
      <div class="form-group" style="margin-bottom:0;">
        <label>Start Year</label>
        <input v-model.number="filterStartYear" type="number" placeholder="ex: 1900" style="width:160px"/>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>End Year</label>
        <input v-model.number="filterEndYear" type="number" placeholder="ex: 2025" style="width:160px"/>
      </div>
      <button class="btn btn-primary" @click="applyFilter">Search</button>
    </div>

    <!-- Grille -->
    <div class="books-grid-large">
      <div class="fav-card" v-for="book in filteredBooks" :key="book.id">
        <img v-if="book.image" :src="book.image" :alt="book.title"/>
        <div v-else class="fav-card-placeholder">📚</div>
        <div class="fav-card-body">
          <div class="fav-card-title">{{ book.title }}</div>
          <div class="fav-card-year">{{ book.year }}</div>
          <button v-if="!isFavourite(book.id)" class="btn btn-outline btn-sm" @click="addFavourite(book)">Add To Favourites</button>
          <button v-else class="btn btn-danger btn-sm" @click="removeFavourite(book.id)">Remove From Favourites</button>
        </div>
      </div>
    </div>
  </div>
</template>