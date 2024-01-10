<template>
  <Header selected_item="my_cars" ></Header>
  <div class="home">
    <div class="d-flex justify-content-center mt-5" >

    </div>
  </div>
  <Footer></Footer>
</template>

<script>

import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "MyCars",
  components: {
    Header,
    Footer,
  },
});

</script>
