<script setup>
import Logo from "@/icons/Logo.vue"
import { useStore } from 'vuex'
import axios from "axios";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import setParams from "../plugins/axios";
setParams(null)

const router = useRouter()
const store = useStore()


let isLoading = ref(false)
let errors = reactive({email: '', password: ''})

let form = {
  email: '',
  password: ''
}

function checkForm(){
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
  return errors.email === '' && errors.password === ''
}

function login() {
  if(!checkForm()){
    return
  }

  isLoading.value = true
  console.log("Invio login")
  axios.post('auth/login', {
    email: form.email,
    password: form.password
  }).then(response => {
  console.log(response)
      store.dispatch('setUser', response.data.user)
      store.dispatch('setToken', response.data.accessToken)
      router.push({name: 'Home'})
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
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="login">
                    <div class="d-flex justify-content-center mb-3 pb-1">
                      <Logo :width=150></Logo>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign in</h5>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="email">Email address</label>
                      <input type="email" v-model="form.email" name="email" class="form-control form-control-lg" />
                      <div v-if="errors.email !== ''" class="alert-danger">
                        <p class="text-danger">{{errors.email}}</p>
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="password">Password</label>
                      <input type="password" v-model="form.password" name="password" class="form-control form-control-lg" />
                      <div v-if="errors.password !== ''" class="alert-danger">
                        <p class="text-danger">{{errors.password}}</p>
                      </div>
                    </div>

                    <div class="pt-1 mb-4">
                      <button v-if="isLoading" class="btn btn-primary btn btn-lg btn-block" type="submit" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">Loading...</span>
                      </button>
                      <button v-else class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                    </div>

                    <p class="pb-lg-2" style="color: #393f81;">Don't have an account? <router-link style="color: #393f81;" to="signup">Register here!</router-link></p>
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
