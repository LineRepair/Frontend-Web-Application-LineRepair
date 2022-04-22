<template>
  <v-navigation-drawer app permanent class="primary">
    <v-list-item class="white--text">
      <v-list-item-content>
        <v-list-item-title class="text-h3 font-weight-bold">
          iElectric
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="white"></v-divider>

    <v-list nav>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="white--text"
          :to="item.path"
          exact
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
            block
            class="accent"
            @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navigation-drawer",
  props: {
    items: Array
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('client');
      localStorage.removeItem('technician');
      localStorage.removeItem('administrator');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>