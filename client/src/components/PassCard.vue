<template>
  <div v-if="visible" class="d-inline-block">
    <div v-if="mode === 'read'" class="pass-card d-flex justify-content-center flex-column align-items-center pb-2">
      <p class="mt-4"><strong>{{pass.title}}</strong></p>
      <p style="font-size: 40px"> {{pass.duration}} giorni </p>
      <p style="font-size: 40px"> {{pass.cost}} €</p>
      <div v-if="editable">
        <Bin class="mx-3" @click="askForDeletion" style="height: 40px; width: 40px"></Bin>
        <img class="mx-3" @click="mode = 'edit'" src="../assets/edit.png" style="height: 30px; width: 30px; cursor: pointer">
      </div>
    </div>

    <form v-if="mode === 'edit'" class="pass-card d-flex justify-content-center flex-column align-items-center pb-2" @submit.prevent="submitForm">
      <p class="mt-4"><strong>{{pass.title}}</strong></p>
      <p style="font-size: 40px"> {{pass.duration}} giorni </p>

      <div class="d-flex justify-content-center align-items-center mb-3">
        <input type="number" v-model="cost" min="0" style="font-size: 30px; width: 50%; text-align: center">
      <p style="font-size: 40px; margin-bottom: 0; margin-left: 10px"> €</p>
      </div>

      <div>
        <Bin class="mx-3" @click="mode = 'read'" style="height: 40px; width: 40px"></Bin>
        <img class="mx-3" @click="update" src="../assets/save.png" style="height: 33px; width: 33px; cursor: pointer">
      </div>
    </form>

    <div @click="mode = 'creation'" v-if="mode === 'create'" class="pass-card d-flex justify-content-center flex-column align-items-center pb-2" style="cursor: pointer">
      <p style="font-size: 100px"><strong>+</strong></p>
    </div>

    <form v-if="mode === 'creation'" class="pass-card d-flex flex-column align-items-center pb-2" @submit.prevent="submitForm">
      <form class="my-4">
        <input type="text" v-model="passName" placeholder="Pass title" style="text-align: center"/>

        <div class="row mt-3 mb-3 d-flex justify-content-center align-items-center mx-4">
          <input class="col-6 d-flex justify-content-center" v-model="cost" type="number" min="0" style="font-size: 30px; width: 50%; text-align: center">
          <p class="col-6 d-flex justify-content-center" style="font-size: 30px; margin-bottom: 0;"> €</p>
        </div>

        <div class="row mb-4 d-flex justify-content-center align-items-center mx-4">
          <input class="col-6 d-flex justify-content-center" v-model="days" type="number" min="1" style="font-size: 30px; width: 50%; text-align: center">
          <p class="col-6 d-flex justify-content-center" style="font-size: 30px; margin-bottom: 0;"> days</p>
        </div>

        <div class="mt-5">
          <Bin class="mx-3" @click="mode = 'create'" style="height: 40px; width: 40px"></Bin>
          <img class="mx-3" @click="create" src="../assets/save.png" style="height: 30px; width: 30px; cursor: pointer">
        </div>

      </form>
    </form>
  </div>

</template>

<script>

import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "PassCard",
  components: {Bin},
  props: ['pass', 'initialMode', 'editable', 'garage'],
  data(){
    return{
      mode: this.initialMode,
      cost: "",
      days: "",
      passName: "",
      visible: true
    }
  },
  methods:{
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.pass.title + "\nfrom this garage?")){
        axios.patch('http://localhost:3000/passes/' + this.pass._id, {"visible": false}).then(() => {
          this.visible = false
        })
      }
    },
    update(){
      if(this.cost === ""){
        return;
      }
      axios.patch('http://localhost:3000/passes/' + this.pass._id, {"cost": this.cost}).then(() => {
        this.mode = 'read'
        this.pass.cost = this.cost
      })
    },
    create(){
      if(this.cost === "" || this.days === "" || this.passName === ""){
        return;
      }
      const body = {
        "owner": sessionStorage.getItem("email"),
        "garage": this.garage,
        "cost": this.cost,
        "title": this.passName,
        "duration": this.days,
      }
      axios.put('http://localhost:3000/passes', body).then((response) => {
        this.$emit('create', response.data)
        this.mode = 'create'
      })
    }
  }
}

</script>

<style scoped>

.pass-card{
  background-color: #b0b0b0;
  width: 250px;
  height: 300px;
  border-radius: 20px;
  box-shadow: 5px 10px 20px 0px #000000;
}

</style>