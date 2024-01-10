<template>
  <img :src="img_active" @mouseover="img_active = img_open" @mouseleave="img_active = img_close" style="padding: 0; cursor: pointer">
</template>

<script>
export default {
  name: "Bin",
  data() {
    return {
      img_open: require("@/assets/bin/bin_open.png"),
      img_close: require("@/assets/bin/bin_closed.png"),
      img_active: require("@/assets/bin/bin_closed.png")
    }
  }
}
</script>

<style scoped>

</style>