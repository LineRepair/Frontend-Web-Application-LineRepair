<template>
  <v-card height="910px" class="pa-2">
    <h1 class="text-center mb-2">Profile</h1>

    <v-card class="mx-auto pa-2" max-width="500px" color="rgba(3,64,120,0.19)">
      <v-img
          src="../../assets/img/user.png"
          max-width="200px"
          alt="user image"
          class="mx-auto mt-3"
      ></v-img>

      <v-card-title><b>{{technician.names +" "+ technician.lastNames}}</b></v-card-title>

      <v-card-text>
        <h3>Address</h3>
        <p>{{technician.address}}</p>

        <h3>Cellphone</h3>
        <p>{{technician.cellphoneNumber}}</p>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="openPersonalInformationDialog()"
        >Edit</v-btn>
      </v-card-actions>
    </v-card>

      <TechnicianProfileDialog
        v-bind:dialog="personalInformationDialog"
        v-bind:title="'Edit person information'"
        v-bind:item="technician"
        v-on:close-dialog="closePersonalInformationDialog"
        v-on:technician-profile-information="updatePersonalInformation"
      />
  </v-card>
</template>

<script>
import TechniciansApiService from "../../core/services/technicians-api-service";
import TechnicianProfileDialog from "../../components/technician/Technicians-profile-dialog";

export default {
  name: "Profile",
   data() {
    return {
      technician: JSON.parse(localStorage.getItem("technician")),
      personalInformationDialog: false,
    }
  },
  components: {
    TechnicianProfileDialog,
  },
   methods: {
    openPersonalInformationDialog() {
      this.personalInformationDialog = true;
    },
    closePersonalInformationDialog() {
      this.personalInformationDialog = false;
    },
    async updatePersonalInformation(profileItem) {
      await TechniciansApiService.update(profileItem.id, profileItem)
        .then(response => {
          localStorage.setItem("technician", JSON.stringify(response.data));
          this.technician = JSON.parse(localStorage.getItem("technician"));
        })
        .catch(e => {
          console.log(e);
        });
      this.closePersonalInformationDialog();
      this.$forceUpdate();
    },
    
  },
}
</script>

<style scoped>
</style>