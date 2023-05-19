<script setup>
  import BookingModal from "@/views/components/BookingModal.vue";
  import {ref} from "vue";
  import Dates from "../../js/dates.js";

  let selectedEvent = ref(null)

  const emit = defineEmits(['dismiss'])

  defineProps({
    events: {
      type: Array,
      required: true
    }
  })

  function dismiss(event){
    emit('dismiss', selectedEvent)
    selectedEvent.value = null
  }

  function viewEvent(event){
    selectedEvent.value = event
  }
</script>

<template>
  <BookingModal @dismiss="dismiss" :event="selectedEvent"></BookingModal>
  <div v-if="events.length === 0">No events</div>
  <div v-else class="col-sm-4 mb-4" v-for="event in events">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ event.title }}</h5>
        <p>{{ Dates.compareDates(event) ? Dates.getDate(event.start) : Dates.getDate(event.start) + ' - ' + Dates.getDate(event.end) }}</p>
        <p>{{ Dates.getTime(event.start) + ' - ' + Dates.getTime(event.end) }}</p>
        <p class="card-text event">{{ event.description }}</p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal" @click.prevent="viewEvent(event)" >
          View more
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event{
  line-height: 3ex;
  height: 6ex;
  overflow: hidden;
}

.card{
 background-color: rgba(255, 255, 255, 0.9);
}
</style>