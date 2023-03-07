<template>
    <div>
        <v-autocomplete
            v-model="parcours"
            :items="items"
            class="rounded-pill"
            outlined
            prepend-inner-icon="mdi-clipboard-list"
            label="Libellé parcours"
            placeholder="Libellé parcours"
            item-value="id_parcours"
            item-text="libelle_parcours"
            :rules="[v => !!v || 'Cette champ ne doit pas etre vide!']"
        >
            <template v-slot:selection="data">
            <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.libelle_parcours }}
            </v-chip>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.libelle_parcours}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
import Service from '@/services/parcourService'



export default {
    name:'comboboxParcours',
    data() {
        return {
            items: [],
            parcours:''
        }
    },
    methods: { 
      getId(){
        return this.parcours
      },
        setValue(value){
            this.parcours = this.items.filter(element=>element.libelle_parcours === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.Parcours
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>