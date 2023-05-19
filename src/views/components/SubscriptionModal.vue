<script setup>
import axios from "axios";
import setParams from "@/plugins/axios";
import {useStore} from "vuex";
import {ref} from "vue";
const store = useStore()
setParams(store.getters.getToken)

const emits = defineEmits(['joined'])
let eventId = ref(null)
let isLoading = ref(false)

function join(){
  isLoading.value = true
  axios.post('api/bookings/' + eventId.value).then(() => {
    alert('Joined event')
    emits('joined')
  }).catch(error => {
    alert(error.response.data)
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="modal fade" id="subscriptionModal" tabindex="-1" role="dialog" aria-labelledby="subscriptionModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <form @submit.prevent="join">
          <div class="modal-header">
            <h4 class="modal-title" id="passwordModalTitle">Join event</h4>
            <button type="button" class="close border-0" style="background:none;" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
            </button>
          </div>
          <div class="modal-body">

            <div class="form-outline mb-1">
              <label class="form-label" for="eventId">Event id</label>
              <input v-model="eventId" type="number" name="eventId" class="form-control" />
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="isLoading" class="btn btn-primary btn-block" type="submit" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span class="sr-only">Loading...</span>
            </button>
            <button v-else type="submit" class="btn btn-primary">Join</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>