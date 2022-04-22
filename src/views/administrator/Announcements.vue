<template>
  <v-container>
    <h1 class="mb-2">Announcements</h1>

    <!-- List - START -->
    <v-list>
      <template v-for="(announcement, index) in announcements">
        <v-list-item :key="announcement.id">
          <v-list-item-content>
            <v-list-item-title v-text="announcement.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-row class="alignedItems"
            >
              <v-btn
                  v-if="!announcement.visible"
                  color="error"
                  x-small
                  @click="handleVisibleItem(announcement)"
              >
                No Visible
              </v-btn>
              <v-btn
                  v-else
                  color="success"
                  x-small
                  @click="handleVisibleItem(announcement)"
              >
                Visible
              </v-btn>
              <v-btn
                  icon
                  @click="openDialogEdit(announcement)"
              >
                <v-icon
                    color="grey lighten-1"
                    small
                >
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < announcements.length - 1"
          :key="index.id"></v-divider>
      </template>
    </v-list>
    <!-- List - END -->

    <!-- Edit Dialog - START -->
    <v-dialog
        v-model="openEdit"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Announcement </span>
        </v-card-title>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-text-field
                v-model="editItem.title"
                label="Title"
                :counter="40"
                required
                outlined
                :rules="titleRules"
                id="title"
                aria-labelledby="title"
            ></v-text-field>
            <v-text-field
                v-model="editItem.description"
                label="Description"
                :counter="70"
                required
                outlined
                :rules="descriptionRules"
                id="description"
                aria-labelledby="description"
            ></v-text-field>
            <v-text-field
                v-model="editItem.typeOfAnnouncement"
                label="Type"
                :counter="15"
                required
                outlined
                :rules="typeRules"
                id="type"
                aria-labelledby="type"
            ></v-text-field>
            <v-textarea
                v-model="editItem.content"
                label="Content"
                rows="1"
                auto-grow
                :counter="150"
                required
                outlined
                :rules="contentRules"
                id="content"
                aria-labelledby="content"
            ></v-textarea>
            <v-text-field
                v-model="editItem.urlToImage"
                label="Image Url"
                required
                outlined
                id="urlToImage"
                aria-labelledby="urlToImage"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openEdit = false"
          >
            Close
          </v-btn>
          <v-btn
              text
              color="primary"
              :disabled="!valid"
              @click="updateAnnouncement(editItem.id, editItem)"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit Dialog - END -->

  </v-container>
</template>
<script>
import AnnouncementsApiService from "../../core/services/announcements-api-service"

export default {
  name: "Announcements",
  data() {
    return {
      search: '',
      bySearch: false,
      announcements: [],
      openEdit: false,
      editItem: {
        title: '',
        description: '',
        content: '',
        urlToImage: '',
        typeOfAnnouncement: '',
      },
      valid: true,
      titleRules: [
        v => !!v || ' Tile is required',
        v => (v && v.length <= 40) || 'Title must be less than 15 characters',
      ],
      descriptionRules: [
        v => !!v || ' Description is required',
        v => (v && v.length <= 70) || 'Description must be less than 15 characters',
      ],
      contentRules: [
        v => !!v || ' Content is required',
        v => (v && v.length <= 150) || 'Content must be less than 15 characters',
      ],
      typeRules: [
        v => !!v || 'Type is required',
        v => (v && v.length <= 15) || 'Type must be less than 15 characters',
      ],
      sectionRules: [
        v => !!v || 'Section is required',
        v => (v && v.length <= 15) || 'Section must be less than 15 characters',
      ],
    }
  },
  methods: {
    getAnnouncement(announcement) {
      return {
        id: announcement.id,
        title: announcement.title,
        description: announcement.description,
        content: announcement.content,
        urlToImage: announcement.urlToImage,
        typeOfAnnouncement: announcement.typeOfAnnouncement,
        visible: announcement.visible
      }
    },
    async retrieveAnnouncements(){
      await AnnouncementsApiService.getAll()
      .then(response => {
        this.announcements = response.data.map(this.getAnnouncement);
      })
      .catch(e => {
        console.log(e);
      });
    },
    openDialogEdit(item){
      this.editItem = Object.assign({}, item);
      this.openEdit = true;
    },
    async updateAnnouncement(id, item) {
      switch (item.typeOfAnnouncement) {
        case "Informative": {
          item.typeOfAnnouncement = 1;
          break;
        }
        case "Advertisement": {
          item.typeOfAnnouncement = 2;
          break;
        }
      }

      await AnnouncementsApiService.update(id, item)
        .then(() =>{
          this.retrieveAnnouncements();
          this.openEdit = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleVisibleItem(item) {
      this.editItem = Object.assign({}, item);
      this.editItem.visible = !this.editItem.visible
      this.updateAnnouncement(this.editItem.id, this.editItem)
    },
  },
  mounted() {
    this.retrieveAnnouncements()
  }

}
</script>

<style scoped>
.alignedItems {
  justify-content: center;
  align-items: center;
}
</style>