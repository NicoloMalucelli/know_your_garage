<template>
  <AdminHeader :selected_item="'real_time'"></AdminHeader>

  <div class="row d-flex justify-content-center mt-5">
    <div class="col-5">
      <Bar
          :options="{responsive: true}"
          :data="{
                labels: garages.map(g => g.name),
                datasets: [ {
                  data: garages.map(g => g.takenSlots),
                  backgroundColor: ['rgb(71,124,12)'],
                  label: 'real time taken slots',
                } ],
              }"
      />
    </div>

    <div class="col-5">
      <Bar
          :options="{
            responsive: true,
            scales: {
                  y: {
                      max: 100
                  },
                },
            }"
          :data="{
                labels: garages.map(g => g.name),
                datasets: [ {
                  data: garages.map(g => 100.0*g.takenSlots/g.slots),
                  backgroundColor: ['rgb(169,16,16)'],
                  label: 'real time percentage of taken slots',
                } ],
              }"
      />
    </div>
  </div>


  <Footer></Footer>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import io from 'socket.io-client';
import axios from "axios";
import Footer from "@/components/Footer.vue";
import {Bar} from "vue-chartjs";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import {defineComponent} from "vue";

export default defineComponent({
  name: "AdminRealTime",
  components: {
    AdminHeader,
    Bar,
    Footer,
  },
  data(){
    return{
      socket: io('localhost:3000'),
      garages: [],
    }
  },
  methods: {
    updateView(garage){
      this.garages
          .filter(g => g._id === garage.id)
          .forEach(g => {
            axios.get('http://localhost:3000/garages/realtime/' + garage.id).then((newCount) => {
              g.takenSlots = g.slots - newCount.data
            })
          })
    },
  },
  mounted() {
    this.socket.on('free-slots-update', (garage) => {
      this.updateView(garage)
    })

    axios.get('http://localhost:3000/garages/' + sessionStorage.getItem('email')).then((response) => {
      const tot = response.data.length
      let done = 0

      response.data.forEach(g => {
        axios.get('http://localhost:3000/garages/realtime/' + g._id).then((newCount) => {
          g.takenSlots = g.slots - newCount.data
          done++
          if(tot === done){
            this.garages = response.data
          }
        })
      })

      this.garages.forEach(g => {
        this.updateView(g)
      })
    })
  }
})
</script>

<style scoped>

</style>