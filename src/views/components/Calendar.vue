<script setup>
import Dates from "../../js/dates.js"
import EventModal from "@/views/components/EventModal.vue";
import {computed, ref} from "vue";

let selectedEvent = ref(null)

const emit = defineEmits(['deleteEvent','updatedEvent'])

const props=defineProps({
  selectedYearMonth: {
    type: String,
    default: new Date().getFullYear()+'-'+Dates.getMonth(new Date())
  },
  events: {
    type: Array,
    required: true
  }
})

let today = ref(new Date().getDate());
let todayMonth = ref(new Date().getMonth());

let selectedDay = ref(new Date().getDate())
let selectedMonth = computed(()=> parseInt(props.selectedYearMonth.substring(5,7))-1)
let selectedYear = computed(()=> parseInt(props.selectedYearMonth.substring(0,4)))

let selectedEvents = computed(()=>{
  let index=props.events.findIndex(e =>{
      return e.date === selectedYear.value+'-'+(selectedMonth.value+1)+'-'+selectedDay.value
  })
  return index === -1 ? [] : props.events[index].events
})

let daysNum = { 0:'Mon', 1:'Tue', 2:'Wed', 3:'Thu', 4:'Fri', 5:'Sat',6:'Sun' }

let firstDay = null
let daysInMonth = null

let days = computed(() => {
  let days = []

  let y=new Date(selectedYear.value, selectedMonth.value).getDay()
  firstDay = y === 0 ? 6 : y-1
  daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate()

  let j=0
  for(let i=0; i < daysInMonth + firstDay; i++){
    if(i<firstDay){
      days.push('-')
    }else{
      j++
      days.push(j)
    }
  }
  return days
})

function hasEvents(day){
  let index=props.events.findIndex(e =>{
    return e.date === selectedYear.value+'-'+(selectedMonth.value+1)+'-'+day
  })
  return index !== -1
}

function selectDay(day){
  selectedDay.value = day
}

function viewEvent(event){
  selectedEvent.value = event
}

function deleteEvent(event){
  emit('deleteEvent', event)
}

function getColumnDays(startDay){
  let x = []
  let i=parseInt(startDay)
  while(i<days.value.length){
    x.push(days.value[i])
    i=i+7
  }
  return x
}

</script>

<template>
  <EventModal @deleteEvent="deleteEvent" @updated-event="emit('updatedEvent')" :event="selectedEvent"></EventModal>
  <div class="container mt-5">
    <div class="row">
      <div class="col p-4 calendar">
        <div class="days d-flex justify-content-around text-center">
          <div v-for="index in Object.keys(daysNum)">
            <h6>{{ daysNum[index] }}</h6>
            <div class="day my-4 d-flex justify-content-center align-items-center" @click="selectDay(n)" :class="{'today':n===today && selectedMonth===todayMonth, 'selectedDay':n===selectedDay}" v-for="n in getColumnDays(index)">
              <div :class="{'fw-bold':hasEvents(n)}">{{ n }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-lg-4 shadow p-4 events">
        <h6>Events</h6>
        <ul class="list-group">
          <li v-for="event in selectedEvents" class="list-group-item d-flex justify-content-between align-items-center">
            {{ event.title +' '+ Dates.getTime(event.start)+' - '+Dates.getTime(event.end) }}
            <div>
              <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal" @click.prevent="viewEvent(event)" >
                <i class="bi bi-info-circle"></i>
              </button>
            </div>
          </li>
        </ul>
        <p v-if="selectedEvents.length===0">No events</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .calendar, .events{
    background-color: rgba(255, 255, 255, 0.95);
  }

  .calendar{
    border: 2px solid rgb(79 129 245 / 10%);
    border-radius: 10px;
    border-right: none;
  }

  .today{
    color: rgb(79 129 245);
  }

  .selectedDay{
    background: rgb(79 129 245 / 10%);
  }

  .calendar .days h6{
    color: rgb(79 129 245);
  }

  .calendar .day{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  .calendar .day:hover{
    background: rgb(79 129 245 / 10%);
  }
</style>