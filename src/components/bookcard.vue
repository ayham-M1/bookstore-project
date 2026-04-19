<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  },
  isFavourite: {
    type: Boolean,
    default: false
  }
})

defineEmits(['add-favourite', 'remove-favourite'])
</script>

<template>
  <div class="fav-card">
    <img v-if="book.image" :src="book.image" :alt="book.title"/>
    <div v-else class="fav-card-placeholder">📚</div>
    <div class="fav-card-body">
      <div class="fav-card-title">{{ book.title }}</div>
      <div class="fav-card-year">{{ book.year }}</div>
      <button 
        v-if="!isFavourite" 
        class="btn btn-outline btn-sm" 
        @click="$emit('add-favourite', book)">
        Add To Favourites
      </button>
      <button 
        v-else 
        class="btn btn-danger btn-sm" 
        @click="$emit('remove-favourite', book.id)">
        Remove From Favourites
      </button>
    </div>
  </div>
</template>