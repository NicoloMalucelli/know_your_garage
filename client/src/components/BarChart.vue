<template>
  <Bar
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
    <img @click="week--" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
    <p class="mb-0" style="margin-right: 20px">prev</p>
    <p class="mb-0" style="margin-left: 20px">next</p>
    <img @click="week++" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
  </div>
</template>

<script>
import axios from "axios";
import {Bar} from "vue-chartjs";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components:{
    Bar
  },
  props: ['garage'],
  watch: {
    garage: function (newVal, oldVal){
      this.update()
    }
  },
  data(){
    return{
      week: 0,
      parkings: [],
      barChartOptions: {responsive: true},
    }
  },
  methods: {
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
    update(){
      axios.get('http://localhost:3000/parkings', {params: {'garage_id': this.garage._id.toString()}}).then((response) => {
        this.parkings = response.data
      })
    }
  },
  mounted() {
    this.update()
  }
}
</script>

<style scoped>

</style>