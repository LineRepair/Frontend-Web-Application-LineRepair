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
                <v-overflow-btn
                    :items="statesBrands"
                    item-text="name"
                    label="Brand"
                    outlined
                    v-model="item.brandName"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="12">
                <v-overflow-btn
                    :items="statesModels"
                    item-text="model"
                    label="Model"
                    outlined
                    return-object
                    v-model="item.model"
                ></v-overflow-btn>
              </v-col>
              <v-col>
                <v-text-field
                    label="Year of purchase*"
                    required
                    outlined
                    v-model="item.purchaseDate"
                ></v-text-field>
              </v-col>
              <!--<v-col cols="12">
                <v-text-field
                    label="Image Path*"
                    required
                    outlined
                    v-model="item.imgPath"
                ></v-text-field>
              </v-col>-->
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
            Delete appliance
          </v-card-title>
          <v-card-text>¿You are sure to dispose of your appliance?</v-card-text>
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
                @click="deleteAppliance"
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
  name: "Client-appliance-dialog",
  props: {
    dialog: Boolean,
    edit: Boolean,
    title: String,
    item: Object,
    states: Array,
    brandsWithModels: Array
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
      this.$emit("client-appliance-information", this.item);
    },
    deleteAppliance() {
      this.$emit("delete-client-appliance", this.item.id);
      this.dialogDelete = false;
    }
  },
  computed: {
    statesBrands: function() {
      let brands = [];

      for (let brand of this.brandsWithModels) {
        brands.push(brand.name);
      }

      return brands;
    },
    statesModels: function () {
      let models = [];

      for (let brand of this.brandsWithModels) {
        if ((this.item).brandName === brand.name) {
          for (let model of brand.models) {
            models.push(model);
          }
          break;
        }
      }

      return models;
    }
  }
}
</script>

<style scoped>

</style>