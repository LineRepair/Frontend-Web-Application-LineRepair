<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                
              <v-col cols="12">
                <v-text-field
                v-model="item.names"
                label="Firstname*"
                :rules="[rules.required, rules.maxLength30]"
                counter="30"
                outlined
            ></v-text-field>
              </v-col>

            <v-col cols="12">
                <v-text-field
                v-model="item.lastNames"
                label="Lastnames*"
                :rules="[rules.required, rules.maxLength30]"
                counter="30"
                outlined
               ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                v-model="item.address"
                label="Address"
                :rules="[rules.required, rules.maxLength50]"
                counter="50"
                outlined
            ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                v-model="item.cellphoneNumber"
                label="Cellphone number*"
                :rules="[rules.required, rules.cellphoneNumber]"
                counter="9"
                outlined
            ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="saveProfile= true"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-dialog
          v-model="saveProfile"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Edit profile
          </v-card-title>
          <v-card-text>Are you sure to change the user information?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="saveProfile = false"
            >
              Close
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="saveInformation"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </v-row>
</template>

<script>
export default {
  name: "Technicians-profile-dialog",
  props: {
    dialog: Boolean,
    title: String,
    item: Object,
  },
  data() {
    return {
      dialogDelete: false,
      saveProfile: false,
      rules: {
        required: v => !!v || 'Required',
        cellphoneNumber: v => {
          const pattern = /^(9)([0-9]){8}$/
          return pattern.test(v) || 'Wrong number';
        },
        maxLength30: v => v.length <= 30 || 'Max 30 characters',
        maxLength50: v => v.length <= 50 || 'Max 50 characters'
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    saveInformation() {
      console.log(this.item, "dialog");
      this.$emit("technician-profile-information", this.item);
    },
  },
}
</script>

<style scoped>
</style>