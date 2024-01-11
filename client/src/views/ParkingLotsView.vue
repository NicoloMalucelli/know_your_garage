<template>
  <Header selected_item="find_a_parking_lot"></Header>
  <h1 class="mt-3">Parking lots</h1>
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import CarCard from "@/components/CarCard.vue";
import CarCreationCard from "@/components/CarCreationCard.vue";
import axios from "axios";

export default defineComponent({
  name: "ParkingLots",
  components: {
    Header

  },
  data(){
    return{
    }
  },
  methods: {
  },
  mounted() {
  }
});
</script>

<style scoped>

</style>