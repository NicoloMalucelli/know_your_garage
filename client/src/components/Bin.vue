<template>
  <img :src="img_active" @mouseover="img_active = img_open" @mouseleave="img_active = img_close" style="padding: 0; cursor: pointer">
</template>

<script>
export default {
  name: "Bin",
  data() {
    return {
      img_open: new URL('../assets/bin/bin_open.png', import.meta.url).href,//require("@/assets/bin/bin_open.png"),
      img_close: new URL('../assets/bin/bin_closed.png', import.meta.url).href,
      img_active: new URL('../assets/bin/bin_closed.png', import.meta.url).href
    }
  }
}
</script>

<style scoped>

</style>