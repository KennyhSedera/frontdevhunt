<template>
<div>

    <v-row class="">
               <v-avatar class="c-pointer" @click="$router.push({name: 'Profil',params:{idUser : item.id_user}})">
                  <v-img size="60" src="admin.jpg" ></v-img>
                </v-avatar>
                <div class="text-h6 ml-4 font-weight-medium ">
                    {{items.publication.nom}} {{items.publication.prenom}}
                    <v-icon>fas fa-arrow-right</v-icon>
                    <span class="ml-2 grey--text">{{items.domaine}}</span>
                    <span class="ml-2 grey--text">[{{items.matiere.join(", ")}}]</span><br>
                <v-chip small color="success">
                  <span class="text-caption">{{items.publication.role}}</span> 
                </v-chip>
             </div>
        </v-row>
        <v-row no-gutters class="mx-16 pa-4">
           <v-col cols="12">
              <div class="text-h5 pa-6 fill-width">
              {{items.sujet}}
            </div>
            <v-row class=" px-4 py-8 grey lighten-2" v-if="items.image_url.length>0">
              <div v-if="items.image_url.length<=2" class="fill-width row d-flex justify-space-around fill-height">
                  <v-img v-for="image,i in items.image_url" :key="i" 
                    :src="image"
                    max-height="300"
                    :class="`fill-height ${items.image_url.length< 2?'col-12':'col-5' }`">                 
                  </v-img>
              </div>
              <image-slider v-else :items="items.image_url" ></image-slider>
             </v-row> 
           </v-col> 
      </v-row>
     </div> 
</template>
<script>
import ImageSlider from '../components/ImageSlider.vue'

  export default {
    props:['items'],
    data: () => ({
      model: null,
    }),
    components:{
        ImageSlider
    }
  }
</script>