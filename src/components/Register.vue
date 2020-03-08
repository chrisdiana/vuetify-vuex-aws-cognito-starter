<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">

        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Create your account</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="form" class="mb-5">
              <v-text-field
                v-model="firstName"
                :rules="[rules.required('Enter first name')]"
                label="First name"/>
              <v-text-field
                v-model="lastName"
                :rules="[rules.required('Enter last name')]"
                label="Last name"/>
              <v-text-field
                v-model="email"
                :rules="[rules.required('Enter your email address')]"
                label="Email"
                hint="You can use letters, numbers & periods"
                name="email"
                persistent-hint/>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required('Enter a password')]"
                :type="show ? 'text' : 'password'"
                label="Password"
                @click:append="show = !show"/>
              <v-text-field
                v-model="confirmPassword"
                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required('Confirm you password'), rules.confirm]"
                :type="showConfirm ? 'text' : 'password'"
                label="Confirm password"
                @click:append="showConfirm = !showConfirm"/>
              <v-messages
                :value="['Use 8 or more characters with a mix of letters, numbers & symbols']"/>
              </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/login">
              Sign in instead
            </v-btn>
            <v-spacer/>
            <v-btn
              class="primary"
              :disabled="!form"
              :loading="isLoading"
              prominent
              @click="register">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirm Email -->
    <v-row justify="center">
      <v-dialog v-model="confirmDialog" persistent max-width="320">
        <ConfirmCode />
      </v-dialog>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import ConfirmCode from '@/components/ConfirmCode';


export default {
  name: 'Register',
  components: {
    ConfirmCode,
  },
  data() {
    return {
      confirmDialog: false,
      isLoading: false,
      form: false,
      firstName: undefined,
      lastName: undefined,
      confirmPassword: undefined,
      rules: {
        required: msg => v => !!v || msg,
        confirm: v => v ? v === this.password : 'Passwords do not match',
      },
      show: false,
      showConfirm: false,
    };
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
    ...mapActions('cognito', ['registerUser', 'signInUser']),
    ...mapActions(['handleError']),
    ...mapMutations(['setSnackbar', 'setEmail', 'setPassword', 'setIsLoading']),
    register() {
      if (!this.$refs.form.validate()) return;

      this.isLoading = true;

      this.registerUser({
          username: this.email,
          password: this.password,
          attributes: {
            name: `${this.firstName} ${this.lastName}`,
            email: this.email
          }
        })
        .then(() => {
          this.confirmDialog = true;
          this.setSnackbar({
            type: 'success',
            msg: 'Account created. Check your email for verification'
          });
          this.setEmail(this.email);
          this.setPassword(this.password);
        })
        .catch(this.handleError)
        .finally(() => { this.isLoading = false })
    },
  }
}
</script>
