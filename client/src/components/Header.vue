<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 20vh; background-color: #9de3f5; min-height: 100px">
    <img src="../assets/logo.png" style="height: 70%">
  </div>
  <div class="d-flex justify-content-center align-items-center my-navbar-container" style="width: 100vw">
    <div class="my-navbar row" style="">
      <div :style="{color: updateColor('history')}" class="d-flex align-items-center justify-content-center" style="width: 15%; border-radius: max(4vh, 40px) 0px 0px max(4vh, 40px)"> History </div>
      <div :style="{color: updateColor('find_a_parking_lot')}" class="d-flex align-items-center justify-content-center" style="width: 15%"> Find a parking lot </div>
      <div :style="{color: updateColor('idk')}" class="d-flex align-items-center justify-content-center" style="width: 15%"> ??? </div>
      <div :style="{color: updateColor('home')}" class="d-flex align-items-center justify-content-center" style="height: 100%; width: 10%" @click="goToHome()">
        <img src="../assets/home_black.png" v-if="selected_item !== 'home'" style="height: 35%">
        <img src="../assets/home_white.png" v-if="selected_item === 'home'" style="height: 35%">
      </div>
      <div :style="{color: updateColor('my_pass')}" class="d-flex align-items-center justify-content-center" style="width: 15%"> My pass </div>
      <div :style="{color: updateColor('my_cars')}" class="d-flex align-items-center justify-content-center" style="width: 15%" @click="goToMyCars()"> My cars </div>
      <div :style="{color: updateColor('my_profile')}" class="d-flex align-items-center justify-content-center" style="width: 15%; border-radius: 0px max(4vh, 40px) max(4vh, 40px) 0px"> My profile </div>
      <!--
      <div class="col-2 d-flex align-items-center justify-content-center" style="border-radius: max(4vh, 27px) 0px 0px max(4vh, 27px)"> My profile</div>
      <div class="col-3 d-flex align-items-center justify-content-center" style=""> My cars </div>
      <div class="col-2 d-flex align-items-center justify-content-center" style=""> Home </div>
      <div class="col-3 d-flex align-items-center justify-content-center" style=""> find a parking lot </div>
      <div class="col-2 d-flex align-items-center justify-content-center" style="border-radius: 0px max(4vh, 27px) max(4vh, 27px) 0px"> history </div>
      -->
    </div>
  </div>
</template>

<script>

import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: ['selected_item'],
  methods: {
    updateColor(id){
      if(id === this.selected_item){
        return "#f0f0f0";
      }
      return "#000000";
    },
    goToMyCars(){
      this.$router.push({name: 'my_cars'})
    },
    goToHome(){
      this.$router.push({name: 'home'})
    }
  },
  mounted() {
    if (sessionStorage.getItem('email') === null) {
      this.$router.push('/login')
    }
  }
});

</script>

<style scoped>

.my-navbar{
  background-color: #1b9fda;
  height: 8vh;
  width: 50vw;
  border-radius: max(4vh, 40px);
  min-width: 460px;
  min-height: 80px;
  box-shadow: 2px 5px 10px 0px #b0b0b0;
}

.my-navbar-container{
  background-image:
      linear-gradient(
          to bottom,
          #9de3f5,
          #9de3f5 50%,
          #f0f0f0 50%,
          #f0f0f0 100%
      );
}

.my-navbar > :not(:last-child) {
  border-right: 1px solid #188fc4
}

.my-navbar > :hover {
  background-color: #1ca6e6;
}

</style>