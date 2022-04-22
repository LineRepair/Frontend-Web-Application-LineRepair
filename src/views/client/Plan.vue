<template>
  <v-container>
    <div v-if="plan === null">
      <ChoosePlan 
        v-bind:client-id="currentClient.id"
        v-on:update-render="updateRendering"
      />
    </div>
    <div v-else>      
      <MyPlan
        v-bind:item="plan"
        v-bind:clientId="currentClient.id"
        v-on:update-render="updateRendering"
      />
    </div>
  </v-container>  
</template>

<script>
import ChoosePlan from "../../components/client/ChoosePlan-models";
import MyPlan from "../../components/client/MyPlan-models";
import PlanApiService from "../../core/services/plans-api-service";

export default {
  name: "Plan",
  data(){
    return{
      currentClient: JSON.parse(localStorage.getItem("client")),
      plan: null
    }
  },
  components:{
    ChoosePlan,
    MyPlan
  },
  methods:{    
    getPlan(plan) {
      return {
        id: plan.id,
        categoryPlan: plan.categoryPlan,
        clientId: plan.clientId,
        active: plan.active,
        subscriptionDate: plan.subscriptionDate
      }
    },
    async getPlanClient() {
      await PlanApiService.getById(this.currentClient.planId)
        .then(response => {
          this.plan = response.data;
        })
        .catch(e => {
          this.plan = null;
          console.log(e);
        });
      this.$forceUpdate();
    },
    async updateRendering() {
      this.currentClient = JSON.parse(localStorage.getItem("client"));
      await this.getPlanClient();
    }
  },
  mounted() {
    this.getPlanClient();
  }
}

</script>

<style scoped>

</style>