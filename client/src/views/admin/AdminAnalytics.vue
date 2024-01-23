<template>
  <AdminHeader selected_item="home" ></AdminHeader>

  <div v-if="garages.length > 0" class="d-flex flex-column justify-content-center align-items-center mt-3" style="width: 100%" >
    <div id="shownGarageContainer" class="d-flex align-items-center">
      <img @click="dec_index" src="../../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
      <GarageCard :readOnly="true" :initialMode="'read'" :garage="garages.at(selected_garage)" class="m-3 d-flex justify-content-center"></GarageCard>
      <img @click="inc_index" src="../../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
    </div>
  </div>

  <div class="row d-flex justify-content-center">
    <div class="col-10 col-md-8 col-lg-6 col-xxl-4 d-flex align-items-center justify-content-center flex-column">

      <Bar
          id="my-chart-id"
          :options="barChartOptions"
          :data="{
            labels: getWeek(week).map(day => day.toString().slice(0, 15)),
            datasets: [ {
              data: getParkingInTheWeekByDay(week),
              backgroundColor: ['rgb(71,124,12)'],
              label: 'parkings per day',
            } ],
          }"
      />

      <div class="d-flex justify-content-center align-items-center mt-3">
        <img @click="week--" src="../../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
        <p class="mb-0" style="margin-right: 20px">prev</p>
        <p class="mb-0" style="margin-left: 20px">next</p>
        <img @click="week++" src="../../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
      </div>

    </div>
    <div class="col-10 col-md-8 col-lg-6 col-xxl-4 d-flex align-items-center justify-content-center" style="background-color: white; height: 100px">ciao</div>
    <div class="col-10 col-md-8 col-lg-6 col-xxl-4 d-flex align-items-center justify-content-center" style="background-color: red; height: 100px">ciao</div>
  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios from "axios";
import GarageCard from "@/components/GarageCard.vue";
import {Bar} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: "AdminAnalytics",
  components: {
    GarageCard,
    AdminHeader,
    Footer,
    Bar,
  },
  data(){
    return{
      garages: [],
      parkings: [],
      selected_garage: 0,
      week: 0,
      barChartOptions: {responsive: true},
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
    getParkingInTheWeekByDay(weekIndex = 0){
      const parkingsPerDay = this.parkings
          .flatMap(parking => this.getDatesBetween(new Date(parking.start), parking.end == null ? new Date() : new Date(parking.end)))

      return this.getWeek(weekIndex).map(day => parkingsPerDay.filter(x => x.toISOString()===day.toISOString()).length)
    },
    getDatesBetween(startDate, endDate){
      startDate = new Date(startDate.toLocaleString('en-US', {timeZone: 'Europe/London'}))
      endDate = new Date(endDate.toLocaleString('en-US', {timeZone: 'Europe/London'}))

      const dates = [];
      let currentDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
      );
      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1,
        );
      }
      return dates;
    },
    getWeek(weekIndex){
      const curr = new Date()
      return this.getDatesBetween(
          this.addDays(new Date(), -curr.getDay()+1 + 7*weekIndex),
          this.addDays(new Date(), -curr.getDay()+7 + 7*weekIndex))
    },
    addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
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