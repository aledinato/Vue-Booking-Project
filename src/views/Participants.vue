<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import setParams from "@/plugins/axios";

const store = useStore()
setParams(store.getters.getToken)

const router = useRouter()

let isLoading = ref(false)

let participants = ref([])

function fetchParticipants(eventId){
  isLoading.value = true
  axios.get('api/participants/'+eventId).then(response => {
    console.log(response.data)
    participants.value = response.data
  }).catch(error => {
    alert(error.response.data)
  }).finally(()=>{
    isLoading.value = false
  })
}

function deleteParticipant(participantId){
  let confirmed = confirm('Are you sure you want to delete this participant?')
  if(confirmed){
    isLoading.value = true
    axios.delete('api/participants/'+participantId).then(() => {
      fetchParticipants(router.currentRoute.value.params.id)
    }).catch(error => {
      alert(error.response.data)
    }).finally(()=>{
      isLoading.value = false
    })
  }
}

onMounted(()=>{
  fetchParticipants(router.currentRoute.value.params.id)
})
</script>

<template>
  <div class="mb-3">
    <h1>Participants</h1>
  </div>
  <div id="loader" v-if="isLoading" class="spinner-border text-primary mt-3 mb-3" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div>
    <ul class="list-group">
      <li v-for="participant in participants" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="mb-1">{{ participant.name + ' ' + participant.surname }}</h5>
            <p class="mb-1">{{ participant.email }}</p>
          </div>
          <div class="d-flex align-items-center">
            <button @click="deleteParticipant(participant.id)" class="btn btn-sm btn-danger"><i class="bi bi-x-lg"></i></button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>