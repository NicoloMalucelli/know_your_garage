<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background-color: #9de3f5">
    <div class="my-card" style="">
      <form @submit.prevent="submitForm">
        <img class="w-100 mb-5 d-flex flex-column" src="../assets/logo.png">
        <input type="email" class="form-control mb-3 mt-3 my-input" v-model="email" placeholder="name@example.com">
        <input type="password" class="form-control mb-3 my-input" v-model="password" placeholder="password" autocomplete="on">
        <button class="btn btn-lg btn-primary my-input" :disabled="isDisable(email, password)" @click="login">Sign in</button>
      </form>
      <div class="mt-2" style="font-size:12px">
        Don't you have an account? <router-link to="/register"> Register </router-link>
      </div>
      <transition name="fade">
        <div class="mt-5" style="color: #b81421" v-if="login_error">{{error_text}}</div>
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
      login_error: false,
      error_text: ""
    }
  },
  methods:{
    login(){
      axios.get('http://localhost:3000/users/' + this.email).then(response => {
        const data = response.data;
        if(sha256(this.password).toString() === data.password){
          sessionStorage.setItem('username', data.username)
          sessionStorage.setItem('email', data.email)
          this.$router.push({name: 'home'})
        }else{
          this.displayError("Wrong email or password")
        }
      }).catch(error => {
        if(error.response){
          this.displayError(error.response.data.error)
        }
      })
    },
    displayError(text){
      this.error_text = text
      this.login_error = true
      setTimeout(() => {
        this.login_error = false
      }, 2000)
    },
    isDisable(){
      return this.email.length <= 0 || this.password.length <= 0
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>