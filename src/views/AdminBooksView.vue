<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api.js'

const books = ref([])
const authors = ref([])
const showModal = ref(false)
const editingBook = ref(null)

const bookForm = reactive({
  title:'',
  editor:'',
  year:2024,
  image:'',
  author:null
})

onMounted(async ()=>{
  await loadBooks()
  await loadAuthors()
})

/* ================= LOAD ================= */

async function loadBooks(){
  const res = await api.get('/books/all')
  books.value = res.data.listeBooks
}

async function loadAuthors(){
  const res = await api.get('/author/all')
  authors.value = res.data
}

/* ================= AUTHOR NAME ================= */

function authorName(book){
  if(!book.author) return '—'
  return book.author.prenom + ' ' + book.author.nom
}

/* ================= MODAL ================= */

function openAddModal(){
  editingBook.value=null
  Object.assign(bookForm,{
    title:'',
    editor:'',
    year:2024,
    image:'',
    author:null
  })
  showModal.value=true
}

function openEditModal(book){
  editingBook.value=book

  Object.assign(bookForm,{
    title:book.title,
    editor:book.editor,
    year:book.year,
    image:book.image,
    author:book.author?.id
  })

  showModal.value=true
}

/* ================= SAVE ================= */

async function saveBook(){

  const payload={
    title:bookForm.title,
    editor:bookForm.editor,
    year:bookForm.year,
    image:bookForm.image,
    author:{ id:bookForm.author }
  }

  if(editingBook.value){
    await api.put(`/books/edit/${editingBook.value.id}`,payload)
  }else{
    await api.post('/books/new',payload)
  }

  showModal.value=false
  await loadBooks()
}

/* ================= DELETE ================= */

async function deleteBook(id){
  await api.delete(`/books/delete/${id}`)
  await loadBooks()
}
</script>

<template>
<div style="padding:2rem">

<!-- HEADER -->
  <div class="page-header">
    <h2>Books</h2>

    <button class="btn btn-primary" @click="openAddModal">
      Add Book
    </button>
  </div>

<table class="data-table">
<thead>
<tr>
<th>ID</th>
<th>Title</th>
<th>Editor</th>
<th>Year</th>
<th>Author</th>
<th></th>
</tr>
</thead>

<tbody>
<tr v-for="book in books" :key="book.id">
<td>{{book.id}}</td>
<td>{{book.title}}</td>
<td>{{book.editor}}</td>
<td>{{book.year}}</td>
<td>{{authorName(book)}}</td>

<td>
<button @click="openEditModal(book)">✏</button>
<button @click="deleteBook(book.id)">✂</button>
</td>
</tr>
</tbody>
</table>

<!-- MODAL -->

<div v-if="showModal" class="modal-overlay">

<div class="modal">

<input v-model="bookForm.title" placeholder="Title"/>
<input v-model="bookForm.editor" placeholder="Editor"/>
<input type="number" v-model.number="bookForm.year"/>
<input v-model="bookForm.image" placeholder="Image"/>

<select v-model="bookForm.author">
<option disabled value="">Choose author</option>
<option v-for="a in authors" :value="a.id" :key="a.id">
{{a.prenom}} {{a.nom}}
</option>
</select>

<button @click="saveBook">
Save
</button>

</div>
</div>

</div>
</template>