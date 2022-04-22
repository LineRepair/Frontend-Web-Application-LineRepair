<template>
  <div>
    <v-card class="pa-2" v-for="announcement in announcements" :key="announcement.id" >
      <div v-if="announcement.visible">
        <v-card-title>{{ announcement.title }}</v-card-title>
        <v-card-subtitle>{{ announcement.description }}</v-card-subtitle>
        <v-card-text>{{ announcement.content }}</v-card-text>
        <v-img :src="announcement.urlToImage"></v-img>
        <div class="d-flex">
          <v-chip
              class="ml-auto mr-2"
              :color="announcement.typeOfAnnouncement === 'Informative' ? 'green' : 'red'"
          >
            {{ announcement.typeOfAnnouncement }}
          </v-chip>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import AnnouncementsApiService from "../../core/services/announcements-api-service";

export default {
  name: "Home",
  data() {
    return {
      announcements: [],
    }
  },
  methods: {
    async retrieveAnnouncements() {
      await AnnouncementsApiService.getAll()
        .then(response => {
          this.announcements = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveAnnouncements();
  }
}
</script>

<style scoped>

</style>