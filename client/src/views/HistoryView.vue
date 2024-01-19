<template>
  <Header :selected_item="'history'"></Header>
  

</template>

<script>

import {defineComponent} from "vue"
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "HistoryView",
  components: {Header}
})

</script>

<style scoped>

</style>