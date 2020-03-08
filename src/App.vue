<template>
  <v-app>
    <v-fade-transition hide-on-leave>
      <Navigation v-if="isLoggedIn" />
    </v-fade-transition>

    <Snackbar/>
    <Loader/>

    <v-fade-transition hide-on-leave>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-fade-transition>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Snackbar: () => import('@/components/Snackbar'),
    Navigation: () => import('@/components/Navigation'),
    Loader: () => import('@/components/Loader'),
  },
  computed: {
    ...mapGetters('cognito', ['isLoggedIn']),
  },
};
</script>
