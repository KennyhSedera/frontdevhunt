<template>
    <div>
        <v-select
            v-model="niveau"
            :items="items"
            solo
            class="grey rounded-pill"
            prepend-inner-icon="mdi-clipboard-list"
            label="Libellé niveau"
            placeholder="Libellé niveau"
            item-value="id_niveau"
            item-text="libelle_niveau"
            :rules="[v => !!v || 'Cette champ ne doit pas etre vide!']"
        >
            <template v-slot:selection="data">
            <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.libelle_niveau }}
            </v-chip>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.libelle_niveau}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-select>
    </div>
</template>
<script>
import Service from '@/services/niveauService'



export default {
    name:'comboboxNiveau',
    data() {
        return {
            items: [],
            niveau:''
        }
    },
    methods: { 
      getId(){
        return this.niveau
      },
        setValue(value){
            this.niveau = this.items.filter(element=>element.libelle_niveau === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.Niveau
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>