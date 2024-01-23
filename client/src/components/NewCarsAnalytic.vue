<template>
  <div class="row d-flex justify-content-center">
    <table class="col-12 mx-3">
      <thead>
      <tr>
        <th scope="col" class="px-3">  </th>
        <th scope="col" class="px-2"> # new cars </th>
        <th scope="col" class="px-2"> # sold passes </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(days,i) in [1, 3, 7, 14, 30, 90, 365]">
        <td class="px-3"><strong>{{title[i]}}</strong></td>
        <td class="px-3" style="font-size: 17px">{{parkings.filter(date => date >= addDays(new Date(), -days)).length}}</td>
        <td class="px-3" style="font-size: 17px">{{passes.filter(date => date >= addDays(new Date(), -days)).length}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewCarsAnalytic",
  watch: {
    garage: function (newVal, oldVal){
      this.update()
    }
  },
  props: ['garage'],
  data(){
    return{
      parkings: [],
      passes: [],
      title: ["today", "last three days", "last seven days", "last two weeks", "last month", "last three months", "last year"]
    }
  },
  methods: {
    addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    },
    update(){
      axios.get('http://localhost:3000/parkings', {params: {'garage_id': this.garage._id.toString()}}).then((response) => {
        this.parkings = response.data
            .map(parking => parking.car_id)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map(el => response.data
                .filter(parking => parking.car_id === el)
                .map(parking => new Date(new Date(parking.start).toLocaleString('en-US', {timeZone: 'Europe/London'})))
                .reduce(function (a, b) { return a < b ? a : b; }))
      })
      axios.get('http://localhost:3000/passes/' + sessionStorage.getItem("email") + "/" + this.garage.name, {params: {"visible": true}}).then((response) => {
        let allSoldPasses = []
        const total = response.data.length
        let done = 0

        response.data.forEach(pass => {
          axios.get('http://localhost:3000/soldpasses/' + pass._id.toString(), {}).then((res) => {
            allSoldPasses = allSoldPasses.concat(res.data)
            pass.count = res.data.length
            done++
            if(done === total){
              this.passes = allSoldPasses.map(pass => new Date(new Date(pass.start).toLocaleString('en-US', {timeZone: 'Europe/London'})))
            }
          })
        })
      })
    }
  },
  mounted() {
    this.update()
  }
}
</script>

<style scoped>

th, td{
  padding: 10px 0;
}

tr{
  border-top: 1px solid black;
}

table{
  background-color: white;
  border: 1px solid black;
}


tbody tr:nth-child(odd) {
  background-color: #bdf6f5;
  color: #000;
}

tbody tr:nth-child(even) {
  background-color: #f3efef;
  color: #000;
}

</style>