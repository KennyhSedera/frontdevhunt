<template>
    <div>
        <v-autocomplete
            v-model="domaine"
            :items="items"
            class="rounded-pill"
            outlined
            placeholder="libellé domaine"
            item-value="id_domaine"
            item-text="nom_domaine"
            :rules="[v => !!v || 'Cette champ ne doit pas etre vide!']"
        >
            <template v-slot:selection="data">
            <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.nom_domaine }}
            </v-chip>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.nom_domaine}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
import Service from '@/services/domaineService'



export default {
    name:'comboboxDomaine',
    data() {
        return {
            items: [],
            domaine:''
        }
    },
    methods: { 
      getId(){
        return this.domaine
      },
        setValue(value){
            this.domaine = this.items.filter(element=>element.nom_domaine === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.Domaine
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>