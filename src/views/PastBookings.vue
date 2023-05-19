<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import setParams from "@/plugins/axios";
import {useStore} from "vuex";
import Events from "@/views/components/Bookings.vue";

const store = useStore()
setParams(store.getters.getToken)
let user = reactive(store.getters.getUser)

let events = ref([])

onMounted(() => {
  fetchEvents()
})

function deleteEvent(event){
  axios.delete('api/bookings/' + event.value.id).catch(error => {
    alert(error.response.data)
  }).then(() => {
    fetchEvents()
  })
}

function fetchEvents(){
  $('#loader').show()
  axios.get('api/bookings/pastBookings').then(response => {
    events.value = response.data
    events.value.forEach(event => {
      event.start = new Date(event.start)
      event.end = new Date(event.end)
    })
    events.value.sort((a, b) => {
      return b.start - a.start
    })
  }).catch(error => {
    alert(error.response.data)
  }).finally(() => {
    $('#loader').hide()
  })
}
</script>

<template>
  <div class="row">
    <div class="mb-3">
      <div class="d-flex justify-content-between">
        <h1>Past bookings</h1>
        <router-link to="/home"><button class="btn btn-primary">My bookings</button></router-link>
      </div>
      <div id="loader" class="spinner-border text-primary mt-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <Events @dismiss="deleteEvent" :events="events"></Events>
  </div>
</template>