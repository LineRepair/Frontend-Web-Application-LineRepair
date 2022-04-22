<template>
  <v-card flat>
    <v-card-title class="mb-6">
      Spare requests
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="spareRequests"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            @click="seeSpareRequest(item)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialog see report -->
    <v-dialog
        v-model="openSpareRequest"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Report </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <span class="text-h6">Name of technician</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ spareRequest.fullName }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Description</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ spareRequest.description }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Date</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ spareRequest.date }}</span>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openSpareRequest = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import TechnicianApiService from "../../core/services/technicians-api-service";
import SpareRequestApiService from "../../core/services/spare-requests-api-service";

export default {
  name: "Spare-parts-requests",
  data() {
    return {
      headers: [
        { text: 'Name of technician', align: 'start', sortable: false, value: 'fullName' },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      spareRequests: [],
      search: '',
      openSpareRequest: false,
      spareRequest: {
        id: Number,
        description: "",
        date: "",
        imagePath: "",
        technicianId: Number,
        appointmentId: Number,
        fullName: "",
      }
    }
  },
  methods: {
    getSpareRequest(spareRequest) {
      return {
        id: spareRequest.id,
        description: spareRequest.description,
        date: spareRequest.date,
        imagePath: spareRequest.imagePath,
        technicianId: spareRequest.technicianId,
        appointmentId: spareRequest.appointmentId,
        fullName: "",
      }
    },
    async retrieveTechnicianInformation() {
      for (let i = 0; i < this.spareRequests.length; i++) {
        await TechnicianApiService.getById(this.spareRequests[i].technicianId)
            .then(response => {
              this.spareRequests[i].fullName = `${response.data.names} ${response.data.lastNames}`;
            })
            .catch(e => {
              console.log(e);
            });
      }

      this.$forceUpdate();
    },
    async retrieveSpareRequests() {
      await SpareRequestApiService.getAll()
        .then(response => {
          this.spareRequests = response.data.map(this.getSpareRequest);
        })
        .catch(e => {
          console.log(e);
        });

      await this.retrieveTechnicianInformation();
    },
    seeSpareRequest(item) {
      this.spareRequest = Object.assign({}, item);
      this.openSpareRequest = true;
    }
  },
  mounted() {
    this.retrieveSpareRequests();
  }
}
</script>

<style scoped>

</style>