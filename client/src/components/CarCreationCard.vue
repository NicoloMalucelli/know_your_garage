<template>
  <form class="car-card row d-flex" style="position: relative">
    <div class="col-4 justify-content-center align-items-center d-flex">
      <img @click="dec_index" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
      <img :src="getPath(shown_image)" style="width: 70%; margin: 0px 10px">
      <img @click="inc_index" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
    </div>
    <div class="col-4 d-flex flex-column align-items-start justify-content-center">
      <input type="text" class="form-control my-input" style="width: 60%; margin-bottom: 16px" v-model="model" placeholder="model">
      <input type="text" class="form-control my-input" style="width: 60%; margin-bottom: 16px" v-model="license_plate" placeholder="license plate">
      <input type="text" class="form-control my-input" style="width: 60%; margin-bottom: 16px" v-model="color" placeholder="color">
      <input type="number" class="form-control my-input" style="width: 60%; margin-bottom: 16px" v-model="year" placeholder="year">
    </div>
    <div class="col-4 d-flex flex-column align-items-center justify-content-center">
        <Bin class="mb-4" style="height:35px; width: 35px;" @click="cancel"></Bin>
        <img @click="registerCar" v-if="isFormSubmittable(model, license_plate, color, year)" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
        <p v-if="registration_error" style="color: #b81421">License plate already in use</p>
    </div>
  </form>
</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";
import sha256 from "crypto-js/sha256";

export default {
  name: "CarCreationCard",
  data(){
    return{
      shown_image: 1,
      model: "",
      license_plate: "",
      color: "",
      year: "",
      registration_error: false,
    }
  },
  components: {Bin},
  methods: {
    getPath() {
      return new URL('../assets/cars/car' + this.shown_image + ".png", import.meta.url).href//require("@/assets/cars/car" + this.shown_image + ".png")
    },
    dec_index() {
      if(this.shown_image > 1) {
        this.shown_image -= 1
      }else{
        this.shown_image = 4
      }
    },
    inc_index() {
      if(this.shown_image < 4) {
        this.shown_image += 1
      }else{
        this.shown_image = 1
      }
    },
    cancel(){
      this.$emit("cancel")
    },
    isFormSubmittable(){
      return this.model.length > 0 && this.license_plate.length > 0 && this.color.length > 0 && this.year > 1980 && this.year <= 2024
    },
    registerCar(){
      const body = {
        'owner': sessionStorage.getItem("email"),
        'model': this.model,
        'license_plate': this.license_plate,
        'color': this.color,
        'matriculation_year': this.year,
        'pic': "car" + this.shown_image + ".png"}
      axios.put('http://localhost:3000/cars', body).then((response) => {
        this.$emit("newCarRegistered", response.data)
      }).catch(error => {
        this.displayError()
      })
    },
    displayError(){
      this.registration_error = true
      setTimeout(() => {
        this.registration_error = false
      }, 2000)
    },
  }
}

</script>

<style scoped>

.car-card{
  display: block;
  background-color: #9de3f5;
  height: 30vh;
  min-height: 250px;
  min-width: 650px;
  width: 50vw;
  border-radius: 30vh;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
}

</style>