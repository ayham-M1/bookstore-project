<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api.js'

const router = useRouter()
const authMode = ref('login')
const authError = ref('')
const authSuccess = ref('')

const authForm = reactive({
  username: '',
  email: '',
  password: ''
})

async function doLogin() {
  authError.value = ''
  try {
    const res = await api.post('/auth/login', {
      username: authForm.username,
      password: authForm.password
    })
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('role', res.data.role)
    if (res.data.role === 'admin') router.push('/admin/books')
    else router.push('/')
  } catch (e) {
    authError.value = 'Identifiants incorrects.'
  }
}

async function doRegister() {
  authError.value = ''
  if (!authForm.username || !authForm.email || !authForm.password) {
    authError.value = 'Veuillez remplir tous les champs.'
    return
  }
  try {
    await api.post('/auth/register', {
      username: authForm.username,
      email: authForm.email,
      password: authForm.password
    })
    authSuccess.value = 'Compte créé ! Vous pouvez vous connecter.'
    authMode.value = 'login'
    authForm.username = ''
    authForm.password = ''
    authForm.email = ''
  } catch (e) {
    authError.value = "Erreur lors de l'inscription."
  }
}
</script>

<template>
  <div style="background:var(--gray-light);min-height:calc(100vh - 62px);padding:3rem 2rem;">
    <div style="max-width:600px;">

      <div v-if="authError" class="alert alert-danger">{{ authError }}</div>
      <div v-if="authSuccess" class="alert alert-success">{{ authSuccess }}</div>

      <!-- LOGIN -->
      <template v-if="authMode === 'login'">
        <div class="form-group">
          <label>Username</label>
          <input v-model="authForm.username" type="text" placeholder="Votre nom d'utilisateur"/>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="authForm.password" type="password" placeholder="Votre mot de passe"/>
        </div>
        <div style="text-align:center;display:flex;flex-direction:column;gap:0.8rem;align-items:center;margin-top:1.2rem;">
          <button class="btn btn-primary" style="width:200px" @click="doLogin">Login</button>
          <button class="btn btn-primary" style="width:200px;background:linear-gradient(135deg,#1a3a6b,#2e74cc)" @click="authMode='register'">Switch to Register</button>
        </div>
      </template>

      <!-- REGISTER -->
      <template v-else>
        <div class="form-group">
          <label>Username</label>
          <input v-model="authForm.username" type="text" placeholder="Choisissez un nom d'utilisateur"/>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="authForm.email" type="email" placeholder="votre@email.com"/>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="authForm.password" type="password" placeholder="Choisissez un mot de passe"/>
        </div>
        <div style="text-align:center;display:flex;flex-direction:column;gap:0.8rem;align-items:center;margin-top:1.2rem;">
          <button class="btn btn-primary" style="width:200px" @click="doRegister">Register</button>
          <button class="btn btn-primary" style="width:200px;background:linear-gradient(135deg,#1a3a6b,#2e74cc)" @click="authMode='login'">Switch to Login</button>
        </div>
      </template>

    </div>
  </div>
</template>