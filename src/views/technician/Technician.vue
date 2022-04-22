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
  name: "Technician.vue",
  data: () => ({
    itemsNavigation: [
      { title: 'My route', icon: 'mdi-map-legend', path: '/technician' },
      { title: 'Reports', icon: 'mdi-clipboard-list-outline', path: '/technician/reports' },
      { title: 'Requests', icon: 'mdi-wrench', path: '/technician/requests' },
      { title: 'Profile', icon: 'mdi-account-hard-hat', path: '/technician/profile' }
    ]
  }),
  components: {
    NavigationDrawer
  }
}
</script>

<style scoped>

</style>