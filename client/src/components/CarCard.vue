<template>
  <div class="car-card row d-flex" style="">
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
      <p><strong>Status:</strong> not parked</p>
      <p><strong>Active pass:</strong> none</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarCard",
  props: ['car'],
  methods:{
    getPath(){
      return require("@/assets/cars/" + this.car.pic)
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