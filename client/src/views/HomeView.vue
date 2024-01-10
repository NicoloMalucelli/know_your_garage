<template>
  <Header selected_item="home" ></Header>
  <div class="home">
    <div class="d-flex justify-content-center mt-5" >

      <div>Welcome Nicolò! <br> You don't have any active parking or membership at the moment </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Header,
    Footer,
  },
});

</script>
