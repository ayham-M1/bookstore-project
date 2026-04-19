<script setup>
import { ref } from 'vue'

const favourites = ref(JSON.parse(localStorage.getItem('favourites') || '[]'))

function removeFavourite(id) {
  favourites.value = favourites.value.filter(f => f.id !== id)
  localStorage.setItem('favourites', JSON.stringify(favourites.value))
}
</script>

<template>
  <div style="padding:2rem;">
    <div v-if="favourites.length === 0" style="text-align:center;padding:4rem;color:var(--text-light);">
      <div style="font-size:3rem;margin-bottom:1rem;">💔</div>
      <p>Aucun favori pour l'instant. Explorez le catalogue !</p>
    </div>
    <div class="books-grid-large">
      <div class="fav-card" v-for="book in favourites" :key="book.id">
        <img v-if="book.image" :src="book.image" :alt="book.title"/>
        <div v-else class="fav-card-placeholder">📚</div>
        <div class="fav-card-body">
          <div class="fav-card-title">{{ book.title }}</div>
          <div class="fav-card-year">{{ book.year }}</div>
          <button class="btn btn-danger btn-sm" @click="removeFavourite(book.id)">Remove From Favourites</button>
        </div>
      </div>
    </div>
  </div>
</template>