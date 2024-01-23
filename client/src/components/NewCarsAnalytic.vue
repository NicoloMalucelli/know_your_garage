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
      <tr v-for="(days,i) in units">
        <td class="px-3"><strong>{{title[i]}}</strong></td>

        <td  class="px-3" style="font-size: 17px">{{parkings[i]}} <span v-if="i !== units.length-1"> {{compareValues(parkings[i]/units[i], parkings[i+1]/units[i+1])}} </span> </td>
        <td  class="px-3" style="font-size: 17px">{{passes[i]}} <span v-if="i !== units.length-1">{{compareValues(passes[i]/units[i], passes[i+1]/units[i+1])}} </span></td>
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
      units: [1, 3, 7, 14, 30, 90, 365],
      title: ["today", "last three days", "last seven days", "last two weeks", "last month", "last three months", "last year"],
    }
  },
  methods: {
    addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    },
    compareValues(value, comparison_value){
      if(value === comparison_value){
        return '(=)'
      }
      if(value < comparison_value){
        return '(-)'
      }
      return '(+)'
    },
    update(){
      axios.get('http://localhost:3000/parkings', {params: {'garage_id': this.garage._id.toString()}}).then((response) => {
        const firstTimeCarParking = response.data
            .map(parking => parking.car_id)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map(el => response.data
                .filter(parking => parking.car_id === el)
                .map(parking => new Date(new Date(parking.start).toLocaleString('en-US', {timeZone: 'Europe/London'})))
                .reduce(function (a, b) { return a < b ? a : b; }))

        this.parkings = this.units.map(u => firstTimeCarParking.filter(date => date >= this.addDays(new Date(), -u)).length)
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
              const passSoldDates = allSoldPasses.map(pass => new Date(new Date(pass.start).toLocaleString('en-US', {timeZone: 'Europe/London'})))
              this.passes = this.units.map(u => passSoldDates.filter(date => date >= this.addDays(new Date(), -u)).length)
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