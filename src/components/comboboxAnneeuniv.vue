<template>
    <div>
        <v-autocomplete
            v-model="annee"
            :items="items"
            outlined
            class="grey rounded-pill"
            prepend-inner-icon="mdi-clipboard-list"
            label="Année universitaire"
            placeholder="Année universitaire"
            item-value="id_annee"
            item-text="libelle_annee"
            :rules="[v => !!v || 'Cette champ ne doit pas etre vide!']"
        >
            <template v-slot:selection="data">
            <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.libelle_annee }}
            </v-chip>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.libelle_annee}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
import Service from '@/services/anneeunivServise'



export default {
    name:'comboboxAnneeUniv',
    data() {
        return {
            items: [],
            annee:''
        }
    },
    methods: { 
      getId(){
        return this.annee
      },
        setValue(value){
            this.annee = this.items.filter(element=>element.libelle_annee === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.Anneeuniv
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>