<template>
  <div v-if="visible">

    <div v-if="mode === 'read'" class="garage-card  flex-column">
      <p><strong>{{garage.name}}</strong></p>

      <div>
        <p>position: ({{garage.latitude}}, {{garage.longitude}})</p>
      </div>

      <div class="row">
        <p class="col-4">total slots: {{garage.slots}}</p>
        <p class="col-4">slots occupied: xxx</p>
        <p class="col-4" v-if="garage.passes === undefined"></p>
        <p class="col-4" v-if="garage.passes !== undefined">active passes: {{garage.passes.length}}</p>
      </div>

      <div v-if="!readOnly" class="d-flex justify-content-center align-items-center">
        <Bin @click="askForDeletion" style="height:35px; width: 35px; margin-right: 30px"></Bin>
        <img @click="mode = 'edit'" src="../assets/edit.png" style="height:23px; width: 23px; padding: 0; cursor: pointer">
      </div>
    </div>

    <form v-if="mode === 'edit'" class="garage-card d-flex flex-column align-items-center" style="position: relative">
      <p class="mb-2"><strong>{{garage.name}}</strong></p>

      <div class="d-flex">
        <p style="margin-bottom: 0; width: 200px; text-align: center">latitude</p>
        <p style="margin-bottom: 0; width: 200px; text-align: center">longitude</p>
      </div>
      <div class="d-flex mb-2">
        <input type="number" class="form-control my-input" v-model="latitude" placeholder="latitude" style="width: 200px; text-align: center">
        <input type="number" class="form-control my-input" v-model="longitude" placeholder="longitude" style="width: 200px; text-align: center">
      </div>
      <p style="margin-bottom: 0; text-align: center">slots</p>
      <input type="number" class="form-control my-input mb-2" v-model="slots" placeholder="number of slots" style="width: 200px; text-align: center">

      <div class="d-flex justify-content-center align-items-center">
        <Bin @click="mode = 'read'; resetTextBoxes()" style="height:35px; width: 35px; margin-right: 30px"></Bin>
        <img @click="updateGarage" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
      </div>
    </form>

    <form v-if="mode === 'creation'" class="garage-card d-flex flex-column align-items-center" style="position: relative">
      <input type="text" class="form-control my-input mb-2" v-model="garageName" placeholder="name" style="width: 200px; text-align: center">
      <div class="d-flex mb-2">
        <input type="number" class="form-control my-input" v-model="latitude" placeholder="latitude" style="width: 200px; text-align: center">
        <input type="number" class="form-control my-input" v-model="longitude" placeholder="longitude" style="width: 200px; text-align: center">
      </div>
      <input type="number" class="form-control my-input mb-2" v-model="slots" placeholder="number of slots" style="width: 200px; text-align: center">

      <div class="d-flex justify-content-center align-items-center">
        <Bin @click="mode = 'create'; resetTextBoxes()" style="height:35px; width: 35px; margin-right: 30px"></Bin>
        <img @click="registerGarage" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
      </div>
    </form>

    <button v-if="mode === 'create'" @click="mode = 'creation'" class="d-flex add-car-card justify-content-center align-items-center">
      + add a new garage
    </button>

  </div>

</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";
import {isVisible} from "bootstrap/js/src/util";

export default {
  name: "GarageCard",
  components: {Bin},
  props: ['garage', 'readOnly', 'initialMode'],
  data(){
    return{
      mode: this.initialMode,
      garageName: "",
      latitude: "",
      longitude: "",
      slots: "",
      visible: true
    }
  },
  methods:{
    isVisible,
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.garage.name + "\nfrom your garages?")){
        axios.delete('http://localhost:3000/garages/' + sessionStorage.getItem("email") + "/" + this.garage.name).then(() => {
          this.visible = false
        })
      }
    },
    isFormSubmittable() {
      return this.garageName.length > 0 && Math.abs(this.latitude) <= 90 && Math.abs(this.longitude) <= 180 && this.slots > 0
    },
    registerGarage() {
      if(!this.isFormSubmittable(this.garageName, this.latitude, this.longitude, this.slots)){
        return
      }
      const body = {
        'owner': sessionStorage.getItem("email"),
        'name': this.garageName,
        'latitude': this.latitude,
        'longitude': this.longitude,
        'slots': this.slots
      }
      axios.put('http://localhost:3000/garages', body).then((response) => {
        this.mode = 'create'
        this.resetTextBoxes()
        this.$emit("newGarageRegistered", response.data)
      })
    },
    updateGarage(){
      if(!this.isFormSubmittable(this.latitude, this.longitude, this.slots)){
        return
      }
      const body = {
        'latitude': this.latitude,
        'longitude': this.longitude,
        'slots': this.slots
      }
      axios
          .patch('http://localhost:3000/garages/' + sessionStorage.getItem("email") + "/" + this.garage.name, body).then((response) => {
        this.garage = response.data
      })
    },
    resetTextBoxes(){
      this.latitude = ""; this.longitude = ""; this.slots = ""; this.garageName = "";
    }
  },
}

</script>

<style scoped>

.garage-card{
  display: block;
  background-color: #9de3f5;
  min-width: 450px;
  max-width: 650px;
  width: 80%;
  border-radius: 30vh;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
  padding: 20px 50px;
}

</style>