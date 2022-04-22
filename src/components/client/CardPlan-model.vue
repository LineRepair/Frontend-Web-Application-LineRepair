<template>
    <v-col 
        cols
    >
        <v-card v-if="item !== undefined"
            color="#385F73"
            dark
        >
            <v-card-title class="text-center text-capitalize">
                {{item.name}}
            </v-card-title>

            <v-card-subtitle class="text-center">
                S/ {{item.price}}
            </v-card-subtitle >

            <v-card-actions class="justify-center">
                <v-btn
                    outlined
                    rounded
                    text
                    @click="saveInformation"
                >
                    Choose plan
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
export default {
    name:"CardPlan",
    props:{
        item: Object,
    },
    methods:{
        saveInformation() {
            this.$emit("model-choose-plan", this.item.id);
        }
    }
}
</script>

<style scoped>

</style>