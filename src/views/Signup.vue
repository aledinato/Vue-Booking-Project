<script setup>
import Logo from "@/icons/Logo.vue"
import axios from "axios";
import setParams from "../plugins/axios";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
setParams(null)

let isLoading = ref(false)

const router = useRouter();

let errors = reactive({name: '', surname: '', email: '', password: '', passwordConfirmation: ''})

const form = {
  name: '',
  surname: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

function checkForm(){
  if(form.name === ''){
    errors.name = 'Name is required'
  }else{
    errors.name = ''
  }
  if(form.surname === ''){
    errors.surname = 'Surname is required'
  }else{
    errors.surname = ''
  }
  if(form.email === '') {
    errors.email = 'Email is required'
  }else if(form.email.indexOf('@') === -1 || form.email.indexOf('.') === -1){
    errors.email = 'Email is not valid'
  }else{
    errors.email = ''
  }
  if(form.password === ''){
    errors.password = 'Password is required'
  }else if(form.password.length < 6){
    errors.password = 'Password must be at least 6 characters long'
  }else{
    errors.password = ''
  }
  if(form.passwordConfirmation === ''){
    errors.passwordConfirmation = 'Password confirmation is required'
  }else if(form.password !== form.passwordConfirmation){
    errors.password = 'Passwords do not match'
    errors.passwordConfirmation = 'Passwords do not match'
  }else{
    errors.passwordConfirmation = ''
  }
  return errors.name === '' && errors.surname === '' && errors.email === '' && errors.password === '' && errors.passwordConfirmation === ''
}

function signup() {

  if(!checkForm()){
    return
  }

  isLoading.value = true
  axios.post('auth/registrazione',{
    nome: form.name,
    cognome: form.surname,
    mail: form.email,
    password: form.password,
    confermaPassword: form.passwordConfirmation
  }).then(response => {
    alert('Account created successfully! Check the email to verify your account.')
    router.push({name: 'Login'})
  }).catch(error => {
    alert(error.response.data)
  }).finally(() => {
    isLoading.value = false
  })
}

</script>

<template>
  <div class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="d-flex align-items-center">
                <div class="card-body px-5 text-black">

                  <form @submit.prevent="signup">
                    <div class="d-flex justify-content-center mb-3 pb-1">
                      <Logo :width="110"></Logo>
                    </div>

                    <h5 class="fw-normal" style="letter-spacing: 1px;">Create your account</h5>

                    <div class="form-outline mb-1">
                      <label class="form-label" for="name">Name</label>
                      <input v-model="form.name" type="text" name="name" class="form-control" />
                      <div v-if="errors.name !== ''" class="alert-danger">
                        <p class="text-danger">{{errors.name}}</p>
                      </div>
                    </div>

                    <div class="form-outline mb-1">
                      <label class="form-label" for="surname">Surname</label>
                      <input v-model="form.surname" type="text" name="surname" class="form-control" />
                      <div v-if="errors.surname !== ''">
                        <p class="text-danger">{{errors.surname}}</p>
                      </div>
                    </div>

                    <div class="form-outline mb-1">
                      <label class="form-label" for="email">Email address</label>
                      <input v-model="form.email" type="text" name="email" class="form-control" />
                      <div v-if="errors.email !== ''" class="alert-danger">
                        <p class="text-danger">{{errors.email}}</p>
                      </div>
                    </div>

                    <div class="form-outline mb-1">
                      <label class="form-label" for="password">Password</label>
                      <input v-model="form.password" type="password" name="password" class="form-control" />
                      <div v-if="errors.password !== ''" class="alert-danger">
                        <p class="text-danger">{{errors.password}}</p>
                      </div>
                    </div>

                    <div class="form-outline mb-3">
                      <label class="form-label" for="passwordConfirm">Password confirm</label>
                      <input v-model="form.passwordConfirmation" type="password" name="passwordConfirm" class="form-control" />
                      <div v-if="errors.passwordConfirmation !== ''" class="alert-danger">
                        <p class="text-danger">{{errors.passwordConfirmation}}</p>
                      </div>
                    </div>

                    <div class="pt-1 mb-3">
                      <button v-if="isLoading" class="btn btn-primary btn btn-lg btn-block" type="submit" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">Loading...</span>
                      </button>
                      <button v-else class="btn btn-primary btn-lg btn-block" type="submit">Register</button>
                    </div>
                    <div class="text-muted mb-2">Don't you receive the email? <router-link class="text-muted" to="resendEmail">Click here!</router-link></div>
                    <p class="pb-lg-2" style="color: #393f81;">Do you have an account? <router-link style="color: #393f81;" to="login">Login here!</router-link></p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card{
    background-color: rgba(255, 255, 255, 0.9);
  }
</style>