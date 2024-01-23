<template>
  <AdminHeader selected_item="home" ></AdminHeader>

  <div v-if="garages.length > 0" class="d-flex flex-column justify-content-center align-items-center mt-3" style="width: 100%" >
    <div id="shownGarageContainer" class="d-flex align-items-center">
      <img @click="dec_index" src="../../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
      <GarageCard :readOnly="true" :initialMode="'read'" :garage="garages.at(selected_garage)" class="m-3 d-flex justify-content-center"></GarageCard>
      <img @click="inc_index" src="../../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
    </div>
  </div>

  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-10 col-md-8 col-lg-6 col-xxl-4 d-flex align-items-center justify-content-center flex-column">
      <BarChart v-if="garages.length > 0" :garage="garages[selected_garage]"></BarChart>
    </div>


    <div class="col-10 col-md-8 col-lg-6 col-xxl-4 d-flex align-items-center justify-content-center flex-column">
      <div class="w-100">
      <PieChart v-if="garages.length > 0" :garage="garages[selected_garage]"></PieChart>
      </div>
      <p class="mb-0 mt-3" style="font-size: 14px"><em>sold passes</em></p>
    </div>


    <div class="col-10 col-md-8 col-lg-6 col-xxl-4 d-flex align-items-center justify-content-center">
      <NewCarsAnalytic v-if="garages.length > 0" :garage="garages[selected_garage]"></NewCarsAnalytic>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios from "axios";
import GarageCard from "@/components/GarageCard.vue";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import NewCarsAnalytic from "@/components/NewCarsAnalytic.vue";


export default defineComponent({
  name: "AdminAnalytics",
  components: {
    NewCarsAnalytic,
    PieChart,
    BarChart,
    GarageCard,
    AdminHeader,
    Footer,
  },
  data(){
    return{
      garages: [],
      parkings: [],
      selected_garage: 0,
    }
  },
  methods: {
    dec_index() {
      this.selected_garage = this.selected_garage === 0 ? this.garages.length - 1 : this.selected_garage - 1
      this.updateStats()
    },
    inc_index() {
      this.selected_garage = this.selected_garage === this.garages.length - 1 ? 0 : this.selected_garage + 1
      this.updateStats()
    },
    updateStats(){
      axios.get('http://localhost:3000/parkings', {params: {'garage_id': this.garages[this.selected_garage]._id.toString()}}).then((response) => {
        this.parkings = response.data
      })
    },

  },
  mounted() {
    axios.get('http://localhost:3000/garages/' + sessionStorage.getItem('email')).then((response) => {
      this.garages = response.data
      this.updateStats()
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