<template>
  <Header :selected_item="'my_pass'"></Header>

  <div v-if="cars.length > 0" class="d-flex align-items-center justify-content-center mt-5">
    <img @click="dec_index" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
    <CarCard class="mx-3" :initial-mode="'read'" :car="cars[selected_car]" :additionalInfo="false"></CarCard>
    <img @click="inc_index" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
  </div>

  <div v-if="passes.length === 0" class="row justify-content-center mt-5 mb-2">
    <p>this car never had an associated pass</p>
  </div>

  <div v-if="passes.length > 0">
    <div class="row justify-content-center mt-5 mb-2">

      <table class="col-10 col-xl-5">
        <thead>
        <tr>
          <th scope="col"> pass </th>
          <th scope="col"> garage </th>
          <th scope="col"> from </th>
          <th scope="col"> to </th>
          <th scope="col"> status </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pass in passes">
          <td class="px-3"><strong>{{pass.raw_pass.title}}</strong></td>
          <td class="px-3">{{pass.raw_pass.garage}}</td>
          <td class="px-3">{{getFormattedDate(pass.start)}}</td>
          <td class="px-3">{{getFormattedDate(pass.end)}}</td>

          <td class="px-3" style="color: darkgreen" v-if="new Date() <= new Date(pass.end)"> <strong>active</strong></td>
          <td class="px-3" style="color: darkred" v-if="new Date() > new Date(pass.end)"> <strong>expired</strong></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center align-items-center mt-3">
      <img @click="dec_page" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
      <p style="margin-bottom: 0" class="mx-3">page {{page_index+1}} of {{max_page_index}}</p>
      <img @click="inc_page" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import {defineComponent} from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CarCard from "@/components/CarCard.vue";
import axios from "axios";
export default defineComponent({
  name: "MyPass",
  components: {Header, Footer, CarCard},
  data(){
    return{
      cars: [],
      selected_car: 0,
      passes: [],
      page_index: 0,
      max_page_index: 0,
      skip: 5.0
    }
  },
  methods:{
    dec_index() {
      this.selected_car = this.selected_car === 0 ? this.cars.length - 1 : this.selected_car - 1
      this.updatePasses()
      this.updateMaxPage()
    },
    inc_index() {
      this.selected_car = this.selected_car === this.cars.length - 1 ? 0 : this.selected_car + 1
      this.updatePasses()
      this.updateMaxPage()
    },
    dec_page(){
      if(this.page_index > 0){
        this.page_index--
        this.updatePasses()
      }
    },
    inc_page(){
      if(this.page_index !== this.max_page_index-1){
        this.page_index++
        this.updatePasses()
      }
    },
    getFormattedDate(dateStr) {
      const date = new Date(new Date(dateStr).toLocaleString('en-US', {timeZone: 'Europe/London'}))
      return date.toISOString().split('T')[0]
    },
    updatePasses(){
      console.log(this.page_index)
      axios.get('http://localhost:3000/purchasedpasses/' + this.cars[this.selected_car]._id.toString(), {params: {skip: this.skip, page: this.page_index}}).then((response) => {
        const launched = response.data.length
        let terminated = 0
        if (response.data.length === 0) {
          this.passes = response.data
        }

        console.log(response.data.map(p => p.pass_id))

        response.data.forEach(pass => axios.get('http://localhost:3000/passes/' + pass.pass_id.toString()).then((res) => {
          pass.raw_pass = res.data[0]
            terminated++
            if (terminated === launched) {
              this.passes = response.data
            }
          })
        )
      })
    },
    updateMaxPage(){
      axios.get('http://localhost:3000/purchasedpasses/total_number/' + this.cars[this.selected_car]._id.toString()).then((response) => {
        this.max_page_index = Math.ceil(response.data/this.skip)
        console.log(this.max_page_index)
      })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem('email')).then((response) => {
      this.cars = response.data
      this.updatePasses()
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