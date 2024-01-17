<template>
  <div class="garage-card  flex-column">
    <p><strong>{{garage.name}}</strong></p>

    <div>
      <p>position: ({{garage.latitude}}, {{garage.longitude}})</p>
    </div>

    <div class="row px-5 mx-3">
      <p class="col-4">total slots: {{garage.slots}}</p>
      <p class="col-4">slots occupied: xxx</p>
      <p class="col-4">active passes: xxx</p>
    </div>

    <div v-if="!readOnly" class="d-flex justify-content-center align-items-center">
      <Bin @click="askForDeletion" style="height:35px; width: 35px; margin-right: 30px"></Bin>
      <img @click="edit(garage)" src="../assets/edit.png" style="height:23px; width: 23px; padding: 0; cursor: pointer">
    </div>

  </div>
</template>

<script>
import Bin from "@/components/Bin.vue";
import axios from "axios";

export default {
  name: "GarageCard",
  components: {Bin},
  props: ['garage', 'readOnly'],
  methods:{
    askForDeletion(){
      if(window.confirm("Do you really want to remove:\n   - " + this.garage.name + "\nfrom your garages?")){
        axios.delete('http://localhost:3000/parkings/' + sessionStorage.getItem("email") + "/" + this.garage.name).then(() => {
          this.$emit("delete")
        })
      }
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
  padding: 20px 0;
}

</style>