<template>
  <AdminHeader selected_item="my_profile"></AdminHeader>
  <ProfileCard></ProfileCard>
</template>

<script>
import { defineComponent } from "vue";
import ProfileCard from "@/components/ProfileCard.vue";
import AdminHeader from "@/components/AdminHeader.vue";
export default defineComponent({
  name: "Profile",
  components: {AdminHeader, ProfileCard},
})

</script>

<style scoped>
</style>