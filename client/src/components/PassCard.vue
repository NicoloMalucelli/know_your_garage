<template>
  <div class="">
    <div v-if="!edit" class="pass-card d-flex justify-content-center flex-column align-items-center pb-2">
      <p class="mt-4"><strong>{{pass.title}}</strong></p>
      <p style="font-size: 40px"> {{pass.duration}} giorni </p>
      <p style="font-size: 40px"> {{pass.cost}} €</p>
      <div v-if="!readOnly">
        <Bin class="mx-3" @click="askForDeletion" style="height: 40px; width: 40px"></Bin>
        <img class="mx-3" @click="edit=true" src="../assets/edit.png" style="height: 30px; width: 30px; cursor: pointer">
      </div>
    </div>

    <div v-if="edit" class="pass-card d-flex justify-content-center flex-column align-items-center pb-2">
      <p class="mt-4"><strong>{{pass.title}}</strong></p>
      <p style="font-size: 40px"> {{pass.duration}} giorni </p>

      <div class="d-flex justify-content-center align-items-center mb-3">
      <input type="number" min="0" style="font-size: 30px; width: 50%; text-align: center">
      <p style="font-size: 40px; margin-bottom: 0; margin-left: 10px"> €</p>
      </div>

      <div v-if="!readOnly">
        <Bin class="mx-3" @click="edit=false" style="height: 40px; width: 40px"></Bin>
        <img class="mx-3" @click="update" src="../assets/save.png" style="height: 33px; width: 33px; cursor: pointer">
      </div>
    </div>
  </div>

</template>

<script>

import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "PassCard",
  components: {Bin},
  props: ['pass', 'readOnly'],
  data(){
    return{
      edit: true,
    }
  },
  methods:{
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.pass.title + "\nfrom this garage?")){
        axios.delete('http://localhost:3000/passes/' + this.pass.id).then(() => {
          this.$emit("delete")
        })
      }
    },
    update(){
      
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