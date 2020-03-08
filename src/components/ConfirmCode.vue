<template>
  <v-card>
    <v-card-title class="headline">Confirm Code</v-card-title>
    <v-card-text>
      Check your email for a verification code and enter it here to confirm your account.
      <v-text-field
        v-model="confirmCode"
        label="Verification Code"
        :rules="[rules.confirmCode]"
        name="confirm"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="resendConfirmCode">Resend Code</v-btn>
      <v-btn class="primary" @click="confirmEmail" :disabled="confirmCode.length < 3">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { defaultRoute } from '@/router';


export default {
  name: 'ConfirmCode',
  data() {
    return {
      confirmCode: '',
      hasError: false,
      rules: {
        confirmCode: v => v ? this.confirmCode.length > 3 : 'Confirmation code must be more than 3 characters'
      },
    };
  },
  computed: {
    ...mapGetters('cognito', ['username']),
    ...mapState(['email', 'password']),
  },
  methods: {
    ...mapActions('cognito', ['registerUser', 'confirmUser', 'resendConfirmation', 'signInUser']),
    ...mapActions(['handleError', 'checkAuth']),
    ...mapMutations(['setIsLoading', 'setSnackbar']),
    login() {
      this.hasError = false;
      this.setIsLoading(true);
      this.signInUser({
          username: this.email,
          password: this.password
        })
        .then(user => {
          this.setSnackbar({
            type: 'success',
            msg: `Successfully signed in user ${this.email}.`
          });
          this.$router.push(defaultRoute).catch(() => {});
        })
        .catch(this.handleError)
        .finally(() => this.setIsLoading(false));
    },
    confirmEmail() {
      if (this.confirmCode.length < 3) return;

      this.confirmUser({
          username: this.username,
          code: this.confirmCode
        })
        .then(() => {
          this.setSnackbar({
            type: 'success',
            msg: 'Account verified.',
          });
          this.login();
        })
        .catch(this.handleError);
    },
    resendConfirmCode() {
      this.resendConfirmation({ username: this.username })
        .then(() => {
          this.setSnackbar({
            type: 'success',
            msg: 'Verification code resent.'
          });
        })
        .catch(this.handleError);
    },
  }
}
</script>
