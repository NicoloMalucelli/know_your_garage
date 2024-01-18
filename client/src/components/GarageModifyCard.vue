<template>
  <form class="garage-card d-flex flex-column align-items-center" style="position: relative">
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
      <Bin @click="cancel" style="height:35px; width: 35px; margin-right: 30px"></Bin>
      <img @click="save" src="../assets/save.png" style="height:27px; width: 27px; padding: 0; cursor: pointer">
    </div>
  </form>
</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "GarageModifyCard",
  data() {
    return {
      latitude: this.garage.latitude,
      longitude: this.garage.longitude,
      slots: this.garage.slots
    }
  },
  components: {Bin},
  props: ['garage'],
  methods: {
    cancel() {
      this.$emit("cancel")
    },
    isFormSubmittable() {
      return Math.abs(this.latitude) <= 90 && Math.abs(this.longitude) <= 180 && this.slots >= 0
    },
    save() {
      if(!this.isFormSubmittable(this.latitude, this.longitude, this.slots)){
        return
      }
      const body = {
        'latitude': this.latitude,
        'longitude': this.longitude,
        'slots': this.slots
      }
      axios
          .patch('http://localhost:3000/parkings/' + sessionStorage.getItem("email") + "/" + this.garage.name, body).then((response) => {
        this.$emit("save", response.data)
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