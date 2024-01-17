<template>
  <AdminHeader selected_item="home" ></AdminHeader>
  <div class="d-flex flex-column justify-content-center align-items-center mt-5" style="width: 100%">
    <h1>My garages</h1>

    <div class="d-flex flex-column justify-content-center align-items-center mb-5" style="width: 100%">
      <div v-for="garage in garages">
        <GarageCard v-if="!garage.edit" :read-only="false" :garage="garage" class="mt-5" @delete="garages.pop(garage)" @edit="garage.edit = true"></GarageCard>
        <GarageModifyCard :garage="garage" class="mt-5" v-if="garage.edit" @cancel="garage.edit=false" @save="refreshAll"></GarageModifyCard>
      </div>

      <button @click="showForm()" class="mt-5 d-flex add-car-card justify-content-center align-items-center" v-if="!add_garage_form_visible">
        + add a new garage
      </button>

      <GarageCreationCard v-if="add_garage_form_visible" @cancel="this.add_garage_form_visible = false" @newGarageRegistered="refreshGarages" class="mt-5"></GarageCreationCard>

    </div>

  </div>
  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios from "axios";
import GarageCard from "@/components/GarageCard.vue";
import GarageCreationCard from "@/components/GarageCreationCard.vue";
import GarageModifyCard from "@/components/GarageModifyCard.vue";

export default defineComponent({
  name: "AdminHomeView",
  components: {
    GarageModifyCard,
    GarageCreationCard,
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
    showForm(){
      this.add_garage_form_visible = true
    },
    refreshGarages(newGarage){
      this.add_garage_form_visible = false;
      newGarage.edit = false
      this.garages.push(newGarage);
    },
    refreshAll(){
      axios.get('http://localhost:3000/parkings/' + sessionStorage.getItem('email')).then((response) => {
        this.garages = response.data
        this.garages.forEach(e => e.edit = false)
      })
    }
  },
  mounted() {
    this.refreshAll()
  }
});

</script>
