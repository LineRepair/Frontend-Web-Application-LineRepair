<template>
  <v-card flat>
    <v-card-title class="mb-6">
      Report history
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
        :items="reports"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            @click="seeReport(item)"
        >
            mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialog see report -->
    <v-dialog
        v-model="openReport"
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
              <span> {{ report.fullName }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Observation</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ report.observation }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Diagnostic</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ report.diagnosis }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Description of reparation</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ report.repairDescription }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Date</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ report.date }}</span>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openReport = false"
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
import ReportsApiService from "../../core/services/reports-api-service";

export default {
  name: "Reports",
  data() {
    return {
      headers: [
        { text: 'Name of technician', align: 'start', sortable: false, value: 'fullName' },
        { text: 'Observation', value: 'observation', sortable: false },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      reports: [],
      search: '',
      openReport: false,
      report: {
        id: Number,
        observation: "",
        diagnosis: "",
        repairDescription: "",
        date: "",
        imagePath: "",
        appointmentId: "",
        technicianId: "",
        fullName: "",
      },
    }
  },
  methods: {
    getReport(report) {
      return {
        id: report.id,
        observation: report.observation,
        diagnosis: report.diagnosis,
        repairDescription: report.repairDescription,
        date: report.date,
        imagePath: report.imagePath,
        appointmentId: report.appointmentId,
        technicianId: report.technicianId,
        fullName: "",
      }
    },
    async retrieveTechnicianInformation() {
      for (let i = 0; i < this.reports.length; i++) {
        await TechnicianApiService.getById(this.reports[i].technicianId)
            .then(response => {
              this.reports[i].fullName = `${response.data.names} ${response.data.lastNames}`;
            })
            .catch(e => {
              console.log(e);
            });
      }

      this.$forceUpdate();
    },
    async retrieveReports() {
      await ReportsApiService.getAll()
        .then(response => {
          this.reports = response.data.map(this.getReport);
        })
        .catch(e => {
          console.log(e);
        });

      await this.retrieveTechnicianInformation();
    },
    seeReport(item) {
      this.report = Object.assign({}, item);
      this.openReport = true;
    }
  },
  mounted() {
    this.retrieveReports();
  }
}
</script>

<style scoped>

</style>