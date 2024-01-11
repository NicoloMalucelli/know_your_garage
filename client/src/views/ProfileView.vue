<template>
  <Header selected_item="my_profile"></Header>
  <div class="d-flex justify-content-center align-items-center mt-5 w-100">
    <div class="my-card d-flex justify-content-center align-items-center flex-column" style="background-color: #9de3f5">
      <img style="height: 100px" src="../assets/user.png">
      <h1>{{user.name}} {{user.surname}}</h1>
      <p>{{user.email}}</p>

      <form @submit.prevent="submitForm" v-if="show_change_password_form" class="d-flex justify-content-center align-items-center flex-column">
        <input type="password" class="form-control mb-3 my-input text-center" autocomplete="on" v-model="old_pw" placeholder="old password">
        <input type="password" class="form-control mb-3 my-input text-center" autocomplete="on" v-model="new_pw" placeholder="new password">
        <input type="password" class="form-control mb-3 my-input text-center" autocomplete="on" v-model="new_pw_confirm" placeholder="confirm new password">

        <div class="d-flex">
          <button class="btn btn-primary mx-1" @click="changePassword">save</button>
          <button class="btn btn-danger mx-1" @click="show_change_password_form=false">cancel</button>
        </div>

        <transition name="fade">
          <div class="mt-1" style="color: #b81421" v-if="change_pw_error">{{error_text}}</div>
        </transition>

      </form>
      <div v-if="!show_change_password_form" class="d-flex mb-3 mt-5">
        <button class="btn btn-primary" @click="showForm" style="width: 48%; margin-right: 4%" >change password</button>
        <button class="btn btn-danger" @click="logout" style="width: 48%">logout</button>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import sha256 from 'crypto-js/sha256';
export default defineComponent({
  name: "Profile",
  data(){
    return{
      user: "",
      show_change_password_form: false,
      change_pw_error: false,
      error_text: "",
      old_pw: "",
      new_pw: "",
      new_pw_confirm: ""
    }
  },
  methods: {
    logout(){
      sessionStorage.removeItem("email")
      this.$router.push({name: 'login'})
    },
    displayError(text){
      this.error_text = text
      this.change_pw_error = true
      setTimeout(() => {
        this.change_pw_error = false
      }, 2000)
    },
    showForm(){
      this.show_change_password_form = true
      this.old_pw = ""
      this.new_pw_confirm = ""
      this.new_pw = ""
    },
    changePassword(){
      if(this.user.password !== sha256(this.old_pw).toString()){
        this.displayError("the old password is incorrect")
        return
      }
      if(this.new_pw_confirm !== this.new_pw){
        this.displayError("the two passwords don't match")
        return
      }
      axios.patch('http://localhost:3000/users/' + sessionStorage.getItem("email"), {"password": sha256(this.new_pw).toString()}).then((response) =>{
        this.user.password = sha256(this.new_pw).toString()
        this.show_change_password_form = false
      }).catch(error => {
        if(error.response){
          this.displayError(error.response.data.error)
        }
      })
    }
  },
  components: {Header},
  mounted() {
    axios.get('http://localhost:3000/users/' + sessionStorage.getItem("email")).then(response => {
      this.user = response.data;
    })
  }
});

</script>

<style scoped>

.my-card{
  #height: 550px;
  #aspect-ratio: 4/5;
  width: 400px;
  min-height: 500px;
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