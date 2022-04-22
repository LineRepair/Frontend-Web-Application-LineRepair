<template>
  <v-app>
    <NavigationDrawer v-bind:items="itemsNavigation"/>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from '../../components/Navigation-drawer.vue'

export default {
  name: "Client.vue",
  data: () => ({
    itemsNavigation: [
      { title: 'Home', icon: 'mdi-home-outline', path: '/client' },
      { title: 'Appliances', icon: 'mdi-stove', path: '/client/appliance' },
      { title: 'My plan', icon: 'mdi-clipboard-list-outline', path: '/client/plan' },
      { title: 'My reservations', icon: 'mdi-clipboard-list-outline', path: '/client/reservation' },
      { title: 'Profile', icon: 'mdi-account-outline', path: '/client/profile' },
    ]
  }),
  components: {
    NavigationDrawer
  }
}
</script>

<style scoped>

</style>