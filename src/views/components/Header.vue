<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";

const store = useStore()
const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.name)

let profileLink = computed(() => {
  return '/user/'+store.getters.getUser.id
})

let name = computed(() => store.getters.getUser.name)
let isLoggedin = computed(() => store.getters.isLoggedIn)

function logout() {
  store.dispatch('logout')
  router.push({name: 'Login'})
}
</script>

<template>
  <div class="container w-100">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">

      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/home" class="nav-link px-2" :class="{ 'link-secondary':currentRoute=='Home'}">Home</router-link></li>
        <li><router-link to="/myEvents" class="nav-link px-2" :class="{ 'link-secondary':currentRoute=='Events'}">My events</router-link></li>
        <li><router-link to="/about" class="nav-link px-2" :class="{ 'link-secondary':currentRoute=='About'}">About</router-link></li>
        <li>
          <div class="dropdown">
            <a class="dropdown-toggle nav-link px-2" data-bs-toggle="dropdown" aria-expanded="false" :class="{ 'link-secondary':currentRoute=='User'}">
              Profile
            </a>
            <ul class="dropdown-menu">
              <li class="border-bottom pb-1"><a class=" dropdown-item">Ciao {{ name }}</a></li>
              <li class="mt-1"><router-link :to="profileLink" class="dropdown-item">User info</router-link></li>
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="col-md-3 text-end" id="logout-btn">
        <router-link v-if="!isLoggedin" to="/login"><button type="button" class="btn btn-outline-primary me-2" alt="login">Login</button></router-link>
        <button v-else type="button" @click="logout" class="btn btn-primary" alt="logout"><i class="bi bi-box-arrow-right"></i></button>
      </div>
    </header>
  </div>
</template>

<style scoped>
@media  screen and (max-width:768px) {
  #logout-btn{
    visibility: hidden;
    height: 0px;
  }
}
</style>
