<template>
  <div>
    <h2 class="text-center">Technicians statics</h2>
    <apexchart type="bar" height="430" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ReportsApiService from "../../core/services/reports-api-service";
import SpareRequestsApiService from "../../core/services/spare-requests-api-service";
import TechniciansApiService from "../../core/services/technicians-api-service";

export default {
  name: "technicians-statics",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Reports', 'Spare Requests'],
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: [],
        },
      },
    }
  },
  methods: {
    getTechnician(technician) {
      return {
        id: technician.id,
        fullName: `${technician.names} ${technician.lastNames}`
      }
    },
    async retrieveNumOfReportByTechnicianId(technicianId) {
      let cont = 0, reports;

      await ReportsApiService.getAll()
        .then(response => {
          reports = response.data;
        })
        .catch(e => {
          console.log(e);
        })

      for (let i = 0; i < reports.length; i++) {
        if (technicianId === reports[i].technicianId) {
          cont++;
        }
      }

      return cont;
    },
    async retrieveNumOfSpareRequestsByTechnicianId(technicianId) {
      let cont = 0, spareRequests;

      await SpareRequestsApiService.getAll()
          .then(response => {
            spareRequests = response.data;
          })
          .catch(e => {
            console.log(e);
          })

      for (let i = 0; i < spareRequests.length; i++) {
        if (technicianId === spareRequests[i].technicianId) {
          cont++;
        }
      }

      return cont;
    },
    async retrieveTechnicianStatistics() {
      let technicians;

      await TechniciansApiService.getAll()
        .then(response => {
          technicians = response.data.map(this.getTechnician);
        })
        .catch(e => {
          console.log(e);
        });

      let reports = [], spareRequest = [], names = [];

      for (let i = 0; i < technicians.length; i++) {
        reports.push(await this.retrieveNumOfReportByTechnicianId(technicians[i].id));
        spareRequest.push(await this.retrieveNumOfSpareRequestsByTechnicianId(technicians[i].id));
        names.push(technicians[i].fullName);
      }

      this.series.push({ data: reports });
      this.series.push({ data: spareRequest });
      this.chartOptions.xaxis.categories.push(...names);

      this.$forceUpdate();
    }
  },
  mounted() {
    this.retrieveTechnicianStatistics();
  }
}
</script>

<style scoped>

</style>