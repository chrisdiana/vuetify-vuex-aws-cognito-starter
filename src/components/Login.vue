<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">

        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                autofocus
                label="Email"
                name="email"
                prepend-icon="mdi-account"/>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                class="mb-3"
                label="Password"
                :rules="[rules.required]"
                name="password"
                prepend-icon="mdi-lock"
                @click:append="show = !show" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="text-uppercase ma-0"
              to="/register">
              Create account
            </v-btn>
            <v-spacer/>
            <v-btn
              class="ma-0"
              @click="resetPasswordCodeDialog = true"
              x-small
              text>
              Forgot Password
            </v-btn>
            <v-btn
              :disabled="(password.length < 3) || (validEmail(email) !== true)"
              class="text-uppercase ma-0"
              color="primary"
              @click="login">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Forgot Password -->
    <v-row justify="center">
      <v-dialog v-model="resetPasswordCodeDialog" max-width="320">
        <ResetPasswordCode :title="'Forgot Password?'" @cancel="closeDialogs" @resetCodeSent="resetCodeSent"/>
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
import { mapActions, mapMutations, mapState } from 'vuex';
import ResetPassword from '@/components/ResetPassword';
import ResetPasswordCode from '@/components/ResetPasswordCode';
import { defaultRoute } from '@/router';
import { validEmail } from '@/modules/utils';


export default {
  name: 'Login',
  data() {
    return {
      show: false,
      resetPasswordDialog: false,
      resetPasswordCodeDialog: false,
      validEmail,
      rules: {
        required: v => !!v || 'Required.',
        email: validEmail
      }
    };
  },
  components: {
    ResetPassword,
    ResetPasswordCode,
  },
  computed: {
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
  methods: {
    ...mapActions('cognito', ['signInUser']),
    ...mapActions(['handleError']),
    ...mapMutations(['setIsLoading', 'setSnackbar', 'setEmail', 'setPassword']),
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
    passwordReset() {
      this.closeDialogs();
      this.login();
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
  },
}
</script>
