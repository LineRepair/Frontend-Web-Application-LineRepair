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
    <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="seeEditDialog(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            class="mr-2"
            @click="seeDeleteDialog(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <!-- Table Reservations - END -->
     <!-- Dialog see Reservations - START-->
     <v-dialog
        v-model="openReservation"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Reservation </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
            
              <v-text-field
                  v-model="editItem.dateAttention"
                  label="dateAttention"
                  :counter="20"
                  required
                  :rules="dateAttentionRules"
                  id="dateAttentions"
                  aria-labelledby="dateAttention"
              ></v-text-field>
              <v-text-field
                  v-model="editItem.hour"
                  label="hour"
                  :counter="9"
                  required
                  :rules="hourRules"
                  id="hourNumber"
                  aria-labelledby="hourNumber"
              ></v-text-field>
            
              
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openReservation = false"
          >
            Close
          </v-btn>
         
          <v-btn
          
              text
              color="primary"
              :disabled="!valid"
              @click="updateReservation(editItem.id, editItem)"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog see Reservation - END-->
       <!--  Delete Dialog - START-->
    <v-dialog
        v-model="openDelete"
        max-width="350px"
    >
        <v-card>
          <v-container>
            <v-card-subtitle>
              <span>Do you want delete this item?</span>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="openDelete = false"
              >
                Close
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="deleteReservation(editItem.id)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
    </v-dialog>
    <!-- Delete Dialog - END-->




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
        {text: 'Actions', sortable: false, value: 'actions'}

      ],
      openReservation:false,
      isCreate: false,
      openDelete: false,
      editItem: {
        dateAttention: '',
        hour: '',
      },
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
    seeAddDialog() {
      this.isCreate = true;
      this.openReservation = true;
      this.$refs.form.reset();
    },
    async AddReservation() {
      await AppointmentsApiService.create(this.editItem)
      .then(() => {
        this.retrieveReservations();
        this.openReservation = false;
        this.isCreate = false;
      })
      .catch(e => {
        console.log(e);
      });
    },
    seeEditDialog(item){
      this.editItem = Object.assign({}, item);
      this.isCreate = false;
      this.openReservation = true;
    },
   async updateReservation(id, item) {
      await AppointmentsApiService.update(id, item)
      .then(() =>{
        this.retrieveReservations();
        this.openReservation = false;
      })
      .catch(e => {
        console.log(e);
      });
    },
    seeDeleteDialog(item){
      this.editItem = Object.assign({}, item);
      this.openDelete = true;
    },
    async deleteReservation(id) {
      await AppointmentsApiService.delete(id)
      .then(() => {
        this.retrieveReservations();
        this.openDelete = false;
      })
      .catch(e => {
        console.log(e);
      });
    }
    
  },
  mounted() {
    this.retrieveReservations();
  }
}
</script>

<style scoped>
</style>