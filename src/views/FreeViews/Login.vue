<template>
  <v-container class="d-flex flex-lg-row flex-column mt-5 container">
    <v-container>
      <h1>Login</h1>
      <v-img
          src="../../assets/img/user.png"
          max-width="200px"
          alt="user image"
          class="mx-auto mt-10"
      ></v-img>
    </v-container>
    <v-container>
      <h2 class="mb-6">Welcome back</h2>

      <v-form
          ref="form"
          v-model="form.isValid"
      >
        <!-- login with email and password start -->
        <p
            class="mb-4 red--text"
            :class="wrongEmailOrPassword ? 'd-block' : 'd-none'"
        >Wrong email or password</p>

        <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            outlined
        ></v-text-field>
        <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            name="input-password"
            label="Password"
            outlined
            @click:append="showPassword = !showPassword"
        ></v-text-field>
        <!-- login with email and password end -->

        <div class="d-flex">
          <a>I forgot my password</a>

          <v-spacer></v-spacer>

          <v-btn
              color="primary"
              :disabled="!this.form.isValid"
              @click="handleLogin"
          >
            Login
          </v-btn>
        </div>

        <div class="flex-column my-5">
          <v-divider></v-divider>
          <p class="text-center grey--text">Or</p>
        </div>

        <!-- login with social networks start-->
        <div class="mb-5 d-flex">
          <GoogleLogin
              class="button"
              :params="params"
              :renderParams="renderParams"
              v-bind:onSuccess="onSignInWithGoogle"
          ></GoogleLogin>
          <button
              class="button facebook-button"
              type="button"
              @click="logInWithFacebook"
          >
            <v-icon color="white">mdi-facebook</v-icon>
            Signed in with Facebook
          </button>
        </div>
        <!-- login with social networks  end-->

        <p>
          You don't have an account? <a href="/register">Sign up</a>
        </p>

        <p
            class="mb-4 red--text text-center"
            :class="wrongGoogleAccount ? 'd-block' : 'd-none'"
        >Wrong Google account</p>
        <p
            class="mb-4 red--text text-center"
            :class="wrongFacebookAccount ? 'd-block' : 'd-none'"
        >Wrong Facebook account</p>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import ClientsApiService from '../../core/services/clients-api-service';
import TechniciansApiService from '../../core/services/technicians-api-service';
import AdministratorsApiService from '../../core/services/administrators-api-service';
import GoogleLogin from 'vue-google-login';

export default {
  name: "Login",
  components: {
    GoogleLogin
  },
  data() {
    return {
      showPassword: false,
      form: {
        email: "",
        password: "",
        isValid: false
      },
      rules: {
        required: v => !!v || 'Required',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'
        }
      },
      wrongEmailOrPassword: false,
      wrongGoogleAccount: false,
      wrongFacebookAccount: false,
      params: {
        client_id: "982010749502-rf1ibbd19ouesia0udlg2nmbh6bga7f5.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    submit() {
      this.form = { email: "", password: "" };
    },
    handleLogin() {
      const user = {
        email: this.form.email,
        password: this.form.password
      }

      this.$store.dispatch("auth/login", user)
          .then((response) => {
            this.goToView(response.id);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async goToView(userId) {
      let noLogin = true;

      //check if the user is a client
      await ClientsApiService.getByUserId(userId)
          .then(response => {
            localStorage.setItem('client', JSON.stringify(response.data));
            noLogin = false;
            this.$router.push("/client");
          })
          .catch(e => {
            console.log(e);
          });

      //check if the user is a technician
      if (noLogin) {
        await TechniciansApiService.getByUserId(userId)
            .then(response => {
              localStorage.setItem('technician', JSON.stringify(response.data));
              noLogin = false;
              this.$router.push("/technician");
            })
            .catch(e => {
              console.log(e);
            });
      }

      //check if the user is a administrator
      if (noLogin) {
        await AdministratorsApiService.getByUserId(userId)
            .then(response => {
              localStorage.setItem('administrator', JSON.stringify(response.data));
              noLogin = false;
              this.$router.push("/administrator");
            })
            .catch(e => {
              console.log(e);
            });
      }

      if (noLogin) {
        this.wrongEmailOrPassword = true;
      }
      else {
        this.submit();
      }
    },
    //login with google account
    async onSignInWithGoogle(googleUser) {
      let profile = googleUser.getBasicProfile();

      await ClientsApiService.getById(profile.getId().toString())
        .then(response => {
          console.log(response.data);
          localStorage.setItem('userId', response.data[0].id.toString());
          this.$router.push("/client");
          this.submit();
        })
        .catch(e => {
          console.log(e);
          this.wrongGoogleAccount = true;
        });
    },
    //login with facebook account start
    async logInWithFacebook() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();

      await window.FB.login(async function (response) {
        if (response.authResponse) {
          console.log(response.authResponse.userID);
          await ClientsApiService.getById(response.authResponse.userID.toString())
              .then(response => {
                console.log(response.data);
                localStorage.setItem('userId', response.data[0].id.toString());
                this.$router.push("/client");
                this.submit();
              })
              .catch(e => {
                console.log(e);
              });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: ['user_likes', 'email'],
        return_scopes: true
      });

      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: "239546461479131",
          cookie: true,
          version: "v13.0"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
    //login with facebook account end
  }
}
</script>

<style scoped>
  .container {
    max-width: 1200px;
  }

  .button {
    width: 50%;
  }

  .facebook-button {
    border-radius: 1px;
    background-color: #3b5998;
    color: white;
    box-shadow: 0px 1px 3px 2px #cbcbcb;
  }

  .facebook-button:hover {
    box-shadow: 0px 0px 4px 2px #69ace3;
  }
</style>