<template>
  <div class="car-card row d-flex" style="position: relative">
    <div class="col-4 justify-content-center align-items-center d-flex">
      <img :src="getPath()" style="width: 70%">
    </div>
    <div class="col-4 d-flex flex-column align-items-start justify-content-center">
      <p><strong>Model:</strong> {{car.model}} </p>
      <p><strong>License plate:</strong> {{car.license_plate}} </p>
      <p><strong>Color:</strong> {{car.color}} </p>
      <p><strong>Matriculation year:</strong> {{car.matriculation_year}} </p>
    </div>
    <div class="col-4 d-flex flex-column align-items-start justify-content-center">
      <div class="d-flex flex-column align-items-center">
        <p><strong>Status:</strong> not parked</p>
        <p><strong>Active pass:</strong> none</p>
        <Bin @click="askForDeletion" style="height:35px; width: 35px;"></Bin>
      </div>
    </div>
  </div>
</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "CarCard",
  components: {Bin},
  props: ['car'],
  methods:{
    getPath(){
      return require("@/assets/cars/" + this.car.pic)
    },
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.car.model + ", license plate " + this.car.license_plate + "\nfrom your cars?")){
        axios.delete('http://localhost:3000/cars/' + this.car.license_plate).then(() => {
          this.$emit("delete")
        })
      }
    }
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