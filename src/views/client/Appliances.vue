<template>
  <v-container>
    <v-app-bar
        color="white"
        flat
        class="mb-6"
    >
      <v-app-bar-title>
        My Appliances
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
          color="accent"
          @click="openClientApplianceDialog({})"
      >
        Add
      </v-btn>
    </v-app-bar>

    <v-item-group active-class="primary">
      <v-row>
        <v-col
            v-for="appliance in appliances"
            :key="appliance.id"
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
                    @click="openClientApplianceDialog(appliance)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>

              <v-img
                  v-bind:src="appliance.imgPath"
                  aspect-ratio="1.5"
              ></v-img>

              <v-card-title>
                {{ appliance.name }}
              </v-card-title>

              <v-card-subtitle>
                {{ appliance.model }}
                <v-spacer></v-spacer>
                {{ appliance.brandName }}
              </v-card-subtitle>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ClientApplianceDialog
      v-bind:dialog="dialog"
      v-bind:edit="editAppliance"
      v-bind:title="editAppliance ? 'Edit' : 'New appliance'"
      v-bind:item="applianceItem"
      v-bind:brandsWithModels="brandsWithModels"
      v-on:close-dialog="closeClientApplianceDialog"
      v-on:client-appliance-information="saveInformationApplianceDialog"
      v-on:delete-client-appliance="deleteAppliance"
    />
  </v-container>
</template>

<script>
import ApplianceBrandsApiService from "../../core/services/appliance-brands-api-service";
import ClientApplianceDialog from "../../components/client/Client-appliance-dialog";
import ApplianceBrandModelsApiService from "../../core/services/appliance-brand-models-api-service";
import ApplianceApiService from "../../core/services/appliance-api-service";
import ApplianceModelsApiService from "../../core/services/appliance-models-api-service";

export default {
  name: "Appliance-models",
  components: {ClientApplianceDialog},
  data() {
    return {
      appliances: [],
      brandsWithModels: [],
      dialog: false,
      editAppliance: false,
      applianceItem: {},
      currentClientId: JSON.parse(localStorage.getItem("client")).id,
    }
  },
  methods: {
    async retrieveBrandWithModel() {
      let brands = [];

      await ApplianceBrandsApiService.getAll()
          .then(response => {
            brands = response.data;
          })
          .catch(e => {
            console.log(e);
          });

      for (let brand of brands) {
        await ApplianceBrandModelsApiService.getApplianceModelsByBrandId(brand.id)
            .then(response => {
              brand.models = response.data;
            });
      }

      this.brandsWithModels = brands;
    },
    async retrieveAppliances() {
      await ApplianceApiService.getAllByClientId(this.currentClientId)
        .then(response => {
          console.log(response);
          this.appliances = response.data;
        })
        .catch(e => {
          console.log(e);
        });


      for (let i = 0; i < this.appliances.length; i++) {
        //model information
        await ApplianceModelsApiService.getById(this.appliances[i].applianceModelId)
          .then(response => {
             this.appliances[i].imgPath = response.data.imgPath;
             this.appliances[i].name = response.data.name;
             this.appliances[i].model = response.data.model;
             this.appliances[i].applianceBrandId = response.data.applianceBrandId;
          })
          .catch(e => {
            console.log(e);
          })

        //brand name
        await ApplianceBrandsApiService.getById(this.appliances[i].applianceBrandId)
            .then(response => {
              this.appliances[i].brandName = response.data.name;
            });
      }

      this.$forceUpdate();
    },
    openClientApplianceDialog(item) {
      this.applianceItem = Object.assign({}, item);
      this.dialog = true;
      this.editAppliance = !!item.id;
    },
    closeClientApplianceDialog() {
      this.dialog = false;
    },
    async updateAppliance(applianceInformation) {
      const appliance = {
        applianceModelId: applianceInformation.applianceModelId,
        clientId: this.currentClientId,
        purchaseDate: applianceInformation.purchaseDate
      }

      await ApplianceApiService.update(applianceInformation.id, appliance)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async createAppliance(applianceInformation) {
      const appliance = {
        applianceModelId: applianceInformation.model.id,
        clientId: this.currentClientId,
        purchaseDate: applianceInformation.purchaseDate
      }

      await ApplianceApiService.create(appliance)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async saveInformationApplianceDialog(applianceInformation) {
      if (this.editAppliance) {
        await this.updateAppliance(applianceInformation);
      }
      else {
        await this.createAppliance(applianceInformation);
      }
      await this.retrieveAppliances();
      this.closeClientApplianceDialog();
    },
    async deleteAppliance(id) {
      await ApplianceApiService.delete(id)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      await this.retrieveAppliances();
      this.closeClientApplianceDialog();
    }
  },
  mounted() {
    this.retrieveBrandWithModel();
    this.retrieveAppliances();
  }
}
</script>

<style scoped>

</style>