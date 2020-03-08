<template>
  <section id="login">
    <Login v-if="!isLoggedIn"/>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Login from '@/components/Login';

export default {
  components: {
    Login,
  },
  computed: {
    ...mapGetters('cognito', ['isLoggedIn']),
  },
}
</script>
