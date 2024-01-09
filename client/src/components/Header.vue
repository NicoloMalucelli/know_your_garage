<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 20vh; background-color: #9de3f5; min-height: 100px">
    <img src="../assets/logo.png" style="height: 70%">
  </div>
  <div class="d-flex justify-content-center align-items-center my-navbar-container" style="width: 100vw">
    <div class="my-navbar row" style="">
      <div class="col-2 d-flex align-items-center justify-content-center" style="border-radius: 30px 0px 0px 30px"> My profile</div>
      <div class="col-3 d-flex align-items-center justify-content-center" style=""> My cars </div>
      <div class="col-2 d-flex align-items-center justify-content-center" style=""> Home </div>
      <div class="col-3 d-flex align-items-center justify-content-center" style=""> find a parking lot </div>
      <div class="col-2 d-flex align-items-center justify-content-center" style="border-radius: 0px 30px 30px 0px"> history </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});

</script>

<style scoped>

.my-navbar{
  background-color: #1b9fda;
  height: 8vh;
  width: 30vw;
  border-radius: 30px;
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
          #ffffff 50%,
          #ffffff 100%
      );
}

.my-navbar > :not(:last-child) {
  border-right: 1px solid #188fc4
}

.my-navbar > :hover {
  background-color: #1ca6e6;
}

</style>