<template>
 <div>
    <formulairePublier></formulairePublier>
    <v-card class="pa-8" v-for="item,i in publication" :key="i">
        <PublicationHeader :items="item" ></PublicationHeader>
        <div class="col-4 ml-16">
            <Reaction @like="reagir('like')" @dislike="reagir('dislike')" @love="reagir('love')"
             @comment="$router.push({path:'/commentaire',params:{id_pub: item.id_pub}})"/>
        </div>
        
    </v-card>
    
 </div>
</template>
<script>
import formulairePublier from "../../components/formulairePublier"
import PublicationHeader from "../../components/PublicationHeader"
import Reaction from "../../components/reaction"

export default {
    name:"pagePublication",
    components:{
        formulairePublier,
        PublicationHeader,
        Reaction
    } ,
    data(){
        return{
     publication :[{
        id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["admin.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image (6).jpg"],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:44',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       },
       {
        id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["admin.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image (6).jpg"],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:44',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       },
       {
        id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["admin.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image (6).jpg"],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:44',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       }]
        }
    },
    methods:{
        reagir(data){
           alert(data)
        }
    } 
}
</script>
