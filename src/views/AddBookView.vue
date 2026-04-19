<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api.js'

const authors = ref([])
const addSuccess = ref(false)
const addError = ref('')

const form = reactive({
  title: '',
  image: '',
  editor: '',
  year: new Date().getFullYear(),
  description: '',
  authorId: ''
})

onMounted(async () => {
  try {
    const res = await api.get('/authors')
    authors.value = res.data
  } catch (e) {
    console.error(e)
  }
})

async function submitAddBook() {
  addError.value = ''
  if (!form.title) { addError.value = 'Le titre est obligatoire.'; return }
  try {
    await api.post('/books', { ...form })
    addSuccess.value = true
    Object.assign(form, { title: '', image: '', editor: '', year: new Date().getFullYear(), description: '', authorId: '' })
    setTimeout(() => addSuccess.value = false, 3000)
  } catch (e) {
    addError.value = "Erreur lors de l'ajout du livre."
  }
}
</script>

<template>
  <div style="padding:2rem;max-width:900px;">
    <div v-if="addSuccess" class="alert alert-success">Livre ajouté avec succès !</div>
    <div v-if="addError" class="alert alert-danger">{{ addError }}</div>

    <div class="form-group"><label>Title</label><input v-model="form.title" type="text"/></div>
    <div class="form-group"><label>Image</label><input v-model="form.image" type="text" placeholder="URL de l'image"/></div>
    <div class="form-group"><label>Editor</label><input v-model="form.editor" type="text"/></div>
    <div class="form-group"><label>Year</label><input v-model.number="form.year" type="number"/></div>
    <div class="form-group"><label>Description</label><textarea v-model="form.description"></textarea></div>
    <div class="form-group">
      <label>Author</label>
      <select v-model="form.authorId">
        <option value=""></option>
        <option v-for="a in authors" :key="a.id" :value="a.id">{{ a.name }}</option>
      </select>
    </div>
    <div style="text-align:right;margin-top:1rem;">
      <button class="btn btn-primary" @click="submitAddBook">Ajouter Livre</button>
    </div>
  </div>
</template>