<template>
  <Header :selected_item="'history'"></Header>

  <div v-if="cars.length > 0" class="d-flex align-items-center justify-content-center mt-5">
    <img @click="dec_index" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
    <CarCard class="mx-3" :initial-mode="'read'" :car="cars[selected_car]" :additionalInfo="false"></CarCard>
    <img @click="inc_index" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
  </div>

  <div v-if="cars.length > 0" class="row justify-content-center mt-5">

    <table class="col-6 col-xl-3">
      <thead>
        <tr>
          <th scope="col"> start </th>
          <th scope="col"> end </th>
          <th scope="col"> duration </th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="parking in cars[selected_car].parkings">
         <td>{{getFormattedDate(parking.start)}}</td>
         <td v-if="parking.end != null">{{getFormattedDate(parking.end)}}</td>
         <td v-if="parking.end == null">-</td>
         <td v-if="parking.end != null">{{getDateDiff(parking.start, parking.end)}}</td>
         <td v-if="parking.end == null">-</td>
       </tr>
      </tbody>
    </table>
    <!--
    <ul class="list-group col-6 col-xl-3">
      <li class="list-group-item" v-for="parking in cars[selected_car].parkings">
        <p>{{getFormattedDate(parking.start)}}</p>
        <p>{{getFormattedDate(parking.end)}}</p>
      </li>
    </ul>
    -->
  </div>

</template>

<script>

import {defineComponent} from "vue"
import Header from "@/components/Header.vue";
import CarCard from "@/components/CarCard.vue";
import axios from "axios";

export default defineComponent({
  name: "HistoryView",
  components: {CarCard, Header},
  data(){
    return{
      cars: [],
      selected_car: 0,
    }
  },
  methods: {
    dec_index() {
      this.selected_car =  this.selected_car === 0 ? this.cars.length-1 : this.selected_car-1
    },
    inc_index() {
      this.selected_car =  this.selected_car === this.cars.length-1 ? 0 : this.selected_car+1
    },
    getFormattedDate(dateStr) {
      const date = new Date(new Date(dateStr).toLocaleString('en-US', {timeZone: 'Europe/London'}))
      return date.toISOString().split('T')[0] + " " + this.pad(date.getHours(), 2) + ":" + this.pad(date.getMinutes(), 2)
    },
    getDateDiff(from, to){
      const diff = new Date(to) - new Date(from)
      const min = Math.floor((diff%3600000)/60000.0)
      if(min === 0){
        return Math.floor(diff/3600000) + "h"
      }else{
        return Math.floor(diff/3600000) + "h" + min
      }
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  },
  mounted() {
    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem('email')).then((response) => {
      this.cars = response.data

      this.cars.forEach(car => axios.get('http://localhost:3000/parkings/' + car._id.toString()).then((response) => {
        car.parkings = response.data.reverse()
      }))

    })
  }
})

</script>

<style scoped>

:deep(.car-card){
  height: 150px;
  padding: 5px 0;
  min-height: 0;
  min-width: 0;
  width: 500px;
}

</style>