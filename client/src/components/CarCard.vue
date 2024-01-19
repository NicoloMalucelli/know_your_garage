<template>
  <div v-if="visible">
    <div v-if="mode === 'read'" class="car-card row d-flex justify-content-center" style="position: relative">
      <div v-bind:class="additionalInfo ? 'col-4' : 'col-6'" class="justify-content-center align-items-center d-flex">
        <img :src="getPath()" style="width: 70%">
      </div>
      <div v-bind:class="additionalInfo ? 'col-4' : 'col-6'" class="d-flex flex-column align-items-start justify-content-center">
        <p><strong>Model:</strong> {{car.model}} </p>
        <p><strong>License plate:</strong> {{car.license_plate}} </p>
        <p><strong>Color:</strong> {{car.color}} </p>
        <p><strong>Matriculation year:</strong> {{car.matriculation_year}} </p>
      </div>
      <div v-if="additionalInfo" class="col-4 d-flex flex-column align-items-start justify-content-center">
        <div class="d-flex flex-column align-items-center">
          <p v-if="!parked"><strong>Status:<span style="color: #8c0808;"> not parked</span></strong></p>
          <p v-if="parked"><strong>Status:<span style="color: #107a03;"> parked</span></strong></p>
          <p><strong>Active pass:</strong> none</p>
          <Bin @click="askForDeletion" style="height:35px; width: 35px;"></Bin>
        </div>
      </div>
    </div>

    <form v-if="mode === 'creation'" class="car-card row d-flex" style="position: relative">
      <div class="col-4 justify-content-center align-items-center d-flex">
        <img @click="dec_index" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
        <img :src="getPathCreation(shown_image)" style="width: 70%; margin: 0px 10px">
        <img @click="inc_index" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
      </div>
      <div class="col-4 d-flex flex-column align-items-start justify-content-center">
        <input type="text" class="form-control my-input" style="width: 60%; margin-bottom: 10px" v-model="model" placeholder="model">
        <input type="text" class="form-control my-input" style="width: 60%; margin-bottom: 10px" v-model="license_plate" placeholder="license plate">
        <input type="text" class="form-control my-input" style="width: 60%; margin-bottom: 10px" v-model="color" placeholder="color">
        <input type="number" class="form-control my-input" style="width: 60%; margin-bottom: 10px" v-model="year" placeholder="year">
      </div>
      <div class="col-4 d-flex flex-column align-items-center justify-content-center">
        <Bin class="mb-4" style="height:35px; width: 35px;" @click="mode = 'create'"></Bin>
        <img @click="registerCar" v-if="isFormSubmittable(model, license_plate, color, year)" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
        <p v-if="registration_error" style="color: #b81421">License plate already in use</p>
      </div>
    </form>

    <button v-if="mode === 'create'" @click="mode = 'creation'" class="d-flex add-car-card justify-content-center align-items-center">
      + add a new car
    </button>

  </div>
</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "CarCard",
  components: {Bin},
  props: ['car', 'initialMode', 'additionalInfo'],
  data(){
    return{
      mode: this.initialMode,
      shown_image: 1,
      model: "",
      license_plate: "",
      color: "",
      year: "",
      registration_error: false,
      visible: true,
      parked: false
    }
  },
  methods:{
    getPath(){
      return new URL('../assets/cars/' + this.car.pic, import.meta.url).href//require("@/assets/cars/" + this.car.pic)
    },
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.car.model + ", license plate " + this.car.license_plate + "\nfrom your cars?")){
        axios.delete('http://localhost:3000/cars/' + this.car.license_plate).then(() => {
          this.visible = false
        })
      }
    },
    getPathCreation() {
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
        this.mode = 'create'
        this.model = ""; this.license_plate = ""; this.color = ""; this.year = "";
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
  },
  mounted() {
    if(this.car === undefined || this.car == null){
      return
    }
    axios.get('http://localhost:3000/parkings/' + this.car._id.toString()).then((response) => {
      this.parked = response.data.filter(p => p.end == null).length !== 0
    })
  }
}

</script>

<style scoped>

.car-card{
  display: block;
  background-color: #9de3f5;
  height: 30vh;
  min-height: 200px;
  min-width: 650px;
  width: 50vw;
  border-radius: 30vh;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
}

</style>