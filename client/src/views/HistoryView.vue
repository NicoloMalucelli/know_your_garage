<template>
  <Header :selected_item="'history'"></Header>

  <div v-if="cars.length === 0" class="row justify-content-center mt-xl-5 mt-3 mb-2">
    <p><em>no car has been registered yet</em></p>
  </div>

  <div v-if="cars.length > 0" class="d-flex align-items-center justify-content-center mt-5">
    <img @click="dec_index" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
    <CarCard class="mx-3" :initial-mode="'read'" :car="cars[selected_car]" :additionalInfo="false"></CarCard>
    <img @click="inc_index" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
  </div>

  <div v-if="cars.length > 0 && parkings.length === 0" class="row justify-content-center mt-xl-5 mt-3 mb-2">
    <p><em>no parking found</em></p>
  </div>

  <div v-if="parkings.length > 0" class="row justify-content-center mt-5 mb-2">

    <table class="col-8 col-xl-5">
      <thead>
        <tr>
          <th scope="col"> garage </th>
          <th scope="col"> day </th>
          <th scope="col"> start </th>
          <th scope="col"> end </th>
          <th scope="col"> duration </th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="parking in parkings">
         <td><strong>{{parking.garage.name}}</strong></td>
         <td class="px-3">{{getDateDDMMYYYY(parking.start)}}</td>
         <td class="px-3">{{getFormattedDate(parking.start).slice(10)}}</td>

         <td class="px-3">
           <span v-if="parking.end != null">{{getFormattedDate(parking.end).slice(10)}}</span>
           <span v-if="parking.end == null">-</span>
         </td>

         <td class="px-3">
           <span v-if="parking.end != null">{{getDateDiff(parking.start, parking.end)}}</span>
           <span v-if="parking.end == null">-</span>
         </td>

       </tr>
      </tbody>
    </table>
  </div>

  <div v-if="parkings.length > 0" class="d-flex justify-content-center align-items-center mt-3 mb-5">
    <img @click="dec_page" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
    <p style="margin-bottom: 0" class="mx-3">page {{page_index+1}} of {{max_page_index}}</p>
    <img @click="inc_page" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
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
      parkings: [],
      page_index: 0,
      max_page_index: 0,
      skip: 5.0
    }
  },
  methods: {
    dec_page(){
      if(this.page_index > 0){
        this.page_index--
        this.updateParkings()
      }
    },
    inc_page(){
      if(this.page_index !== this.max_page_index-1){
        this.page_index++
        this.updateParkings()
      }
    },
    dec_index() {
      this.page_index = 0
      this.selected_car = this.selected_car === 0 ? this.cars.length - 1 : this.selected_car - 1
      this.updateMaxPage()
      this.updateParkings()
    },
    inc_index() {
      this.page_index = 0
      this.selected_car = this.selected_car === this.cars.length - 1 ? 0 : this.selected_car + 1
      this.updateMaxPage()
      this.updateParkings()
    },
    getFormattedDate(dateStr) {
      const date = new Date(new Date(dateStr).toLocaleString('en-US', {timeZone: 'Europe/London'}))
      return date.toISOString().split('T')[0] + " " + this.pad(date.getHours(), 2) + ":" + this.pad(date.getMinutes(), 2)
    },
    getDateDDMMYYYY(dateStr) {
      let date = new Date(new Date(dateStr).toLocaleString('en-US', {timeZone: 'Europe/London'}))
      return date.toISOString().split('T')[0].split('-').reverse().join("-")
    },
    getDateDiff(from, to) {
      const diff = new Date(to) - new Date(from)
      const min = Math.floor((diff % 3600000) / 60000.0)
      if (min === 0) {
        return Math.floor(diff / 3600000) + "h"
      } else {
        return Math.floor(diff / 3600000) + "h" + min
      }
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    },
    updateParkings() {
      axios.get('http://localhost:3000/parkings/' + this.cars[this.selected_car]._id.toString(), {params: {skip: this.skip, page: this.page_index}}).then((response) => {
        const launched = response.data.length
        let terminated = 0
        if (response.data.length === 0) {
          this.parkings = response.data
        }

        response.data.forEach(parking => axios.get('http://localhost:3000/garages/id/' + parking.garage_id).then((res) => {
              parking.garage = res.data[0]
              terminated++
              if (terminated === launched) {
                this.parkings = response.data
              }
            })
        )
      })
    },
    updateMaxPage(){
      axios.get('http://localhost:3000/parkings/total_number/' + this.cars[this.selected_car]._id.toString()).then((response) => {
        this.max_page_index = Math.ceil(response.data/this.skip)
      })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem('email')).then((response) => {
      this.cars = response.data
      this.updateParkings()
      this.updateMaxPage()
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

th, td{
  padding: 10px 0;
}

tr{
  border-top: 1px solid black;
}

table{
  background-color: white;
  border: 1px solid black;
}


tbody tr:nth-child(odd) {
  background-color: #bdf6f5;
  color: #000;
}

tbody tr:nth-child(even) {
  background-color: #f3efef;
  color: #000;
}

</style>