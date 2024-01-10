<template>
  <Header selected_item="my_cars"></Header>
  <div class="d-flex flex-column justify-content-center align-items-center mt-5 vw-100" >
    <h1>My cars</h1>
    <div v-for="(car, i) in cars">
      <CarCard v-if="visible[i]" :car="car" class="mt-5" @delete="visible[i] = false"></CarCard>
    </div>
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
      visible: []
    }
  },
  mounted() {
    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem('email')).then((response) => {
      this.visible = Array.from({ length: response.data.length}, () => true);
      this.cars = response.data;
    })
  }
});

</script>
