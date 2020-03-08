<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="8">
        <h1>Account Settings</h1>
        <v-text-field
          v-model="userAttributes.name"
          label="Name"
          disabled>
        </v-text-field>
        <v-text-field
          v-model="userAttributes.email"
          label="Email"
          disabled>
        </v-text-field>
        <v-btn
          class="ma-0"
          @click="resetPasswordCodeDialog = true">
          Change Password
        </v-btn>
      </v-col>
    </v-row>

    <!-- Forgot Password -->
    <v-row justify="center">
      <v-dialog v-model="resetPasswordCodeDialog" max-width="320">
        <ResetPasswordCode
          :title="'Change Password'"
          :emailDisplayed="false"
          @cancel="closeDialogs"
          @resetCodeSent="resetCodeSent"/>
      </v-dialog>
    </v-row>

    <!-- Reset Password -->
    <v-row justify="center">
      <v-dialog v-model="resetPasswordDialog" max-width="320">
        <ResetPassword @cancel="closeDialogs" @passwordReset="passwordReset"/>
      </v-dialog>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import ResetPassword from '@/components/ResetPassword';
import ResetPasswordCode from '@/components/ResetPasswordCode';

export default {
  data: () => ({
    resetPasswordDialog: false,
    resetPasswordCodeDialog: false,
  }),
  computed: {
    ...mapGetters('cognito', ['userAttributes']),
    email: {
      get() {
        return this.$store.state.email;
      },
      set(val) {
        this.setEmail(val);
      }
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(val) {
        this.setPassword(val);
      }
    },
  },
  components: {
    ResetPassword,
    ResetPasswordCode,
  },
  methods: {
    ...mapMutations(['setPassword']),
    passwordReset() {
      this.closeDialogs();
      this.setPassword('');
    },
    resetCodeSent() {
      this.resetPasswordCodeDialog = false;
      this.resetPasswordDialog = true;
    },
    closeDialogs() {
      this.resetPasswordDialog = false;
      this.resetPasswordCodeDialog = false;
    },
  }
}
</script>
