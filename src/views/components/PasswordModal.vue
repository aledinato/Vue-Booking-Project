<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import setParams from "@/plugins/axios";

const store = useStore()
setParams(store.getters.getToken)

  let isLoading = ref(false)

  let errors = reactive({password: '', passwordConfirmation: ''})
  let password = ref('')
  let passwordConfirmation = ref('')

  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  function checkForm(){
    if(password.value === ''){
      errors.password = 'Password is required'
    }else if(password.value.length < 6){
      errors.password = 'Password must be at least 6 characters long'
    }else{
      errors.password = ''
    }
    if(passwordConfirmation.value === ''){
      errors.passwordConfirmation = 'Password confirmation is required'
    }else if(password.value !== passwordConfirmation.value){
      errors.password = 'Passwords do not match'
      errors.passwordConfirmation = 'Passwords do not match'
    }else{
      errors.passwordConfirmation = ''
    }
    return errors.password === '' && errors.passwordConfirmation === ''
  }

  function changePassword(){
    if(!checkForm()){
      return
    }

    isLoading.value = true
    axios.patch('api/users/resetPassword/' + store.getters.getUser.id, {password: password.value}).then(() => {
      password.value = ''
      passwordConfirmation.value = ''
      alert('Password changed successfully')
    }).catch(error => {
      alert(error.response.data)
    }).finally(() => {
      isLoading.value = false
    })

  }
</script>

<template>
  <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="passwordModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <form @submit.prevent="changePassword">
          <div class="modal-header">
            <h4 class="modal-title" id="passwordModalTitle">Change password</h4>
            <button type="button" class="close border-0" style="background:none;" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-outline mb-1">
                <label class="form-label" for="password">Password</label>
                <input v-model="password" type="password" name="password" class="form-control" />
                <div v-if="errors.password !== ''" class="alert-danger">
                  <p class="text-danger">{{errors.password}}</p>
                </div>
              </div>

              <div class="form-outline mb-1">
                <label class="form-label" for="passwordConfirmation">Password confirmation</label>
                <input v-model="passwordConfirmation" type="password" name="passwordConfirmation" class="form-control" />
                <div v-if="errors.passwordConfirmation !== ''" class="alert-danger">
                  <p class="text-danger">{{errors.passwordConfirmation}}</p>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="isLoading" class="btn btn-primary btn-block" type="submit" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span class="sr-only">Loading...</span>
            </button>
            <button v-else type="submit" class="btn btn-primary">Change</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>