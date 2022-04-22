<template>
  <div>
    <v-row>
      <v-col class="d-flex flex-column">
        <h2 class="mx-auto">Reports vs Spare requests</h2>
        <apexchart
            class="mx-auto"
            width="350"
            type="pie"
            :options="reportsVsSpareRequestsData.chartOptions"
            :series="reportsVsSpareRequestsData.series"
        ></apexchart>
      </v-col>
      <v-col class="d-flex flex-column">
        <h2 class="mx-auto">Plans</h2>
        <apexchart
            class="mx-auto"
            width="350"
            type="pie"
            :options="plansData.chartOptions"
            :series="plansData.series"
        ></apexchart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ReportsApiService from "../../core/services/reports-api-service";
import SpareRequestsApiService from "../../core/services/spare-requests-api-service";
import ClientsApiService from "../../core/services/clients-api-service";

export default {
  name: "business",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      reportsVsSpareRequestsData: {
        series: [],
        chartOptions: {
          chart: {
            type: "pie",
          },
          labels: ["Reports", "Spare Requests"],
        }
      },
      plansData: {
        series: [],
        chartOptions: {
          chart: {
            type: "pie",
          },
          labels: ["Basic", "Regular", "Pro"],
        }
      }
    }
  },
  methods: {
    async retrieveNumOfReports() {
      await ReportsApiService.getAll()
          .then(response => {
            this.reportsVsSpareRequestsData.series.push(response.data.length);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async retrieveNumOfSpareRequests() {
      await SpareRequestsApiService.getAll()
          .then(response => {
            this.reportsVsSpareRequestsData.series.push(response.data.length);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async retrieveInformationForReportVsSpareRequests() {
      await this.retrieveNumOfReports();
      await this.retrieveNumOfSpareRequests();
      this.$forceUpdate();
    },
    async retrieveNumOfPlans() {
      let clients;

      await ClientsApiService.getAll()
        .then(response => {
          clients = response.data;
        })
        .catch(e => {
          console.log(e);
        });

      let basic, regular, pro;
      basic = regular = pro = 0;

      for (let client of clients) {
        switch (client.planId) {
          case 3:
            basic++;
            break;
          case 2:
            regular++;
            break;
          case 4:
            pro++;
            break;
        }
      }

      this.plansData.series.push(basic, regular, pro);
    }
  },
  mounted() {
    this.retrieveInformationForReportVsSpareRequests();
    this.retrieveNumOfPlans();
  }
}
</script>

<style scoped>
</style>