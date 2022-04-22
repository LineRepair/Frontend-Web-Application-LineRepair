<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
            :complete="step > 1"
            step="1"
        >
          Email and password
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="step > 2"
            step="2"
        >
          Personal information
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="step > 3"
            step="3"
        >
          Finish
        </v-stepper-step>
      </v-stepper-header>

      <!-- email and password registration start-->
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form
              ref="formEmailAndPassword"
              v-model="formEmailAndPassword.isValid"
          >
            <v-text-field
                v-model="formEmailAndPassword.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                outlined
            >
            </v-text-field>
            <v-text-field
                v-model="formEmailAndPassword.password"
                :append-icon="formEmailAndPassword.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.password, rules.passwordLength]"
                :type="formEmailAndPassword.showPassword ? 'text' : 'password'"
                name="input-password"
                label="Password"
                outlined
                @click:append="formEmailAndPassword.showPassword = !formEmailAndPassword.showPassword"
            ></v-text-field>
          </v-form>

          <div class="d-flex">
            <v-spacer></v-spacer>

            <v-btn
                color="primary"
                @click="registerUser"
                :disabled="!this.formEmailAndPassword.isValid"
            >
              Continue
            </v-btn>

            <v-btn
                text
                color="warning"
                to="/"
            >
              Cancel
            </v-btn>
          </div>
        </v-stepper-content>
        <!-- email and password registration end-->

        <!-- personal information registration start -->
        <v-stepper-content step="2">
          <v-form
              ref="formPersonalInformation"
              v-model="formPersonalInformation.isValid"
          >
            <v-text-field
                v-model="formPersonalInformation.names"
                label="Names"
                :rules="[rules.required, rules.maxLength30]"
                counter="30"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="formPersonalInformation.lastNames"
                label="Lastnames"
                :rules="[rules.required, rules.maxLength30]"
                counter="30"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="formPersonalInformation.address"
                label="Address"
                :rules="[rules.required, rules.maxLength50]"
                counter="50"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="formPersonalInformation.cellphoneNumber"
                label="Cellphone number"
                :rules="[rules.required, rules.cellphoneNumber]"
                counter="9"
                outlined
            ></v-text-field>
          </v-form>

          <div class="d-flex">
            <v-spacer></v-spacer>

            <v-btn
                color="primary"
                :disabled="!this.formPersonalInformation.isValid"
                @click="registerClient"
            >
              Register
            </v-btn>

            <v-btn
                text
                color="warning"
                to="/"
            >
              Cancel
            </v-btn>
          </div>
        </v-stepper-content>
        <!-- personal information registration end -->

        <!-- registration completed start -->
        <v-stepper-content step="3">
          <h1 class="text-center">Thank you for registering with iElectric</h1>
          <p class="text-center">Login to continue</p>

          <div class="d-flex">
            <v-btn
                class="mx-auto"
                color="primary"
                to="/login"
            >
              Sign In
            </v-btn>
          </div>
        </v-stepper-content>
        <!-- registration completed end -->
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import ClientsApiService from '../../core/services/clients-api-service';

export default {
  name: "Register",
  data() {
    return {
      step: 1,
      userId: Number,
      formEmailAndPassword: {
        isValid: false,
        email: "",
        password: "",
        showPassword: false
      },
      formPersonalInformation: {
        isValid: false,
        names: "",
        lastNames: "",
        address: "",
        cellphoneNumber: "",
      },
      rules: {
        required: v => !!v || 'Required',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || 'Invalid e-mail.';
        },
        password: v => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          return pattern.test(v) || 'The password must have at least one capital letter and one number';
        },
        cellphoneNumber: v => {
          const pattern = /^(9)([0-9]){8}$/
          return pattern.test(v) || 'Wrong number';
        },
        passwordLength: v => v.length >= 8 || 'Min 8 characters',
        maxLength30: v => v.length <= 30 || 'Max 30 characters',
        maxLength50: v => v.length <= 50 || 'Max 50 characters'
      }
    }
  },
  methods: {
    registerUser() {
      const newUser = {
        email: this.formEmailAndPassword.email,
        password: this.formEmailAndPassword.password
      }
      this.$store.dispatch("auth/register", newUser)
          .then((response) => {
            console.log(response);
            this.userId = response.id;
            this.step = 2;
          })
          .catch(e => {
            console.log(e);
            alert("The email already exists");
          });
    },
    async registerClient() {
      const newClient = {
        names: this.formPersonalInformation.names,
        lastNames: this.formPersonalInformation.lastNames,
        cellphoneNumber: this.formPersonalInformation.cellphoneNumber,
        address: this.formPersonalInformation.address,
        userId: this.userId
      }
      await ClientsApiService.create(newClient)
          .then(response => {
            console.log(response);
            this.step = 3;
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}
</script>

<style scoped>

</style>