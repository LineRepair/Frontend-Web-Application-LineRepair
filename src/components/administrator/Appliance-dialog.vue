<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Name*"
                    required
                    outlined
                    v-model="item.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Image Path*"
                    required
                    outlined
                    v-model="item.imgPath"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
              v-if="edit"
              color="red darken-1"
              text
              @click="dialogDelete = true"
          >
            Delete
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="saveInformation"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>

    <!-- Delete Bran Dialog -->
    <v-row>
      <v-dialog
          v-model="dialogDelete"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Delete brand
          </v-card-title>
          <v-card-text>Are you sure to remove the brand?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialogDelete = false"
            >
              Cancel
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="deleteBrand"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>

export default {
  name: "Appliance-dialog",
  props: {
    dialog: Boolean,
    edit: Boolean,
    title: String,
    item: Object
  },
  data() {
    return {
      dialogDelete: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    saveInformation() {
      this.$emit("brand-information", this.item);
    },
    deleteBrand() {
      this.$emit("delete-brand", this.item.id);
      this.dialogDelete = false;
    }
  }
}
</script>

<style scoped>

</style>