<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 20vh; background-color: #9de3f5; min-height: 100px">
    <img src="../assets/logo.png" style="height: 70%">
  </div>
  <div class="d-flex justify-content-center align-items-center my-navbar-container" style="width: 100vw">
    <div class="my-navbar row" style="">
      <div class="d-flex align-items-center justify-content-center" style="width: 15%; border-radius: max(4vh, 27px) 0px 0px max(4vh, 27px)"> History </div>
      <div class="d-flex align-items-center justify-content-center" style="width: 15%"> Find a parking lot </div>
      <div class="d-flex align-items-center justify-content-center" style="width: 15%"> ??? </div>
      <div class="d-flex align-items-center justify-content-center" style="width: 10%" @click="goToHome()"> Home </div>
      <div class="d-flex align-items-center justify-content-center" style="width: 15%"> My memberships </div>
      <div class="d-flex align-items-center justify-content-center" style="width: 15%" @click="goToMyCars()"> My cars </div>
      <div class="d-flex align-items-center justify-content-center" style="width: 15%; border-radius: 0px max(4vh, 27px) max(4vh, 27px) 0px"> My profile </div>
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
  methods: {
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
  border-radius: max(4vh, 27px);
  min-width: 460px;
  min-height: 55px;
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