<script setup>
import Logo from "@/icons/Logo.vue"
import axios from "axios";
import {ref} from "vue";
let email = ''
let isLoading = ref(false)
function recoverPassword(){
  isLoading.value = true
  axios.post('http://localhost:5173/auth/forgot-password', {email: email}).catch(error => {
    alert(error.message)
  }).then((response) => {
    alert(response.data)
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="recoverPassword">

                    <div class="d-flex justify-content-center mb-3 pb-1">
                      <Logo :width="100"></Logo>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Forgot password</h5>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="email">Email address</label>
                      <input type="email" v-model="email" name="email" class="form-control" />
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-primary btn-block" :class="{disabled:isLoading}" type="submit">Reset password</button>
                    </div>
                    <p class="pb-lg-2" style="color: #393f81;">Do you remember the password? <router-link style="color: #393f81;" to="login">Login here!</router-link></p>
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
.card {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>