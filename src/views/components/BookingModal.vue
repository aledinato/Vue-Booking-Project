<script setup>
import Dates from "../../js/dates.js"

const emit = defineEmits(['dismiss'])

function dismiss() {
  if (confirm('Are you sure you want to delete this event?')) {
    emit('dismiss')
  }
}

defineProps({
  event: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div v-if="event===null" id="loader" class="spinner-border text-primary mt-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="eventModalTitle">{{ event.title }}</h4>
          <button type="button" class="close border-0" style="background:none;" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
          </button>
        </div>
        <div class="modal-body">
            <div>
              <div>
                <p><h6>Start</h6> {{ Dates.getDate(event.start) + ' ' + Dates.getTime(event.start) }}</p>
                <p><h6>End</h6> {{ Dates.getDate(event.end) + ' ' + Dates.getTime(event.end) }}</p>
                <h6>Description</h6>
                <div>
                  <p class="max-lines">{{ event.description }}</p>
                </div>
                <h6>Organizer</h6>
                <div>
                  <p class="max-lines mb-0">{{ event.organizer.name + ' ' +event.organizer.surname }} </p>
                  <a href="mailto:{{event.organizer.email}}" class="max-lines"> {{ event.organizer.email }}</a>
                </div>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="dismiss">Dismiss</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>