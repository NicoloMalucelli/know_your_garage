<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background-color: #9de3f5">
    <div class="my-card" style="">
      <img class="w-100 mb-5 d-flex flex-column" src="../assets/logo.png">
      <input type="email" class="form-control mb-3 mt-3 my-input" v-model="email" placeholder="name@example.com">
      <input type="password" class="form-control mb-3 my-input" v-model="password" placeholder="password">
      <button class="btn btn-lg btn-primary my-input" @click="login()">Sign in</button>

      <div class="mt-2" style="font-size:12px">
        Don't you have an account? <a href="google.com"> Register </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView"
}
</script>

<style scoped>

.my-card{
  height: 550px;
  width: 400px;
  border-radius: 50px;
  padding: 30px 30px;
  background-color: #f0f0f0;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
}

.my-input{
  border-radius: 10px;
  box-shadow: 2px 5px 10px 0px #b0b0b0;
}

</style>