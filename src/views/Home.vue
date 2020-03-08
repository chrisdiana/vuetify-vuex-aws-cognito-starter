<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="8">
        <h1>Home</h1>
        {{ userAttributes }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters('cognito', ['userAttributes']),
  },
}
</script>
