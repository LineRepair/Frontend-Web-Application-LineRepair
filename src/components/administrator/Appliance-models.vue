<template>
  <v-container>
    <v-app-bar
        color="white"
        flat
        height="90px"
    >
      <v-btn icon to="/administrator/products" exact>
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-btn
          color="accent"
          class="ml-3"
          @click="openApplianceModelsDialog({})"
      >
        Add
      </v-btn>

      <v-col cols="12" sm="6" class="ml-auto">
        <v-text-field
            outlined
            dense
            class="mt-4"
            append-icon="mdi-magnify"
            label="Search"
        >
        </v-text-field>
      </v-col>
    </v-app-bar>

    <v-app-bar flat dense color="white mb-5">
      <v-toolbar-title class="ma-auto">{{ brandName }}</v-toolbar-title>
    </v-app-bar>

    <v-item-group active-class="primary">
      <v-row>
        <v-col
            v-for="model in applianceModels"
            :key="model.id"
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6"
        >
          <v-item>
            <v-card>
              <v-app-bar flat dense class="white">
                <v-btn
                    color="black"
                    icon
                    class="ml-auto"
                    @click="openApplianceModelsDialog(model)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>

              <v-img
                  :src="model.imgPath"
                  aspect-ratio="1.5"
              ></v-img>

              <v-card-title>
                {{ model.name }}
              </v-card-title>

              <v-card-subtitle>
                {{ model.model }}
              </v-card-subtitle>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ApplianceModelsDialog
        v-bind:dialog="dialog"
        v-bind:edit="editModel"
        v-bind:title="editModel ? 'Edit' : 'New model'"
        v-bind:item="applianceModelItem"
        v-bind:idBrandModel="productId"
        v-on:close-dialog-model="closeAppliancesModelsDialog"
        v-on:model-information="saveInformationModelDialog"
        v-on:delete-model="deleteModel"
    />
  </v-container>
</template>

<script>
import ApplianceBrandsApiService from "../../core/services/appliance-brands-api-service";
import ApplianceModelsApiService from "../../core/services/appliance-models-api-service";
import ApplianceModelsDialog from "../../components/administrator/Appliance-models-dialog";
import ApplianceBrandModelsApiService from "../../core/services/appliance-brand-models-api-service";

export default {
  name: "Appliance-models",
  components: {ApplianceModelsDialog},
  data() {
    return {
      productId: this.$route.params.productId,
      applianceModels: [],
      brandName: '',
      dialog: false,
      editModel: false,
      applianceModelItem: {}
    }
  },
  methods: {
    getAppliance(model) {
      return {
        id: model.id,
        name: model.name,
        model: model.model,
        imgPath: model.imgPath,
        applianceBrandId: model.applianceBrandId
      }
    },
    async retrieveApplianceBrand() {
      await ApplianceBrandsApiService.getById(this.productId)
          .then(response => {
            this.brandName = response.data.name;
          })
          .catch(e => {
            console.log(e);
          });
    },
    async retrieveApplianceModels() {
      await ApplianceBrandModelsApiService.getApplianceModelsByBrandId(this.productId)
        .then(response => {
          this.applianceModels = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    openApplianceModelsDialog(item) {
      this.applianceModelItem = Object.assign({}, item);
      this.dialog = true;
      this.editModel = !!item.id;
    },
    closeAppliancesModelsDialog() {
      this.dialog = false;
    },
    async updateApplianceModel(modelInformation) {
      await ApplianceModelsApiService.update(modelInformation.id, modelInformation)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async createApplianceModel(modelInformation) {
      await ApplianceModelsApiService.create(modelInformation)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async saveInformationModelDialog(modelInformation) {
      if (this.editModel) {
        await this.updateApplianceModel(modelInformation);
      }
      else {
        await this.createApplianceModel(modelInformation);
      }
      await this.retrieveApplianceModels();
      this.closeAppliancesModelsDialog();
    },
    async deleteModel(id) {
      await ApplianceModelsApiService.delete(id)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
      await this.retrieveApplianceModels();
      this.closeAppliancesModelsDialog();
    }
  },
  mounted() {
    this.retrieveApplianceModels();
    this.retrieveApplianceBrand();
  }
}
</script>

<style scoped>

</style>