<template>
  <div class="w-100">
    <Pie
        v-if="passes.length > 0 && passes.map(p => p.count).reduce((s,a) => s+a, 0) > 0"
      :options="pieChartOptions"
      :data="{
            labels: passes.map(pass => pass.title),
            datasets: [ {
              data: passes.map(pass => pass.count),
              backgroundColor: passes.map((p, i) => colors[i%colors.length]),
              label: 'passes sold',
            }],
          }">
    </Pie>
  </div>

  <p v-if="passes.length > 0 && passes.map(p => p.count).reduce((s,a) => s+a, 0) > 0" class="mb-0 mt-3" style="font-size: 14px"><em>sold passes</em></p>

  <p v-if="passes.length > 0 && passes.map(p => p.count).reduce((s,a) => s+a, 0) <= 0"><em>no pass has been sold yet</em></p>

</template>

<script>
import {Pie} from "vue-chartjs";
import axios from "axios";
import {ArcElement, Chart} from "chart.js";
Chart.register(ArcElement)

export default {
  name: "PieChart",
  components:{
    Pie
  },
  props: ['garage'],
  watch: {
    garage: function (newVal, oldVal){
      this.update()
    }
  },
  data(){
    return{
      week: 0,
      passes: [],
      pieChartOptions: {responsive: true, maintainAspectRatio: false},
      colors: ['rgb(177,20,194)', 'rgb(69,122,15)', 'rgb(192,159,7)', 'rgb(121,197,84)', 'rgb(194,20,20)', 'rgb(30,125,145)']
    }
  },
  methods: {
    update(){
      axios.get('http://localhost:3000/passes/' + sessionStorage.getItem("email") + "/" + this.garage.name, {params: {"visible": true}}).then((response) => {
        const total = response.data.length
        let done = 0

        response.data.forEach(pass => {
          axios.get('http://localhost:3000/soldpasses/' + pass._id.toString(), {}).then((res) => {
            pass.count = res.data.length
            done++
            if(done === total){
              this.passes = response.data
            }
          })
        })

      })
    },
    randomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  },
  mounted() {
    this.update()
  }
}
</script>

<style scoped>

</style>