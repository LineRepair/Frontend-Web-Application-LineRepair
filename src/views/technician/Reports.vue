<template>
  <v-card flat>
    <v-card-title class="mb-6">
      My reports
    </v-card-title>
    <v-card
        v-for="(report,index) in reports"
        :key="index"
        @click="seeReport(report)"
        class="pa-2"
    >
      <v-container fluid>
        <v-row dense>
          <v-col>
            <v-row class="text-h6">
              {{ report.observation }}
            </v-row>
            <v-row >
              {{ report.diagnosis }}
            </v-row>
            <v-row>
              {{ report.repairDescription }}
            </v-row>
          </v-col>
          <v-col cols="2">
            {{report.date}}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="btn-add" >
      <v-btn
          class="primary"
          fab
          dark
          @click="addNewReport()"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>

    <!-- New Report -->
    <v-dialog
        v-model="newReport"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> New Report</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-text-field
                v-model="formNewReport.observation"
                ref="textField"
                label="Observation*"
                clearable
                outlined
            ></v-text-field>

            <v-text-field
                v-model="formNewReport.diagnosis"
                ref="textField"
                label="Diagnosis*"
                clearable
                outlined
            ></v-text-field>

            <v-text-field
                v-model="formNewReport.repairDescription"
                ref="textField"
                clearable
                outlined
                label="Repair Description*"
            ></v-text-field>
            <v-text-field
                v-model="formNewReport.imagePath"
                ref="textField"
                outlined
                clearable
                label="Image Path*"
            >
            </v-text-field>
            <v-text-field
              v-model="formNewReport.date"
              ref="textField"
              outlined
              clearable
              label="Date*"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="registerReport(formNewReport)"
          >
            Submit
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="newReport = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


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
            <v-text-field
                v-model="editItem.observation"
                ref="textField"
                label="Observation*"
                clearable
                outlined
            ></v-text-field>

            <v-text-field
                v-model="editItem.diagnosis"
                ref="textField"
                label="Diagnosis*"
                clearable
                outlined
            ></v-text-field>

            <v-text-field
                v-model="editItem.repairDescription"
                ref="textField"
                clearable
                outlined
                label="Repair Description*"
            ></v-text-field>
            <v-text-field
                v-model="editItem.imagePath"
                ref="textField"
                outlined
                clearable
                label="Image Path*"
            >
            </v-text-field>
            <v-text-field
                v-model="editItem.date"
                ref="textField"
                outlined
                clearable
                label="Date*"
            >
            </v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="deleteReport(editItem.id)"
          >
            Delete
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="updateReport(editItem.id,editItem)"
          >
            Save
          </v-btn>
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
import ReportsApiService from "../../core/services/reports-api-service";

export default {
  name: "Reports",
  data() {
    return {
      technicians: [],
      reports: [],
      search: '',
      openReport: false,
      newReport:false,
      e6:1,
      technicianId: JSON.parse(localStorage.getItem("technician")).id,
      editItem: {
        date: "",
        diagnosis: "",
        id: "",
        imagePath: "",
        observation: "",
        repairDescription: "",
        technicianId: ""
      },
      formNewReport: {
        observation:"",
        diagnosis:"",
        repairDescription: "",
        date:"",
        imagePath:"",
        appointmentId: 4,
        technicianId: JSON.parse(localStorage.getItem("technician")).id
      }
    }
  },
  methods: {
    getReport(report) {
       {
        return {
          id: report.id,
          observation: report.observation,
          diagnosis: report.diagnosis,
          repairDescription: report.repairDescription,
          date: report.date,
          imagePath: report.imagePath,
          appointmentId: report.appointmentId,
          technicianId: JSON.parse(localStorage.getItem("technician")).id
        }
      }
    },
    async retrieveReports() {
      await ReportsApiService.getAll()
        .then(response => {
          this.reports = response.data.map(this.getReport);
        })
        .catch(e => {
          console.log(e);
        });
    },
    seeReport(item) {
      this.editItem = Object.assign({}, item);
      this.openReport = true;
    },
    addNewReport(){
      this.newReport=true;
    },
    async registerReport(newReport){
      await ReportsApiService.create(newReport)
          .then(response=>{
            console.log(response);
            this.newReport=false;
            this.$refs.form.reset();
          })
          .catch(e=>{
            console.log(e);
          });
      await this.retrieveReports();
    },
    async deleteReport(reportId){
      await ReportsApiService.delete(reportId)
          .then(response=>{
            console.log(response);
            this.openReport=false;
          })
          .catch(e=>{
            console.log(e);
          });
      await this.retrieveReports();
    },
    async updateReport(reportId, data){
      await ReportsApiService.update(reportId, data)
          .then(response=>{
            console.log(response);
            this.openReport=false;
          })
          .catch(e=>{
            console.log(e);
          });
      await this.retrieveReports();
    }
  },
  mounted() {
    this.retrieveReports();
  }
}
</script>

<style scoped>
.btn-add{
  display: flex;
  min-height: 80px;
  align-items: center;
  justify-content: center;
}
</style>