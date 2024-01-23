<template>

  <div class="overlay-container d-flex justify-content-center align-items-center" @click.self="$emit('close')">

    <div v-if="mode !== 'bought'" class="overlay-div flex-column py-4 d-flex align-items-center" style="position: relative;">
      <img src="../assets/cancel.png" @click="$emit('close')" style="height: 20px; width: 20px; cursor: pointer; position: absolute; right: 10px; top: 10px">
      <h1 style="font-size: larger" class="mb-3">{{garage.name}}</h1>

      <div style="height: 80%">

        <div v-if="mode === 'navigate_pass'">
          <h2 style="font-size: large">Step 1: select a pass</h2>
          <div class="d-flex justify-content-center align-items-center mt-4">
            <img @click="dec_index" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
            <PassCard v-if="passes.length > 0" class="mx-3" :pass="passes[selected_pass]" :initial-mode="'read'" :editable="false"></PassCard>
            <img @click="inc_index" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
          </div>

        </div>

        <div v-if="mode === 'navigate_car'">
          <h2 style="font-size: large">Step 2: select a car</h2>
          <div v-if="cars.length > 0" class="d-flex align-items-center justify-content-center mt-4">
            <img @click="dec_index_car" src="../assets/arrows/left-arrow.png" style="width: 20px; cursor: pointer">
            <CarCard class="mx-3" :initial-mode="'read'" :car="cars[selected_car]" :additionalInfo="false"></CarCard>
            <img @click="inc_index_car" src="../assets/arrows/right-arrow.png" style="width: 20px; cursor: pointer">
          </div>
        </div>

        <div v-if="mode === 'buy'">
          <h2 style="font-size: large">Step 3: insert payment info</h2>

          <div class="my-0 d-flex mx-4 flex-column align-items-start">
            <h3 style="font-size: large" class="mt-2">Resume:</h3>
            <p>1x <strong>{{passes[selected_pass].title}}</strong> valid for your <strong>{{cars[selected_car].model}}</strong> (license plate: {{cars[selected_car].license_plate}})</p>
            <p class="my-0">activation date: {{addDays(new Date(), 1).toLocaleDateString()}} 00:00</p>
            <p class="my-0">expiration date: {{addDays(new Date(), passes[selected_pass].duration).toLocaleDateString()}} 23:59</p>
          </div>

          <p class="my-0 mt-1" style="font-size: larger">total amount: <strong>{{passes[selected_pass].cost}} €</strong></p>

          <p class="my-1" style="font-size: 10px">________________</p>

          <form @submit.prevent="submitForm" class="d-flex mx-4 flex-column align-items-start">

            <div class="d-flex align-items-center">
              <p class="my-0">card owner: </p>
              <input type="text" class="mx-1" placeholder="" v-model="card_owner"/>
            </div>

            <div class="d-flex align-items-center mt-2">
              <p class="my-0">card number: </p>
              <input type="number" class="mx-1" placeholder="" v-model="card_number"/>
            </div>

            <div class="d-flex align-items-center mt-2">
              <p class="my-0">expiry date (MM/YY): </p>
              <input type="number" class="mx-1" placeholder="MM" min="1" max="12" v-model="expiry_month">
              <input type="number" class="mx-1" placeholder="YY" min="24" max="99" v-model="expiry_year">
            </div>

            <div class="d-flex align-items-center mt-2">
              <p class="my-0">CVV/CVC: </p>
              <input type="number" class="mx-1" placeholder="" min="0" max="9999" v-model="cvv"/>
            </div>

            <div class="w-100 d-flex align-items-center justify-content-center mt-3">
              <button @click="previous" class="btn btn-danger mx-3"> previous </button>
              <button :disabled="!isFormSubmittable(card_owner, card_number, expiry_month, expiry_year, cvv)" @click="buy" class="btn btn-primary mx-3"> purchase </button>
            </div>

          </form>
        </div>

      </div>

      <div v-if="mode === 'navigate_pass' || mode === 'navigate_car'" style="height: 10%; width: 100%" class="d-flex justify-content-center align-items-center mt-4">
          <button v-if="mode !== 'navigate_pass'" @click="previous" class="btn btn-danger mx-3"> previous </button>
          <button v-if="mode !== 'buy'" @click="next" class="btn btn-primary mx-3"> next </button>
      </div>

    </div>

    <div v-if="mode === 'bought'" class="successful_purchase flex-column py-4 d-flex align-items-center justify-content-center" style="position: relative;">
      <img src="../assets/cancel.png" @click="$emit('close')" style="height: 20px; width: 20px; cursor: pointer; position: absolute; right: 15px; top: 15px">
      <p style="font-size: larger"><strong>Purchase completed successfully!</strong></p>
      <p>the pass will be valid from tomorrow</p>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import PassCard from "@/components/PassCard.vue";
import CarCard from "@/components/CarCard.vue";

export default {
  name: "BuyPassForm",
  components: {PassCard, CarCard},
  data(){
    return{
      passes: [],
      selected_pass: 0,
      cars: [],
      selected_car: 0,
      mode: "navigate_pass",
      card_owner: "",
      card_number: "",
      expiry_month: "",
      expiry_year: "",
      cvv: ""
    }
  },
  props: ['garage'],
  methods: {
    dec_index() {
      this.selected_pass = this.selected_pass === 0 ? this.passes.length - 1 : this.selected_pass - 1
    },
    inc_index() {
      this.selected_pass = this.selected_pass === this.passes.length - 1 ? 0 : this.selected_pass + 1
    },
    dec_index_car() {
      this.selected_car = this.selected_car === 0 ? this.cars.length - 1 : this.selected_car - 1
    },
    inc_index_car() {
      this.selected_car = this.selected_car === this.cars.length - 1 ? 0 : this.selected_car + 1
    },
    previous(){
      if(this.mode === "navigate_pass"){
        this.$emit("close")
      }else if(this.mode === "navigate_car"){
        this.mode = "navigate_pass"
      }else if(this.mode === "buy"){
        this.mode = "navigate_car"
      }
    },
    next(){
      if(this.mode === "navigate_pass"){
        this.mode = "navigate_car"
      }else if(this.mode === "navigate_car"){
        this.mode = "buy"
      }
    },
    addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    isFormSubmittable(){
      return this.card_owner.length > 0 && this.card_number > 0 && this.expiry_month > 0 && this.expiry_year > 0 && this.cvv > 0
    },
    buy(){
      const start = new Date(this.addDays(new Date(), 1).setHours(0, 0, 0, 0))
      const end = new Date(this.addDays(new Date(), this.passes[this.selected_pass].duration).setHours(23, 59, 59, 999))
      axios.put('http://localhost:3000/buy', {
        'pass_id': this.passes[this.selected_pass]._id.toString(),
        'car_id': this.cars[this.selected_car]._id.toString(),
        'start': new Date(Date.parse(start.toLocaleString('en-US', {timeZone: 'Europe/Helsinki'}))),
        'end': new Date(Date.parse(end.toLocaleString('en-US', {timeZone: 'Europe/Helsinki'}))),
      })
          .then(() => {
            this.mode = "bought"
          }).catch(error => {
        if(error.response){
          console.log(error)
        }
      })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/passes/' + this.garage.owner + "/" + this.garage.name, {params: {"visible": true}}).then((response) => {
      this.passes = response.data
    })

    axios.get('http://localhost:3000/cars/' + sessionStorage.getItem("email"), {params: {"visible": true}}).then((response) => {
      this.cars = response.data
    })
  }
}
</script>

<style scoped>

:deep(.car-card){
  padding: 5px 0;
  min-height: 0;
  min-width: 0;
  width: 300px;
  border-radius: 50px;
  height: 230px;
}

.overlay-container{
  position:absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: rgb(255, 255, 255, 0.5);
}

.overlay-div{
  height: 500px;
  width: 400px;
  background-color: white;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
}

.successful_purchase{
  height: 200px;
  width: 400px;
  background-color: #9ce1f4;
  box-shadow: 5px 10px 20px 0px #b0b0b0;
  border-radius: 30px;
}

</style>