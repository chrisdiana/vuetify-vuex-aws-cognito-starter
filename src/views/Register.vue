<template>
  <section id="register">
    <Register v-if="!isLoggedIn"/>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Register from '@/components/Register';


export default {
  components: {
    Register
  },
  computed: {
    ...mapGetters('cognito', ['isLoggedIn']),
  },
}
</script>
