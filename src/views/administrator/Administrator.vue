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
  name: "Administrator.vue",
  data() {
    return {
      itemsNavigation: [
        {title: 'Business', icon: 'mdi-chart-line', path: '/administrator'},
        {title: 'Spare requests', icon: 'mdi-email-outline', path: '/administrator/spare-parts-requests'},
        {title: 'Technicians statistics', icon: 'mdi-chart-box-outline', path: '/administrator/technicians-statics'},
        {title: 'Announcements', icon: 'mdi-new-box', path: '/administrator/announcements'},
        {title: 'Technicians', icon: 'mdi-account-hard-hat', path: '/administrator/technicians'},
        {title: 'Reports', icon: 'mdi-clipboard-list-outline', path: '/administrator/reports'},
        {title: 'Products', icon: 'mdi-television', path: '/administrator/products'}
      ]
    }
  },
  components: {
    NavigationDrawer
  }
}
</script>

<style scoped>

</style>