<template>
  <div>
    <h1 class="mb-2">Technicians</h1>
    <v-btn
        color="accent"
        class="mb-4"
        @click="seeAddDialog()"
    >
      Add
    </v-btn>

    <!-- Table Technicians - START -->
    <v-data-table
        :headers="headers"
        :items="technicians"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
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
    <!-- Table Technicians - END -->

    <!-- Dialog see Technician - START-->
    <v-dialog
        v-model="openTechnician"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Technician </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-text-field
                  v-model="editItem.names"
                  label="Name"
                  :counter="20"
                  required
                  :rules="nameRules"
                  id="names"
                  aria-labelledby="names"
              ></v-text-field>
              <v-text-field
                  v-model="editItem.lastNames"
                  label="Lastname"
                  :counter="20"
                  required
                  :rules="lastNameRules"
                  id="lastNames"
                  aria-labelledby="lastNames"
              ></v-text-field>
              <v-text-field
                  v-model="editItem.cellphoneNumber"
                  label="Cellphone"
                  :counter="9"
                  required
                  :rules="phoneRules"
                  id="cellphoneNumber"
                  aria-labelledby="cellphoneNumber"
              ></v-text-field>
              <v-text-field
                  v-model="editItem.address"
                  label="Address"
                  :counter="50"
                  required
                  :rules="addressRules"
                  id="address"
                  aria-labelledby="address"
              ></v-text-field>

              <!--<v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{on, attrs}">
                  <v-text-field
                      v-model="editItem.birthday"
                      label="Birthday"
                      id="birthday"
                      aria-labelledby="birthday"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="editItem.birthday"
                    @input="menu = false"
                ></v-date-picker>
              </v-menu>-->
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openTechnician = false"
          >
            Close
          </v-btn>
          <v-btn
              v-if="isCreate"
              text
              color="primary"
              :disabled="!valid"
              @click="AddTechnician"
          >
            Add
          </v-btn>
          <v-btn
              v-else
              text
              color="primary"
              :disabled="!valid"
              @click="updateTechnician(editItem.id, editItem)"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog see Technician - END-->

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
                  @click="deleteTechnician(editItem.id)"
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
import TechnicianApiService from "../../core/services/technicians-api-service";

export default {
  name: "Technicians",
  data() {
    return {
      technicians: [],
      search: '',
      headers: [
        {text: 'Name', sortable: true, value: 'names'},
        {text: 'Last Name', sortable: true, value: 'lastNames'},
        {text: 'Cellphone Number', sortable: true, value: 'cellphoneNumber'},
        {text: 'Actions', sortable: false, value: 'actions'}
      ],
      openTechnician: false,
      isCreate: false,
      openDelete: false,
      editItem: {
        names: '',
        lastnames: '',
        cellphoneNumber: Number,
        address: '',
        email: '',
        password: '',
      },
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      lastNameRules: [
        v => !!v || 'Lastname is required',
        v => (v && v.length <= 20) || 'Lastname must be less than 20 characters',
      ],
      addressRules: [
        v => !!v || 'Address is required',
        v => (v && v.length <= 50) || 'Address must be less than 50 characters',
      ],
      phoneRules: [
        v => !!v || 'Cellphone is required',
        v => Number.isInteger(v) || 'Cellphone value must be an integer number',
        v => (v && v >= 900000000 && v <= 999999999) || 'Cellphone must be less than 9 characters',
      ],
      menu: false,
    }
  },
  methods: {
    getTechnician(technician) {
      return {
        id: technician.id,
        names: technician.names,
        lastNames: technician.lastNames,
        cellphoneNumber: technician.cellphoneNumber,
        address: technician.address,
        userId: technician.userId
      }
    },
    async retrieveTechnicians() {
      await TechnicianApiService.getAll()
      .then(response => {
        this.technicians = response.data.map(this.getTechnician);
      })
      .catch(e => {
        console.log(e);
      });
    },
    seeAddDialog() {
      this.isCreate = true;
      this.openTechnician = true;
      this.$refs.form.reset();
    },
    async AddTechnician() {
      await TechnicianApiService.create(this.editItem)
      .then(() => {
        this.retrieveTechnicians();
        this.openTechnician = false;
        this.isCreate = false;
      })
      .catch(e => {
        console.log(e);
      });
    },
    seeEditDialog(item){
      this.editItem = Object.assign({}, item);
      this.isCreate = false;
      this.openTechnician = true;
    },
    async updateTechnician(id, item) {
      await TechnicianApiService.update(id, item)
      .then(() =>{
        this.retrieveTechnicians();
        this.openTechnician = false;
      })
      .catch(e => {
        console.log(e);
      });
    },
    seeDeleteDialog(item){
      this.editItem = Object.assign({}, item);
      this.openDelete = true;
    },
    async deleteTechnician(id) {
      await TechnicianApiService.delete(id)
      .then(() => {
        this.retrieveTechnicians();
        this.openDelete = false;
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.retrieveTechnicians();
  }
}
</script>

<style scoped>
</style>