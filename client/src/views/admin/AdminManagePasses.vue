<template>
  <AdminHeader selected_item="manage_pass" ></AdminHeader>
  <div v-if="garages.length > 0" class="d-flex flex-column justify-content-center align-items-center mt-5" style="width: 100%">
    <div class="d-flex align-items-center">
      <img @click="dec_index" src="../../assets/arrows/left-arrow.png" class="m-3" style="width: 20px; cursor: pointer">
      <GarageCard id="shown_garage" :read-only="true" :garage="garages[selected_garage]" class="m-3"></GarageCard>
      <img @click="inc_index" src="../../assets/arrows/right-arrow.png" class="m-3" style="width: 20px; cursor: pointer">
    </div>

    <p class="mt-3" v-if="garages[selected_garage].passes.length === 0">No passes register yet for this garage</p>

    <p class="mt-5" v-if="garages.length === 0"> No garage registered yet</p>
  </div>

  <div v-if="garages.length > 0" class="row mt-5 px-xl-5 mx-xl-5 d-flex justify-content-center">
    <PassCard :readOnly="false" class="col-12 col-md-6 col-xl-3 mb-5 d-flex justify-content-center" v-for="pass in garages[selected_garage].passes"  :pass="pass"></PassCard>
  </div>

  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";
import GarageCard from "@/components/GarageCard.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import PassCard from "@/components/PassCard.vue";

export default defineComponent({
  name: "AdminManagePassesView",
  components: {
    PassCard,
    GarageCard,
    AdminHeader,
    Footer
  },
  data(){
    return{
      garages: [],
      selected_garage: 0,
    }
  },
  methods: {
      dec_index() {
        if(this.selected_garage > 1) {
          this.selected_garage -= 1
        }else{
          this.selected_garage = 4
        }
      },
      inc_index() {
        if(this.selected_garage < 4) {
          this.selected_garage += 1
        }else{
          this.selected_garage = 1
        }
      },
  },
  mounted() {
    axios.get('http://localhost:3000/parkings/' + sessionStorage.getItem('email')).then((response) => {
      this.garages = response.data
      this.garages.forEach(garage => garage.passes =[])

      this.garages.forEach(garage => axios.get('http://localhost:3000/passes/' + sessionStorage.getItem("email") + "/" + garage.name).then((response) => {
        garage.passes = response.data
      }))
    })
  }
});

</script>

<style>

#shown_garage{
  width: 530px;
  padding: 20px 0px;
}

</style>
