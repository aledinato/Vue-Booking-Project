<script setup>
import Dates from "../../js/dates.js"
import {computed} from "vue";
import EventForm from "@/views/components/EventForm.vue";

const props=defineProps({
  event: {
    type: Object,
    default: null
  }
})


let participantsLink = computed(()=>{
  return '/events/'+props.event.id+'/participants'
})

const emit = defineEmits(['deleteEvent','updatedEvent'])

function deleteEvent(event){
  if (confirm('Are you sure you want to delete this event?')) {
    emit('deleteEvent',event)
  }else{
    console.log(props.event)
  }
}

function updatedEvent(event){
  emit('updatedEvent',event)
}
</script>

<template>
  <div ref="modal" class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalTitle" aria-hidden="true">
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
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Info</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit" type="button" role="tab" aria-controls="edit" aria-selected="false">Edit</button>
            </li>
          </ul>
          <div class="tab-content p-4" id="myTabContent">
            <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
              <div>
                <p><h6>ID</h6> {{ event.id}}</p>
                <p><h6>Start</h6> {{ Dates.getDate(event.start) + ' ' + Dates.getTime(event.start) }}</p>
                <p><h6>End</h6> {{ Dates.getDate(event.end) + ' ' + Dates.getTime(event.end) }}</p>
                <h6>Description</h6>
                <div>
                  <p class="max-lines">{{ event.description }}</p>
                </div>
                <h6>Max participants</h6>
                <div>
                  <p class="max-lines">{{ event.maxPartecipants }}</p>
                </div>
                <div>
                  <router-link :to="participantsLink">
                    <button data-bs-dismiss="modal" class="btn btn-primary position-relative">
                      Participants
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ event.nPartecipants }}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="edit" role="tabpanel" aria-labelledby="edit-tab">
              <EventForm :event="event" @updated="updatedEvent"></EventForm>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteEvent(event)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>