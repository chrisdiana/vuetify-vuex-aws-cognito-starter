<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-text>
      <p>In order to change your password, a verification code will be sent to your email.</p>
      <v-text-field
        v-model="email"
        label="Email"
        v-show="emailDisplayed"
        :rules="[rules.email]"
        name="reset"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="darken-1" text @click="$emit('cancel')">Cancel</v-btn>
      <v-btn
        color="primary"
        @click="sendResetCode"
        :disabled="validEmail(email) !== true">
        Send Reset Code
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { validEmail } from '@/plugins/utils';


export default {
  name: 'ResetPasswordCode',
  props: {
    'title': String,
    'emailDisplayed': {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      validEmail,
      rules: {
        required: v => !!v || 'Required.',
        email: validEmail
      },
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
    }
  },
  methods: {
    ...mapActions('cognito', ['forgotPassword']),
    ...mapActions(['handleError']),
    ...mapMutations(['setEmail', 'setSnackbar', 'setPassword']),
    sendResetCode() {
      this.forgotPassword({ username: this.email })
        .then(() => {
          this.$emit('resetCodeSent')
          this.setSnackbar({
            type: 'success',
            msg: `Verification code sent to ${this.email}.`
          });
        })
        .catch(this.handleError);
    },
  },
}
</script>
