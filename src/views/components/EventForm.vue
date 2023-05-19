<script setup>
import {reactive, ref} from "vue";
import axios from "axios";

const emit = defineEmits(['updated','created'])
let props=defineProps({
  event: {
    type: Object,
    default: {
      id: null,
      title: '',
      description: '',
      maxPartecipants: 0,
      start: '',
      end: ''
    }
  }
})

let isLoading = ref(false)

let errors = reactive({title: '', description: '', start: '', end: '', maxParticipants: ''})

function save(){
  if(!checkForm()){
    return
  }

  isLoading.value = true
  if (props.event.id === null) {
    addEvent()
  } else {
    updateEvent()
  }
}

function updateEvent(){
  axios.put('api/events/' + props.event.id, {
    title: props.event.title,
    description: props.event.description,
    maxParticipants: props.event.maxPartecipants,
    start: props.event.start,
    end: props.event.end
  }).catch(error => {
    alert(error.response.data)
  }).then((response) => {
    emit('updated',response.data)
  }).finally(() => {
    isLoading.value = false
  })
}

function addEvent(){
  axios.post('api/events',{
    title: props.event.title,
    description: props.event.description,
    maxParticipants: props.event.maxPartecipants,
    start: props.event.start,
    end: props.event.end
  }).catch(error => {
    alert(error.response.data)
  }).then(() => {
    props.event.id = null
    props.event.title = ''
    props.event.description = ''
    props.event.maxPartecipants  = 10
    props.event.start = ''
    props.event.end = ''

    alert('Event created successfully')

    emit('created')
  }).finally(() => {
    isLoading.value = false
  })
}

function checkForm(){
  if(props.event.title === ''){
    errors.title = 'Surname is required'
  }else{
    errors.title = ''
  }

  let startDate = new Date(props.event.start)
  if(startDate <= new Date()) {
    errors.start = "Start date can't be in the past"
  }else{
    errors.start = ''
  }
  let endDate = new Date(props.event.end)
  if(endDate <= new Date()) {
    errors.end = "End date can't be in the past"
  }else if(endDate < startDate){
    errors.end = "End date can't be before start date"
  }else if(startDate > endDate){
    errors.start = "Start date can't be after end date"
  }else{
    errors.end = ''
  }
  if(props.event.description === '') {
    errors.description = 'Description is required'
  }else{
    errors.description = ''
  }
  if(props.event.maxPartecipants  === '') {
    errors.maxParticipants = 'Max participants is required'
  }else if(props.event.maxPartecipants < 1) {
    errors.maxParticipants = 'Max participants must be at least 1'
  }else{
    errors.description = ''
  }
  return errors.description === '' && errors.end === '' && errors.start === '' && errors.title === '' && errors.maxParticipants === ''
}
</script>

<template>
  <form @submit.prevent="save">

    <div class="form-outline mb-1">
      <label class="form-label" for="title">Title</label>
      <input v-model="event.title" type="text" name="title" class="form-control" />
      <div v-if="errors.title !== ''" class="alert-danger">
        <p class="text-danger">{{errors.title}}</p>
      </div>
    </div>

    <div class="form-outline mb-1">
      <label class="form-label" for="start">Start</label>
      <input v-model="event.start" type="datetime-local" name="start" class="form-control" />
      <div v-if="errors.start !== ''">
        <p class="text-danger">{{errors.start}}</p>
      </div>
    </div>

    <div class="form-outline mb-1">
      <label class="form-label" for="end">End</label>
      <input v-model="event.end" type="datetime-local" name="end" class="form-control"/>
      <div v-if="errors.end !== ''">
        <p class="text-danger">{{errors.end}}</p>
      </div>
    </div>

    <div class="form-outline mb-1">
      <label class="form-label" for="maxParticipants">Max participants</label>
      <input v-model="event.maxPartecipants " type="number" name="maxParticipants" class="form-control" />
      <div v-if="errors.maxParticipants !== ''" class="alert-danger">
        <p class="text-danger">{{errors.maxParticipants}}</p>
      </div>
    </div>

    <div class="form-outline mb-1">
      <label class="form-label" for="description">Description</label>
      <textarea v-model="event.description" name="description" class="form-control" />
      <div v-if="errors.description !== ''" class="alert-danger">
        <p class="text-danger">{{errors.description}}</p>
      </div>
    </div>

    <div class="pt-1 mb-3">
      <button class="btn btn-primary mt-3 px-4" :class="{ disabled:isLoading}" type="submit">{{ event.id === null ? 'Create' : 'Edit' }}</button>
    </div>
  </form>
</template>

<style scoped>

</style>