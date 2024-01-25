<template>
  <AdminHeader selected_item="home" ></AdminHeader>
  <div class="d-flex flex-column justify-content-center align-items-center mt-3" style="width: 100%">
    <h1>My garages</h1>
  </div>

  <div class="row d-flex justify-content-center mb-0 mx-5 px-5 mt-4">
    <VerticalGarageCard v-for="garage in garages" :read-only="false" :initialMode="'read'" :garage="garage" class="mb-5 col-12 col-lg-4 col-xl-3 d-flex justify-content-center"></VerticalGarageCard>
    <VerticalGarageCard :initialMode="'create'" class="mb-5 col-12 col-xl-3 d-flex justify-content-center align-items-center" @newGarageRegistered="newGarageRegistered"></VerticalGarageCard>
  </div>

</template>

<script>

import { defineComponent } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios from "axios";
import GarageCard from "@/components/GarageCard.vue";
import VerticalGarageCard from "@/components/VerticalGarageCard.vue";

export default defineComponent({
  name: "AdminHomeView",
  components: {
    VerticalGarageCard,
    GarageCard,
    AdminHeader,
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
    axios.get('http://localhost:3000/garages/' + sessionStorage.getItem('email')).then((response) => {
      this.garages = response.data
      this.garages.forEach(e => e.edit = false)
    })
  }
});

</script>
