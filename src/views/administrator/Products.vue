<template>
  <v-container>
    <v-app-bar
        class="mb-6"
        color="white"
        flat
        height="90px"
    >
      <v-btn
          color="accent"
          @click="openAppliancesBrandDialog({})"
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

    <v-item-group active-class="primary">
      <v-row>
        <v-col
            v-for="brand in applianceBrands"
            :key="brand.id"
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
                    @click="openAppliancesBrandDialog(brand)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>
              <v-card
                  fluid
                  flat
                  elevation="0"
                  :to="`products/${brand.id}/models`">
                <v-img
                    :src="brand.imgPath"
                    aspect-ratio="1.5"
                ></v-img>
              </v-card>
              <v-card-title>
                {{ brand.name }}
              </v-card-title>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ApplianceDialog
        v-bind:dialog="dialog"
        v-bind:edit="editBrand"
        v-bind:title="editBrand ? 'Edit' : 'New Brand'"
        v-bind:item="applianceBrandItem"
        v-on:close-dialog="closeAppliancesBrandDialog"
        v-on:brand-information="saveInformationBrandDialog"
        v-on:delete-brand="deleteBrand"
    />
  </v-container>
</template>

<script>
import ApplianceBrandsApiService from "../../core/services/appliance-brands-api-service";
import ApplianceDialog from "../../components/administrator/Appliance-dialog";

export default {
  name: "Products",
  data() {
    return {
      applianceBrands: [],
      dialog: false,
      editBrand: false,
      applianceBrandItem: {}
    }
  },
  components: {
    ApplianceDialog
  },
  methods: {
    getAppliance(appliance) {
      return {
        id: appliance.id,
        name: appliance.name,
        imgPath: appliance.imgPath
      }
    },
    async retrieveAppliancesBrands() {
      await ApplianceBrandsApiService.getAll()
        .then(response => {
          this.applianceBrands = response.data.map(this.getAppliance);
          console.log(this.applianceBrands);
        })
        .catch(e => {
          console.log(e);
        });
    },
    openAppliancesBrandDialog(item) {
      this.applianceBrandItem = Object.assign({}, item);
      this.dialog = true;
      this.editBrand = !!item.id;
    },
    closeAppliancesBrandDialog() {
      this.dialog = false;
    },
    async updateApplianceBrand(brandInformation) {
      await ApplianceBrandsApiService.update(brandInformation.id, brandInformation)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async createApplianceBrand(brandInformation) {
      await ApplianceBrandsApiService.create(brandInformation)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async saveInformationBrandDialog(brandInformation) {
      if (this.editBrand) {
        await this.updateApplianceBrand(brandInformation);
      }
      else {
        await this.createApplianceBrand(brandInformation);
      }
      await this.retrieveAppliancesBrands();
      this.closeAppliancesBrandDialog();
    },
    async deleteBrand(id) {
      await ApplianceBrandsApiService.delete(id)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      await this.retrieveAppliancesBrands();
      this.closeAppliancesBrandDialog();
    }
  },
  mounted() {
    this.retrieveAppliancesBrands();
  }
}
</script>

<style scoped>

</style>