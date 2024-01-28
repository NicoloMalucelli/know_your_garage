<template>
  <Header selected_item="my_profile"></Header>
  <ProfileCard class="mb-5"></ProfileCard>
</template>

<script>
import { defineComponent } from "vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Header from "@/components/Header.vue";
export default defineComponent({
  name: "Profile",
  components: {Header, ProfileCard},
})

</script>

<style scoped>
</style>