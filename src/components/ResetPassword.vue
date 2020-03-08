<template>
  <v-card>
    <v-card-title class="headline">Change Password</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="code"
        :rules="[rules.required('Enter a reset code')]"
        label="Reset Code"
        @click:append="show = !show"
      />
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required('Enter a password')]"
        :type="show ? 'text' : 'password'"
        label="Password"
        @click:append="show = !show"
      />
      <v-text-field
        v-model="confirmPassword"
        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required('Confirm you password'), rules.confirm]"
        :type="showConfirm ? 'text' : 'password'"
        label="Confirm password"
        @click:append="showConfirm = !showConfirm"
      />
      <v-messages
        :value="['Use 8 or more characters with a mix of letters, numbers & symbols']"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="darken-1" text @click="$emit('cancel')" >Cancel</v-btn>
      <v-btn
        color="primary"
        @click="resetPassword"
        :disabled="(password !== confirmPassword) || (password.length < 3)">
        Reset Password
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: 'ResetPassword',
  data() {
    return {
      code: undefined,
      password: '',
      confirmPassword: '',
      rules: {
        required: msg => v => !!v || msg,
        confirm: v => v ? v === this.password : 'Passwords do not match',
      },
      show: false,
      showConfirm: false,
    }
  },
  computed: {
    ...mapState(['email']),
  },
  methods: {
    ...mapActions('cognito', ['changePassword']),
    ...mapActions(['handleError']),
    ...mapMutations(['setSnackbar', 'setPassword']),
    resetPassword() {
      this.changePassword({
          username: this.email,
          code: this.code,
          newPassword: this.password,
        })
        .then(() => {
          this.setPassword(this.password);
          this.$emit('passwordReset');
          this.setSnackbar({
            type: 'success',
            msg: `Password reset for ${this.email}.`
          });
        })
        .catch(this.handleError);
    },
  },
}
</script>
