<template>
  <div>
    <div id="main">
      <AppHeader />
      <slot />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  name: "HomeLayout",
};
</script>
