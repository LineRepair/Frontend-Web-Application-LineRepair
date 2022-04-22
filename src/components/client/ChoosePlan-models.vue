<template>
    <v-container>
        <v-row dense>
            <CardPlan 
                v-bind:item="plans[0]" 
                v-bind:subscription="subscriptionModelItem"
                v-on:model-choose-plan="saveInformationPlan"
            />
            <CardPlan 
                v-bind:item="plans[1]" 
                v-bind:subscription="subscriptionModelItem"
                v-on:model-choose-plan="saveInformationPlan"
            />
            <CardPlan 
                v-bind:item="plans[2]" 
                v-bind:subscription="subscriptionModelItem"
                v-on:model-choose-plan="saveInformationPlan"
            /> 
        </v-row>
    </v-container>
</template>

<script>
import PlansApiService from "../../core/services/plans-api-service";
import ClientApiService from "../../core/services/clients-api-service";
import CardPlan from "./CardPlan-model"

export default{
    name:"ChoosePlan",
    props: {
        clientId: Number
    },
    data(){
        return{
            plans:[],
            subscriptionModelItem:{}
        }
    },    
    components:{
        CardPlan
    },
    methods:{
        getPlan(plan){
            return{
                id: plan.id,
                name: plan.name,
                price: plan.price
            }
        },
        async getPlans() {
            await PlansApiService.getAll()
              .then(response => {
                  this.plans = response.data.map(this.getPlan)
                  console.log(this.plans)
              })
              .catch(e => {
                console.log(e);
              });
        },
        async saveInformationPlan(planId) {
          await ClientApiService.updatePlan(this.clientId, planId)
            .then(response => {
              console.log(response);
              localStorage.setItem("client", JSON.stringify(response.data));
              this.$emit("update-render");
            })
            .catch(e => {
              console.log(e);
            });
        }
    },
    mounted() {
        this.getPlans();
    }
}
</script>

<style scoped>

</style>
