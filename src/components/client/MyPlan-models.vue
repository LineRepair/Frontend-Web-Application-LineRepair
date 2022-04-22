<template>
    <div>
        <v-card
          class="mx-auto"
          max-width="422"
          outlined
        >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                  Actually plan
                </div>
                <v-list-item-title class="text-h5 mb-1 text-capitalize">
                  {{plan.name}}: {{plan.price}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
            <v-btn
                color="blue darken-1"
                text
                @click="deletePlan"
            >
                Cancel
            </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PlansApiService from "../../core/services/plans-api-service";
import ClientApiService from "../../core/services/clients-api-service";

export default{
    name:"MyPlan",
    props:{
        item: Object,
        clientId: Number
    },
    data() {
        return {
            plan: {},
            edit: false,
            subscriptionModelItem: {}
        }
    },
    methods:{
        getPlan() {
            PlansApiService.getById(this.item.id)
            .then(response => {
                this.plan = response.data
                console.log(response.data)
            })
        },
        async deletePlan() {
            await ClientApiService.updatePlan(this.clientId, 0)
              .then(response => {
                console.log(response);
                localStorage.setItem("client", JSON.stringify(response.data));
                this.$emit("update-render")
              })
              .catch(e => {
                  console.log(e);
              });
        },
    },
    mounted(){
        this.getPlan();
    }
}
</script>

<style scoped>
</style>
