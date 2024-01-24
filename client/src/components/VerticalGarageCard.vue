<template>
  <div v-if="visible">

    <div v-if="mode === 'read'" class="garage-card">
      <div style="height: 20%;">
        <p class="mb-0"><strong>{{garage.name}}</strong></p>
      </div>

      <div style="height: 60%;">
        <div class="">
          <p class="mb-1">coordinates:</p>
          <p class="mb-0">lng: {{garage.latitude}}</p>
          <p>lat: {{garage.latitude}}</p>
        </div>

        <div class="row mt-4">
          <p class="col-6">total slots: {{garage.slots}}</p>
          <p class="col-6">taken slots: {{freePlaces}}</p>
        </div>
      </div>

      <div v-if="!readOnly" class="d-flex justify-content-center align-items-end" style="height: 20%;">
        <Bin @click="askForDeletion" style="height:35px; width: 35px; margin-right: 30px"></Bin>
        <img @click="mode = 'edit'" src="../assets/edit.png" style="height:26px; width: 26px; padding: 0; cursor: pointer">
      </div>
    </div>

    <form v-if="mode === 'edit'" class="garage-card" style="position: relative">
      <div style="height: 20%">
        <p><strong>{{garage.name}}</strong></p>
      </div>
      <div style="height: 70%;" class="d-flex flex-column align-items-center">
        <div>
          <p class="mb-1">coordinates:</p>
          <input type="number" class="form-control my-input" v-model="latitude" placeholder="latitude" style="text-align: center">
          <input type="number" class="form-control my-input mt-2" v-model="longitude" placeholder="longitude" style="text-align: center">
        </div>

        <p class="mb-0 mt-3">total slots:</p>
        <input type="number" class="form-control my-input mb-2 w-50" v-model="slots" placeholder="number of slots" style="text-align: center">
      </div>

      <div class="d-flex justify-content-center align-items-end" style="height: 10%">
        <Bin @click="mode = 'read'; resetTextBoxes()" style="height:35px; width: 35px; margin-right: 30px"></Bin>
        <img @click="updateGarage" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
      </div>
    </form>

    <form v-if="mode === 'creation'" class="garage-card d-flex flex-column align-items-center" style="position: relative">
      <div style="height: 20%" class="d-flex justify-content-center align-items-center">
        <input type="text" class="form-control my-input mb-2" v-model="garageName" placeholder="name" style="width: 200px; text-align: center">
      </div>
      <div style="height: 70%;" class="d-flex flex-column align-items-center">
        <div>
          <p class="mb-1">coordinates:</p>
          <input type="number" class="form-control my-input" v-model="latitude" placeholder="latitude" style="text-align: center">
          <input type="number" class="form-control my-input mt-2" v-model="longitude" placeholder="longitude" style="text-align: center">
        </div>

        <p class="mb-0 mt-3">total slots:</p>
        <input type="number" class="form-control my-input mb-2 w-50" v-model="slots" placeholder="number of slots" style="text-align: center">
      </div>

      <div class="d-flex justify-content-center align-items-end" style="height: 10%">
        <Bin @click="mode = 'create'; resetTextBoxes()" style="height:35px; width: 35px; margin-right: 30px"></Bin>
        <img @click="registerGarage" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
      </div>
    </form>

    <button v-if="mode === 'create'" @click="mode = 'creation'" class="d-flex border-0 garage-card justify-content-center flex-column align-items-center">
      <p class="mb-0" style="font-size: xx-large"><strong>+</strong></p>
      <p><strong> add a new garage</strong></p>
    </button>

  </div>

</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";
import {isVisible} from "bootstrap/js/src/util";
import io from "socket.io-client";

export default {
  name: "VerticalGarageCard",
  components: {Bin},
  props: ['garage', 'readOnly', 'initialMode'],
  watch: {
    garage: function (newVal, oldVal){
      this.updateFreePlaces()
    }
  },
  data(){
    return{
      mode: this.initialMode,
      garageName: "",
      latitude: "",
      longitude: "",
      slots: "",
      visible: true,
      socket: io('localhost:3000'),
      freePlaces: ""
    }
  },
  methods:{
    isVisible,
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.garage.name + "\nfrom your garages?")){
        axios.patch('http://localhost:3000/garages/' + this.garage._id, {'visible': false}).then(() => {
          this.visible = false
        })
      }
    },
    registerGarage() {
      if(!(this.garageName.length > 0 && Math.abs(this.latitude) <= 90 && Math.abs(this.longitude) <= 180 && this.slots > 0)){
        return
      }
      const body = {
        'owner': sessionStorage.getItem("email"),
        'name': this.garageName,
        'latitude': this.latitude,
        'longitude': this.longitude,
        'slots': this.slots,
      }
      axios.put('http://localhost:3000/garages', body).then((response) => {
        this.mode = 'create'
        this.resetTextBoxes()
        this.$emit("newGarageRegistered", response.data)
      })
    },
    updateGarage(){
      if(!(Math.abs(this.latitude) <= 90 && Math.abs(this.longitude) <= 180 && this.slots > 0)){
        return
      }
      const body = {
        'latitude': this.latitude,
        'longitude': this.longitude,
        'slots': this.slots
      }
      axios.patch('http://localhost:3000/garages/' + this.garage._id, body).then((response) => {
        this.garage.latitude = this.latitude
        this.garage.longitude = this.longitude
        this.garage.slots = this.slots
        this.mode = "read"
        this.resetTextBoxes()
      })
    },
    resetTextBoxes(){
      this.latitude = ""; this.longitude = ""; this.slots = ""; this.garageName = "";
    },
    updateFreePlaces(){
      axios.get('http://localhost:3000/garages/realtime/' + this.garage._id).then((newCount) => {
        this.freePlaces = this.garage.slots - newCount.data
      })
    }
  },
  mounted() {
    if(this.garage !== undefined){
      this.updateFreePlaces()
      this.socket.on('free-slots-update', (garage) => {
        if(garage.id !== this.garage._id){
          return
        }
        this.updateFreePlaces()
      })
    }
  }
}

</script>

<style scoped>

.garage-card{
  display: block;
  background: rgb(157,227,245);
  background: linear-gradient(207deg, rgba(157,227,245,1) 68%, rgba(224,240,245,1) 100%);
  height: 350px;
  width: 250px;
  border-radius: 30px;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
  padding: 20px 25px;
}

</style>