<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import setParams from "@/plugins/axios";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import PasswordModal from "@/views/components/PasswordModal.vue";
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()
setParams(store.getters.getToken)

let user = ref({name: '', surname: '', email: ''})

let isLoading = ref(false)

let errors = reactive({name: '', surname: '', email: ''})

onBeforeMount(() => {
  fetchUser(router.currentRoute.value.params.id)
})

function fetchUser(id){
  isLoading.value = true
  axios.get('api/users/' + id).then( response => {
    user.value = response.data
  }).catch( error => {
    alert(error.response.data)
  }).finally(()=>{
    isLoading.value = false
  })
}

function updateUser(){
  if(!checkForm()){
    return
  }

  isLoading.value = true
  axios.put('api/users/update', user.value).then(() => {
    alert('User updated successfully')
  }).catch(error => {
    alert(error.response.data)
  }).finally(()=>{
    isLoading.value = false
  })
}

function checkForm(){
  console.log(user.value)
  if(user.value.name === ''){
    errors.name = 'Name is required'
  }else{
    errors.name = ''
  }
  if(user.value.surname === ''){
    errors.surname = 'Surname is required'
  }else{
    errors.surname = ''
  }
  if(user.value.email === '') {
    errors.email = 'Email is required'
  }else if(user.value.email.indexOf('@') === -1 || user.value.email.indexOf('.') === -1){
    errors.email = 'Email is not valid'
  }else{
    errors.email = ''
  }
  return errors.name === '' && errors.surname === '' && errors.email === ''
}
</script>

<template>
  <PasswordModal :user="user"></PasswordModal>
  <div class="text-center">
    <h1>User</h1>
  </div>
  <div v-if="isLoading" class="text-center">
    <div class="spinner-border text-primary my-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="card p-5 mt-3">
    <form @submit.prevent="updateUser" :disabled="isLoading">
      <div class="form-outline mb-1">
        <label class="form-label" for="name">Name</label>
        <input v-model="user.name" type="text" name="name" class="form-control" />
        <div v-if="errors.name !== ''" class="alert-danger">
          <p class="text-danger">{{errors.name}}</p>
        </div>
      </div>

      <div class="form-outline mb-1">
        <label class="form-label" for="surname">Surname</label>
        <input v-model="user.surname" type="text" name="surname" class="form-control" />
        <div v-if="errors.surname !== ''" class="alert-danger">
          <p class="text-danger">{{errors.surname}}</p>
        </div>
      </div>

      <div class="form-outline mb-1">
        <label class="form-label" for="email">Email</label>
        <input v-model="user.email" type="email" name="email" class="form-control" />
        <div v-if="errors.email !== ''" class="alert-danger">
          <p class="text-danger">{{errors.email}}</p>
        </div>
      </div>

      <div class="my-4">
        <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#passwordModal" aria-expanded="false" aria-controls="passwordCollapse">
          Change password
        </button>
      </div>

      <div class="pt-1 mb-3 d-flex justify-content-center">
        <button class="btn btn-primary mt-3 px-5" :class="{ disabled:isLoading}" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card{
  background-color: rgba(255, 255, 255, 0.9);
}
</style>