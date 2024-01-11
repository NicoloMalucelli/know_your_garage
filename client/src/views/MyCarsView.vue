<template>
  <Header selected_item="my_cars"></Header>
  <div class="d-flex flex-column justify-content-center align-items-center mt-5" style="width: 100%">
    <h1>My cars</h1>
    <div v-for="car in cars">
      <CarCard :car="car" class="mt-5" @delete="cars.pop(car)"></CarCard>
    </div>

    <button @click="showForm()" class="mt-5 d-flex add-car-card justify-content-center align-items-center" v-if="!add_car_form_visible">
      + add a new car
    </button>

    <CarCreationCard class="mt-5" v-if="add_car_form_visible" @cancel="add_car_form_visible=false" @newCarRegistered="refreshCars"></CarCreationCard>

  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CarCard from "@/components/CarCard.vue";
import CarCreationCard from "@/components/CarCreationCard.vue";
import axios from "axios";

export default defineComponent({
  name: "MyCars",
  components: {
    CarCreationCard,
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
    refreshCars(newCar){
      this.add_car_form_visible = false;
      this.cars.push(newCar);
    }
  },
  mounted() {
    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem('email')).then((response) => {
      this.cars = response.data
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
