<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 20vh; background-color: #9de3f5; min-height: 100px">
    <img src="../assets/logo_admin.png" style="height: 70%">
  </div>
  <div class="d-flex justify-content-center align-items-center my-navbar-container" style="width: 100%; cursor: pointer">
    <div class="my-navbar row" style="">
      <div :style="{color: updateColor('analytics')}" class="d-flex align-items-center justify-content-center" style="width: 21%; border-radius: max(4vh, 40px) 0px 0px max(4vh, 40px)" @click="$router.push({name: 'admin_analytics'})"> Analytics </div>
      <div :style="{color: updateColor('manage_pass')}" class="d-flex align-items-center justify-content-center" @click="$router.push({name: 'admin_passes'})" style="width: 21%"> Manage passes </div>
      <div :style="{color: updateColor('home')}" class="d-flex align-items-center justify-content-center" style="height: 100%; width: 16%" @click="$router.push({name: 'admin_home'})">
        <img src="../assets/home_black.png" v-if="selected_item !== 'home'" style="height: 35%">
        <img src="../assets/home_white.png" v-if="selected_item === 'home'" style="height: 35%">
      </div>
      <div :style="{color: updateColor('real_time')}" class="d-flex align-items-center justify-content-center" style="width: 21%" @click="$router.push({name: 'admin_real_time'})"> Real-time  </div>
      <div @click="$router.push({name: 'admin_profile'})" :style="{color: updateColor('my_profile')}" class="d-flex align-items-center justify-content-center" style="width: 21%; border-radius: 0px max(4vh, 40px) max(4vh, 40px) 0px"> My profile </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminHeader",
  props: ['selected_item'],
  methods: {
    updateColor(id){
      if(id === this.selected_item){
        return "#f0f0f0";
      }
      return "#000000";
    }
  },
  mounted() {
    if (sessionStorage.getItem('role') !== "admin") {
      this.$router.push('/admin/login/')
    }
  }
});

</script>

<style scoped>

.my-navbar{
  background-color: #1b9fda;
  height: 8vh;
  width: 40vw;
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