<template>
  <Header selected_item="my_cars"></Header>
  <div class="d-flex flex-column justify-content-center align-items-center mt-5 mb-5" style="width: 100%">
    <h1>My cars</h1>

    <div v-if="cars.length > 0">
      <CarCard class="mt-5" v-for="car in cars" :initialMode="'read'" :car="car" :additionalInfo="true"></CarCard>
    </div>

    <CarCard class="mt-5" :initialMode="'create'" @newCarRegistered="newCarRegistered" :additionalInfo="false"></CarCard>
  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CarCard from "@/components/CarCard.vue";
import axios from "axios";

export default defineComponent({
  name: "MyCars",
  components: {
    Header,
    Footer,
    CarCard
  },
  data(){
    return{
      cars: [],
      add_car_form_visible: false,
    }
  },
  methods: {
    showForm(){
      this.add_car_form_visible = true
    },
    newCarRegistered(newCar){
      this.cars.push(newCar);
    }
  },
  mounted() {
    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem('email')).then((response) => {
      this.cars = response.data
      this.cars.forEach(c => c.visible = true)
    })
  }
});

</script>

<style>

  .add-car-card{
    display: block;
    background-color: #9de3f5;
    height: 10vh;
    #min-height: 200px;
    #min-width: 650px;
    width: 30vw;
    border-radius: 30vh;
    box-shadow: 5px 10px 20px 0px #b0b0b0;
    border: none;
  }
</style>
