<template>
    <v-card height="300" class="py-8 px-4">
       <v-row justify='center' >
          <v-col cols="12">
            <v-row>
                <div class="col-1  mt-4" >
                <toolTip text="Ajouter des images" >
                        <!-- <v-btn slot="icon" icon > -->
                            <v-icon slot="icon" large>fas fa-folder</v-icon>
                        <!-- </v-btn> -->
                    </toolTip>
                </div>
            <div class="col-5">
                <v-text-field outlined class="rounded-pill" placeholder="Que publiez-vous?"></v-text-field>
                <v-text-field outlined class="rounded-pill" placeholder="Quel est la domaine"></v-text-field>
                <v-text-field outlined class="rounded-pill" placeholder="Queelle matière?"></v-text-field>
            </div>
            <div class=" col-5">
                <v-btn class="mt-4 text-none">Publier</v-btn> 
                 <v-row justify="center" class="blue" width="200" height="200">
                    <div class="red">
                        <v-img  src="logo.jpg"></v-img>
                    </div> 
                </v-row> 
               </div>
            </v-row>
          </v-col>
        </v-row>  
    </v-card>
</template>
<script>
import toolTip from '../components/toolTip.vue'
export default {
    name:'formPublication',
    components:{
        toolTip
    }
}
</script>