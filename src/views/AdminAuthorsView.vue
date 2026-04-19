<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api.js'

const authors = ref([])
const showModal = ref(false)
const editingAuthor = ref(null)
const adminMsg = ref(null)

const authorForm = reactive({
  prenom:'',
  nom:''
})

/* ================= LOAD ================= */

onMounted(async () => {
  await loadAuthors()
})

async function loadAuthors(){
  try{
    const res = await api.get('/author/all')
    authors.value = res.data
  }catch(e){
    showMsg('Erreur chargement auteurs','danger')
  }
}

/* ================= MODAL ================= */

function resetForm(){
  authorForm.prenom=''
  authorForm.nom=''
}

function openAddModal(){
  editingAuthor.value=null
  resetForm()
  showModal.value=true
}

function openEditModal(author){
  editingAuthor.value=author
  Object.assign(authorForm,author)
  showModal.value=true
}

/* ================= SAVE ================= */

async function saveAuthor(){

  if(!authorForm.prenom || !authorForm.nom){
    showMsg('Champs obligatoires','danger')
    return
  }

  try{

    if(editingAuthor.value){
      await api.put(`/author/edit/${editingAuthor.value.id}`,authorForm)
      showMsg('Auteur modifié','success')
    }
    else{
      await api.post('/author/add',authorForm)
      showMsg('Auteur ajouté','success')
    }

    showModal.value=false
    await loadAuthors()

  }catch(e){
    showMsg('Erreur serveur','danger')
  }
}

/* ================= DELETE ================= */

async function deleteAuthor(id){
  try{
    await api.delete(`/author/delete/${id}`)
    await loadAuthors()
    showMsg('Auteur supprimé','success')
  }catch(e){
    showMsg('Erreur suppression','danger')
  }
}

/* ================= MESSAGE ================= */

function showMsg(text,type){
  adminMsg.value={text,type}
  setTimeout(()=>adminMsg.value=null,3000)
}
</script>

<template>
<div style="padding:2rem">

  <!-- HEADER -->
  <div class="page-header">
    <h2>Authors</h2>

    <button class="btn btn-primary" @click="openAddModal">
      Add Author
    </button>
  </div>

  <!-- MESSAGE -->
  <div v-if="adminMsg"
       class="alert"
       :class="adminMsg.type==='success'
          ? 'alert-success'
          : 'alert-danger'">
    {{adminMsg.text}}
  </div>

  <!-- TABLE -->
  <table class="data-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="author in authors" :key="author.id">
        <td>{{author.id}}</td>
        <td>{{author.prenom}}</td>
        <td>{{author.nom}}</td>

        <td>
          <div class="actions-cell">
            <button class="btn-icon edit"
                    @click="openEditModal(author)">✏</button>

            <button class="btn-icon delete"
                    @click="deleteAuthor(author.id)">✂</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- MODAL -->
  <div class="modal-overlay"
       v-if="showModal"
       @click.self="showModal=false">

    <div class="modal">

      <div class="modal-header">
        <span class="modal-title">
          {{editingAuthor ? 'Edit Author' : 'Add Author'}}
        </span>

        <button class="modal-close"
                @click="showModal=false">×</button>
      </div>

      <div class="form-group">
        <label>First Name</label>
        <input v-model="authorForm.prenom" />
      </div>

      <div class="form-group">
        <label>Last Name</label>
        <input v-model="authorForm.nom" />
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary"
                @click="saveAuthor">
          {{editingAuthor ? 'Update' : 'Add'}}
        </button>
      </div>

    </div>
  </div>

</div>
</template>