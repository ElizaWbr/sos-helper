<template>
  <HomeButtons />
</template>

<script>
import { defineComponent } from 'vue';
import HomeButtons from '../components/HomeButtons.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomeButtons,
  },
});
</script>
