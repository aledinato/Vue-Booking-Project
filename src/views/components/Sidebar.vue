<script setup>
import Logo from "../../icons/Logo.vue"
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";

const store = useStore()
const router = useRouter()

let isLoggedin = computed(() => store.getters.isLoggedIn)
let user = computed(() => {
  return store.getters.getUser
})
const currentRoute = computed(() => router.currentRoute.value.name)
const accountRoute = computed(() => {
  return '/user/' + user.value.id
})
function logout() {
  store.dispatch('logout')
  router.push({name: 'Login'})
}
</script>

<template>
  <aside class="fixed-bottom d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem; height: 100vh">
    <router-link to="/" class="d-flex justify-content-center p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
      <Logo :width="50"></Logo>
    </router-link>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <router-link to="/home" class="nav-link py-3 border-bottom" :class="{ active:currentRoute=='Home'}" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
          <i class="bi bi-house-door"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/myEvents" class="nav-link py-3 border-bottom" :class="{ active:currentRoute=='Events'}" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Events">
          <i class="bi bi-calendar"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/about" class="nav-link py-3 border-bottom" :class="{ active:currentRoute=='About'}" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
          <i class="bi bi-info-circle"></i>
        </router-link>
      </li>
    </ul>
    <div v-if="isLoggedin" class="dropdown border-top">
      <a href="#" class="d-flex align-items-center justify-content-center p-3 text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
        <li><div class="dropdown-item">Ciao {{user.name}}</div></li>
        <li><router-link :to="accountRoute" class="dropdown-item">Profile</router-link></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" @click="logout">Sign out</a></li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
aside {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
</style>