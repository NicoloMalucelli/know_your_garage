<template>
  <form class="garage-card d-flex flex-column align-items-center" style="position: relative">
    <input type="text" class="form-control my-input mb-2" v-model="garageName" placeholder="name" style="width: 200px; text-align: center">
    <div class="d-flex mb-2">
      <input type="number" class="form-control my-input" v-model="latitude" placeholder="latitude" style="width: 200px; text-align: center">
      <input type="number" class="form-control my-input" v-model="longitude" placeholder="longitude" style="width: 200px; text-align: center">
    </div>
    <input type="number" class="form-control my-input mb-2" v-model="slots" placeholder="number of slots" style="width: 200px; text-align: center">

    <div class="d-flex justify-content-center align-items-center">
      <Bin @click="cancel" style="height:35px; width: 35px; margin-right: 30px"></Bin>
      <img @click="registerGarage" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
    </div>
  </form>
</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "GarageCreationCard",
  data() {
    return {
      garageName: "",
      latitude: "",
      longitude: "",
      slots: ""
    }
  },
  components: {Bin},
  methods: {
    cancel() {
      this.$emit("cancel")
    },
    isFormSubmittable() {
      return this.garageName.length > 0 && Math.abs(this.latitude) <= 90 && Math.abs(this.longitude) <= 180 && this.slots >= 0
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
      axios.put('http://localhost:3000/parkings', body).then((response) => {
        this.$emit("newGarageRegistered", response.data)
      })
    }
  }
}

</script>

<style scoped>

.garage-card{
  display: block;
  background-color: #9de3f5;
  min-width: 650px;
  max-width: 800px;
  width: 50vw;
  border-radius: 30vh;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
  padding: 10px 0;
}

</style>