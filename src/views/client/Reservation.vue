<template>
  <div>
    <v-app-bar
        class="mb-6"
        color="white"
        flat
        height="90px"
    >
      <v-card-title>
        Repair reserves
      </v-card-title>
    </v-app-bar>

    <!-- Table Reservations - START -->
    <v-data-table
        :headers="headers"
        :items="reservations"
        :items-per-page="10"
        class="elevation-1"
    >
    </v-data-table>
    <!-- Table Reservations - END -->
  </div>
</template>

<script>
import AppointmentsApiService from "../../core/services/appointments-api-service";

export default {
  name: "Reservation",
  data() {
    return {
      reservations: [],
      clientId: JSON.parse(localStorage.getItem("client")).id,
      headers: [
        {text: 'Date reserve', sortable: true, value: 'dateReserve'},
        {text: 'Date attention', sortable: true, value: 'dateAttention'},
        {text: 'Hour', sortable: true, value: 'hour'},
      ],
    }
  },
  methods: {
    getAppointment(appointment) {
      if (appointment.clientId === this.clientId)
        return {
          id: appointment.id,
          dateReserve: appointment.dateReserve,
          dateAttention: appointment.dateAttention,
          hour: appointment.hour,
          clientId: appointment.clientId,
          technicianId: appointment.technicianId,
          done: appointment.done,
        }
    },
    async retrieveReservations() {
      await AppointmentsApiService.getAll()
        .then(response => {
          console.log(response);
          this.reservations = response.data.map(this.getAppointment);
        })
        .catch(e => {
          console.log(e);
        });

      this.$forceUpdate();
    },
  },
  mounted() {
    this.retrieveReservations();
  }
}
</script>

<style scoped>
</style>