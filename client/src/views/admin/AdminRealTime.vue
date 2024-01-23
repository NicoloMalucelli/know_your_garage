<template>
  <AdminHeader :selected_item="'real_time'"></AdminHeader>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import io from 'socket.io-client';

export default {
  name: "AdminRealTime",
  components: {AdminHeader},
  data(){
    return{
      socket: io('localhost:3000')
    }
  },
  mounted() {
    this.socket.on('parkings_changed', (newParking) => {
      console.log(newParking)
    })
  }
}
</script>

<style scoped>

</style>