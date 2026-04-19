<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = !!localStorage.getItem('token')

const popularBooks = [
  {
    id: 1,
    title: "L'étranger",
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    description: "Un résumé captivant pour ce livre incontournable."
  },
  {
    id: 2,
    title: 'Le Procès',
    image: 'https://covers.openlibrary.org/b/id/8231921-L.jpg',
    description: 'Découvrez pourquoi ce livre est un best-seller.'
  },
  {
    id: 3,
    title: 'La Formule de Dieu',
    image: 'https://covers.openlibrary.org/b/id/9255555-L.jpg',
    description: 'Un récit qui restera gravé dans votre mémoire.'
  },
]

function goToCatalogue() {
  if (isLoggedIn) router.push('/books')
  else router.push('/login')
}
</script>

<template>
  <!-- HERO -->
  <div class="hero">
    <h1>Découvrez des livres pour tous les goûts</h1>
    <p>Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.</p>
    <button class="btn btn-primary" @click="goToCatalogue">Explorer le catalogue</button>
  </div>

  <!-- LIVRES POPULAIRES -->
  <div class="section">
    <h2 class="section-title">Livres populaires</h2>
    <div class="books-grid">
      <div class="book-card" v-for="book in popularBooks" :key="book.id">
        <img :src="book.image" :alt="book.title" class="book-card-cover"/>
        <div class="book-card-body">
          <div class="book-card-title">{{ book.title }}</div>
          <div class="book-card-desc">{{ book.description }}</div>
          <div class="book-card-actions">
            <button class="btn btn-primary btn-sm" @click="goToCatalogue">Voir plus</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <h3>Besoin d'aide ?</h3>
    <p>Contactez-nous pour toute question ou assistance.</p>
    <button class="btn btn-primary">Contactez-nous</button>
  </footer>
</template>