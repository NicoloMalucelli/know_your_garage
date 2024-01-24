<template>
  <AdminHeader selected_item="analytics" ></AdminHeader>
  <div v-if="garages.length > 0" class="d-flex flex-column justify-content-center align-items-center mt-5" style="width: 100%" >
    <div id="shownGarageContainer" class="d-flex align-items-center">
      <img @click="dec_index" src="../../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
      <GarageCard :readOnly="true" :initialMode="'read'" :garage="garages.at(selected_garage)" class="m-3 d-flex justify-content-center"></GarageCard>
      <img @click="inc_index" src="../../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
    </div>

    <p class="mt-3" v-if="garages[selected_garage].passes.length === 0">No passes register yet for this garage</p>

    <p class="mt-5" v-if="garages.length === 0"> No garage registered yet</p>
  </div>

  <div v-if="garages.length > 0" class="row mt-5 px-xl-5 mx-xl-5 d-flex justify-content-center">
    <PassCard @deleted="deletePass" :initialMode="'read'" :editable="true" class="col-12 col-md-6 col-xl-3 mb-5 d-flex justify-content-center" v-for="pass in garages[selected_garage].passes"  :pass="pass"></PassCard>
    <PassCard @create="passCreated" :garage="garages[selected_garage].name" :initialMode="'create'" class="col-12 col-md-6 col-xl-3 mb-5 d-flex justify-content-center"></PassCard>
  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";
import GarageCard from "@/components/GarageCard.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import PassCard from "@/components/PassCard.vue";

export default defineComponent({
  name: "AdminManagePassesView",
  components: {
    PassCard,
    GarageCard,
    AdminHeader,
    Footer
  },
  data(){
    return{
      garages: [],
      selected_garage: 0,
    }
  },
  methods: {
    dec_index() {
      this.selected_garage = this.selected_garage === 0 ? this.garages.length - 1 : this.selected_garage - 1
    },
    inc_index() {
      this.selected_garage = this.selected_garage === this.garages.length - 1 ? 0 : this.selected_garage + 1
    },
    passCreated(pass){
      this.garages[this.selected_garage].passes.push(pass)
    },
    deletePass(pass){
      this.garages[this.selected_garage].passes = this.garages[this.selected_garage].passes.filter(p => pass._id !== p._id)
    }
  },
  mounted() {
    axios.get('http://localhost:3000/garages/' + sessionStorage.getItem('email')).then((response) => {
      this.garages = response.data
      this.garages.forEach(garage => garage.passes =[])

      this.garages.forEach(garage => axios.get('http://localhost:3000/passes/' + sessionStorage.getItem("email") + "/" + garage.name, {params: {"visible": true}}).then((response) => {
        garage.passes = response.data;
      }))
    })
  }
});

</script>

<style scoped>

:deep(.garage-card){
  min-width: 400px;
  max-width: 600px;
  width: 60vw;
  background-color: #9ce1f4;
}

</style>
