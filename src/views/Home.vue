<script setup>
  import {onMounted, reactive, ref} from "vue";
  import axios from "axios";
  import setParams from "../plugins/axios";
  import {useStore} from "vuex";
  import Bookings from "@/views/components/Bookings.vue";
  import SubscriptionModal from "@/views/components/SubscriptionModal.vue";

  const store = useStore()
  setParams(store.getters.getToken)
  let user = reactive(store.getters.getUser)

  let events = ref([])

  onMounted(() => {
    fetchBookings()
  })

  function deleteBooking(event){
    axios.delete('api/bookings/' + event.value.id).catch(error => {
      alert(error.message)
    }).then(() => {
      fetchBookings()
    })
  }

  function fetchBookings(){
    $('#loader').show()
    axios.get('api/bookings/futureBookings').catch(error => {
      alert(error.response.data)
    }).then(response => {
      events.value = response.data
      events.value.forEach(event => {
        event.start = new Date(event.start)
        event.end = new Date(event.end)
      })
      events.value.sort((a, b) => {
        return b.start - a.start
      })
    }).finally(() => {
      $('#loader').hide()
    })
  }
</script>

<template>
  <SubscriptionModal @joined="fetchBookings"></SubscriptionModal>
  <div class="btn-fixed shadow">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subscriptionModal"><i class="bi bi-plus-lg"></i></button>
  </div>
  <div class="row">
    <div class="mb-3">
      <div class="d-flex justify-content-between">
        <h1>My bookings</h1>
        <router-link to="/pastBookings"><button class="btn btn-primary">Past bookings</button></router-link>
      </div>
      <div id="loader" class="spinner-border text-primary mt-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <Bookings @dismiss="deleteBooking" :events="events"></Bookings>
  </div>
</template>

<style scoped>
  .btn-fixed{
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
  }
</style>