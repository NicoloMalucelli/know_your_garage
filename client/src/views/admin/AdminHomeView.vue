<template>
  <AdminHeader selected_item="home" ></AdminHeader>
  <div class="d-flex flex-column justify-content-center align-items-center mt-5" style="width: 100%">
    <h1>My garages</h1>
  </div>

  <div class="row d-flex justify-content-center mb-5 mx-5 px-5">
    <GarageCard v-for="garage in garages" :read-only="false" :initialMode="'read'" :initialGarage="garage" class="mt-5 col-12 col-xl-6 d-flex justify-content-center"></GarageCard>
    <GarageCard :initialMode="'create'" class="mt-5 col-12 col-xl-6 d-flex justify-content-center align-items-center" @newGarageRegistered="newGarageRegistered"></GarageCard>
  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios from "axios";
import GarageCard from "@/components/GarageCard.vue";

export default defineComponent({
  name: "AdminHomeView",
  components: {
    GarageCard,
    AdminHeader,
    Footer,
  },
  data(){
    return{
      garages: [],
      add_garage_form_visible: false,
    }
  },
  methods: {
    newGarageRegistered(garage){
      this.garages.push(garage)
    }
  },
  mounted() {
    axios.get('http://localhost:3000/parkings/' + sessionStorage.getItem('email')).then((response) => {
      this.garages = response.data
      this.garages.forEach(e => e.edit = false)
    })
  }
});

</script>
