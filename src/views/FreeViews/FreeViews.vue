<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-app-bar-title
          to="/"
          class="text-h5"
      >
        iElectric
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
          href="https://ielectric-es3b.github.io/Landing-Page-iElectric/"
          plain
      >
        Home
      </v-btn>
      <v-btn
          to="/login"
          class="ml-2"
          outlined
      >
        Login
      </v-btn>
      <v-btn
          to="/"
          class="ml-2"
          color="accent"
      >
        Register
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "FreeViews"
}
</script>

<style scoped>

</style>