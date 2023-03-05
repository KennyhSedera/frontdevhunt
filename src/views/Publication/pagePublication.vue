<template>
 <div>
    <formulairePublier></formulairePublier>
    <PublicationHeader :publication="publication" ></PublicationHeader>
 </div>
</template>
<script>
import formulairePublier from "../../components/formulairePublier"
import PublicationHeader from "../../components/PublicationHeader"

export default {
    name:"pagePublication",
    components:{
        formulairePublier,
        PublicationHeader
    } ,
    data(){
        return{
     publication :{
        id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["admin.jpg"/*"web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image (6).jpg"*/],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:44',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       }
        }
    } 
}
</script>
