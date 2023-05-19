<script setup>
import Calendar from "@/views/components/Calendar.vue";
import axios from "axios";
import setParams from "@/plugins/axios";
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import EventForm from "@/views/components/EventForm.vue";
import Dates from "@/js/dates";

const store = useStore()
setParams(store.getters.getToken)
let events = ref([])

let selectedYearMonth = ref(new Date().getFullYear()+'-'+Dates.getMonth(new Date()))

onMounted(() => {
  fetchEvents()
})

function deleteEvent(event) {
  axios.delete('api/events/' + event.id).catch(error => {
    alert(error.response.data)
  }).then(() => {
    fetchEvents()
  })
}

function fetchEvents(){
  $('#loader').show()
  axios.get('api/events').catch(error => {
    alert(error.response.data)
  }).then(response => {
    events.value = response.data
    events.value.sort((a, b) => {
      return b.start - a.start
    })
    events.value = groupByDate(events.value)
  }).finally(() => {
    $('#loader').hide()
  })
}

function groupByDate(events){
  let groupedEvents = []
  events.forEach(event => {
    let s = new Date(event.start)
    let date = s.getFullYear() + '-' + (s.getMonth()+1) + '-' + s.getDate()
    let index = groupedEvents.findIndex(groupedEvent => groupedEvent.date === date)
    if(index === -1){
      groupedEvents.push({
        date: date,
        events: [event]
      })
    }else{
      groupedEvents[index].events.push(event)
    }
  })
  return groupedEvents
}
</script>

<template>
  <div ref="modal" class="modal fade" id="eventModalCreating" tabindex="-1" role="dialog" aria-labelledby="eventModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="eventModalTitle">Create event</h4>
          <button type="button" class="close border-0" style="background:none;" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
          </button>
        </div>
        <div class="modal-body">
          <EventForm @created="fetchEvents"></EventForm>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="d-flex justify-content-between">
      <h1>My Events</h1>
      <div id="actions" class="d-flex justify-content-center">
        <div class="mx-4"><input class="form-control" type="month" id="start" name="start" v-model="selectedYearMonth"></div>
        <div class="text-end"><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModalCreating"><i class="bi bi-plus-lg"></i></button></div>
      </div>
    </div>
    <div id="loader" class="spinner-border text-primary mt-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <Calendar @deleteEvent="deleteEvent" @updated-event="fetchEvents" :selectedYearMonth="selectedYearMonth" :events="events"></Calendar>
  </div>
</template>

<style scoped>
@media  screen and (max-width:560px) {
  #actions{
    display: block !important;
  }

  #actions div{
    margin: 0px !important;
  }

  #actions div:last-child{
    margin-top: 10px !important;
  }
}
</style>