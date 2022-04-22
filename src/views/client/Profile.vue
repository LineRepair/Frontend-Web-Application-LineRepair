<template>
  <v-card height="850px" class="pa-2">
    <h1 class="text-center mb-2">Profile</h1>

    <v-card class="mx-auto pa-2" max-width="500px" color="rgba(3,64,120,0.19)">
      <v-img
          src="../../assets/img/user.png"
          max-width="200px"
          alt="user image"
          class="mx-auto mt-3"
      ></v-img>

      <v-card-title><b>{{client.names +" "+ client.lastNames}}</b></v-card-title>

      <v-card-text>
        <h3>Address</h3>
        <p>{{client.address}}</p>

        <h3>Cellphone</h3>
        <p>{{client.cellphoneNumber}}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="openPersonalInformationDialog()"
        >Edit</v-btn>
      </v-card-actions>
    </v-card>

    <ClientProfileDialog
        v-bind:dialog="personalInformationDialog"
        v-bind:title="'Edit person information'"
        v-bind:item="client"
        v-on:close-dialog="closePersonalInformationDialog"
        v-on:client-profile-information="updatePersonalInformation"
    />
  </v-card>
</template>

<script>
import ClientsApiService from "../../core/services/clients-api-service";
import ClientProfileDialog from "../../components/client/Client-profile-dialog";

export default {
  name: "Profile",
   data() {
    return {
      client: JSON.parse(localStorage.getItem("client")),
      personalInformationDialog: false,
    }
  },
  components: {
    ClientProfileDialog,
  },
  methods: {
    openPersonalInformationDialog() {
      this.personalInformationDialog = true;
    },
    closePersonalInformationDialog() {
      this.personalInformationDialog = false;
    },
    async updatePersonalInformation(profileItem) {
      await ClientsApiService.update(profileItem.id, profileItem)
        .then(response => {
          localStorage.setItem("client", JSON.stringify(response.data));
          this.client = JSON.parse(localStorage.getItem("client"));
        })
        .catch(e => {
          console.log(e);
        });

      this.closePersonalInformationDialog();
      this.$forceUpdate();
    },
  }
}
</script>

<style scoped>
</style>