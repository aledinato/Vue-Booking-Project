<script setup>
import Logo from "@/icons/Logo.vue"
import axios from "axios";
import setParams from "../plugins/axios";
import {ref} from "vue";
let email = ref('')
let isLoading = ref(false)
setParams(null)
function resendEmail(){
  isLoading.value = true
  axios.post('auth/resendMail', {email: email.value}).then((response) => {
    alert(response.data)
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
        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="resendEmail">

                    <div class="d-flex justify-content-center mb-3 pb-1">
                      <Logo :width="100"></Logo>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Resend email</h5>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="email">Email address</label>
                      <input type="email" v-model="email" name="email" class="form-control" />
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-primary btn-block" :class="{disabled:isLoading}" type="submit">Resend email</button>
                    </div>
                    <p class="pb-lg-2" style="color: #393f81;">Do you find the email? <router-link style="color: #393f81;" to="login">Login here!</router-link></p>
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