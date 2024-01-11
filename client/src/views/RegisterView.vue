<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background-color: #9de3f5">
    <div class="my-card" style="">
      <form @submit.prevent="submitForm">
        <img class="w-100 mb-5 d-flex flex-column" src="../assets/logo.png">
        <input type="email" class="form-control mb-3 mt-3 my-input" v-model="email" placeholder="name@example.com">
        <div class="d-flex mb-3 mt-3">
          <input type="text" class="form-control my-input" style="width: 48%; margin-right: 4%" v-model="u_name" placeholder="name">
          <input type="text" class="form-control my-input" style="width: 48%" v-model="u_surname" placeholder="surname">
        </div>
        <input type="password" class="form-control mb-3 my-input" autocomplete="on" v-model="password" placeholder="password">
        <input type="password" class="form-control mb-3 my-input" autocomplete="on" v-model="password_confirm" placeholder="password">
        <button class="btn btn-lg btn-primary my-input" @click="register" :disabled="isDisable(email, password, username, password_confirm)">Register</button>
      </form>
      <div class="mt-2" style="font-size:12px">
        Don you already have an account? <router-link to="/login"> Login </router-link>
      </div>
      <transition name="fade">
        <div class="mt-3" style="color: #b81421" v-if="registration_error">{{error_text}}</div>
      </transition>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import sha256 from 'crypto-js/sha256';
import {defineComponent} from "vue";
export default defineComponent({
  name: "LoginView",
  data(){
    return{
      email: "",
      password: "",
      u_name: "",
      u_surname: "",
      password_confirm: "",
      registration_error: false,
      error_text: ""
    }
  },
  methods:{
    register(){
      if(this.password !== this.password_confirm){
        this.displayError("The given passwords are different")
        return
      }
      const body = {'email': this.email, 'name': this.u_name, 'surname': this.u_surname, 'password': sha256(this.password).toString()}
      axios.put('http://localhost:3000/users', body)
        .then(() => {
          sessionStorage.setItem('email', this.email)
          this.$router.push('/')
        }).catch(error => {
          if(error.response){
            this.displayError(error.response.data.error)
          }
      })
    },
    displayError(text){
      this.error_text = text
      this.registration_error = true
      setTimeout(() => {
        this.registration_error = false
      }, 2000)
    },
    isDisable(){
      return this.email.length <= 0 || this.password.length <= 0 || this.u_name.length <= 0 || this.u_surname.length <= 0 || this.password_confirm.length <= 0
    }
  }
})

</script>

<style scoped>

.my-card{
  height: 550px;
  width: 400px;
  border-radius: 50px;
  padding: 30px 30px;
  background-color: #f0f0f0;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
}

.my-input{
  border-radius: 10px;
  box-shadow: 2px 5px 10px 0px #b0b0b0;
}

</style>