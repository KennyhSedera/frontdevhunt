<template>
    <div>
        <v-select
            v-model="matiere"
            :items="items"
            solo
            class="grey rounded-pill"
            prepend-inner-icon="mdi-clipboard-list"
            label="Nom matiere"
            placeholder="Nom matiere"
            item-value="id_matiere"
            item-text="nom_matiere"
            :rules="[v => !!v || 'Cette champ ne doit pas etre vide!']"
        >
            <template v-slot:selection="data">
            <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.nom_matiere }}
            </v-chip>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.nom_matiere}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-select>
    </div>
</template>
<script>
import Service from '@/services/matiereService'



export default {
    name:'comboboxMatiere',
    data() {
        return {
            items: [],
            matiere:''
        }
    },
    methods: { 
      getId(){
        return this.matiere
      },
        setValue(value){
            this.matiere = this.items.filter(element=>element.nom_matiere === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.Matiere
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>