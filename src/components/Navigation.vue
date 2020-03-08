<template>
  <v-app-bar app color="primary" dark>

    <router-link to="/">
      <div class="d-flex align-center">
        <v-icon>mdi-circle</v-icon>
      </div>
    </router-link>

    <v-spacer></v-spacer>

      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" text>
          <span class="mr-2">{{ userAttributes.email }}</span>
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/settings">
          <v-list-item-title>Account Settings</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters('cognito', ['userAttributes']),
  },
  methods: {
    ...mapActions('cognito', ['signOut']),
    ...mapActions(['handleError']),
    ...mapMutations(['setIsLoading', 'setEmail', 'setPassword']),
    logout() {
      this.setIsLoading(true);
      this.signOut()
        .then((e) => {
          this.$router.push('/login').catch(() => {});
          this.setEmail('');
          this.setPassword('');
        })
        .catch(this.handleError)
        .finally(() => {
          setTimeout(() => { this.setIsLoading(false) }, 1000);
        });
    }
  }
};
</script>
