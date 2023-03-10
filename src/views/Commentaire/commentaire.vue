<template>
 <v-card class="grey px-8 pt-8 lighten-4 fill-height">
  <v-row class="mb-4">
      <PublicationHeader :items="commentaires[0]"/>
      </v-row>     
     <v-list v-if="commentaires.length > 0" three-line class="fill-height">
       <v-list-item-group>
          <template v-for="(item, index) in commentaires">
            <v-list-item
             :class="`${$route.params.time === item.updated_at ?'grey lighten-2':'white'} mb-1`"
              :key="item.id_commentaire"
            >
              <userProfil />
              <v-list-item-content>
                <v-list-item-title >
                    <div class="font-weight-medium mb-1">{{item.nom}} {{item.prenom}}</div>
                  <v-chip small color="success">
                      <span class="text-caption">{{item.role}}</span> 
                    </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle >
                    <div class="pa-4 ">
                    {{item.contenue}}
                  </div>
                    <div class="col-6 " v-if="item===edit">
                        <v-textarea autofocus v-model="comment" label="Commentaire" outlined placeholder="Commentaire ou  instructions"></v-textarea>
                        <div align="right">
                            <v-btn class="mx-2 text-capitalize" color='primary' @click="update" ><v-icon class="mr-2" small>far fa-comment</v-icon>Modifier </v-btn>
                            <v-btn class="mx-2 text-capitalize" @click="edit='';">Annuler</v-btn>
                        </div>
                    </div>
                    <div v-else class="pa-1 row text-caption">
                      <div  class="col-2 xs-6 md-6 sm-6 text-md-left">{{setDate(item.created_at)}}</div>   
                    <div  class="col-4 md-6 sm-6" >
                      <a class="mr-2 primary--text" @click="editComment(item)">Modifier</a>
                      <a class="red--text" @click="selectTodelete(item)">Supprimer</a>
                    </div>
                    </div>
                 </v-list-item-subtitle>
                
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mr-8" :key="index"  v-if="index < commentaires.length - 1"></v-divider>
          </template>
          <v-list-item>
            <formulaire-commentaire icon="" text="commentaer"></formulaire-commentaire>
          </v-list-item>
       </v-list-item-group>
    </v-list>
     <div v-else class="mx-16 pa-16 text-lg-center text-xs-center 
        text-truncate text-md-center text-sm-center text-lg-h2 text-md-h3 text-sm-h4 fill-height">
        Auccun commentaire
    </div>
     <deleteDialog @confirm='deleteComment' ref="deleteModal" title='Supprimer un commentaire' :message='deleteMessage'  ></deleteDialog>
     <alertMessage ref='alert' :types='alertType' :message='message'/>
     <pageLoader ref="loader" text="Ouverture du commentaire" :overlay="false" timeOut="1500"/>
 </v-card>
</template>
<script>
import commentService from '../../services/commentaireService'
import moment from 'moment'
import alertMessage from '../../components/alertMessage'
import deleteDialog from '../../components/Delete'
import pageLoader from '../../components/pageLoader'
import PublicationHeader from '@/components/PublicationHeader.vue'
import FormulaireCommentaire from '@/components/FormulaireCommentaire.vue'
import userProfil from '@/components/profilUser'

export default {
  name:"pageCommentaire",
    data: () => ({
       commentaires :[{
        id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["admin.jpg"/*"web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg","web image/background_image (6).jpg"*/],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:44',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       },
       { id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["web image/background_image.jpg","web image/background_image.jpg","web image/background_image.jpg"/*,"web image/background_image.jpg","web image/background_image (6).jpg"*/],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:45',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       },{
        id_pub:3,
        publication:{nom:"KENNYS",prenom:"Sedera",role:"Etudiant"},
        domaine:"Developpement mobile",matiere:["Vue.js","Node.Js","Express.js"],
        image_url:["web image/background_image.jpg","web image/background_image.jpg"/*,,"web image/background_image.jpg""web image/background_image.jpg","web image/background_image (6).jpg"*/],
        sujet:'Sujet  à resolver',created_at: '2022-07-01 15:13:41',nom:"Randriaharimalala",prenom:"Avotra",contenue: 'commenter',id_user: 1,role:"etudiant",profil_image:'admin.jpg'
       }
       ],
        selected : [],
          alertType : 'success',
          message:'',
          deleteMessage :"",
          comment:"",
          edit:''
    }),
     components : {
        alertMessage,
        deleteDialog,
        pageLoader,
       PublicationHeader,
       FormulaireCommentaire,
       userProfil
     },
    methods:{
     setNumDec(data){
      return moment(data.date_dec).format('YYYY')+' '+data.bureau+' '+data.num_dec
    },
     editComment(data){
            this.edit=data;
            this.comment=data.commentaire
        },
        alert(){
            this.$refs.alert.openAlert()
        },
     closeModal(){
       this.$refs.deleteModal.closeDialog()
       this.selected = []
    },
    selectTodelete(data){
         this.$refs.deleteModal.openDialog()
       this.deleteMessage = `Voulez vous supprimer ce commentaire ?`
       this.selected = data
    },
    async update(){
         if(this.$route.params.reference.num_doc){
         await commentService.updateCommentDoc({
             data:{
                commentaire : this.comment,
                updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                // commented_by: this.$store.state.user.id_user
                },
            where:{
                 num_doc : this.edit.reference,
                 created_at : moment(this.edit.created_at).format("YYYY-MM-DD HH:mm:ss"),
            }
        
            }).then(response=>{
              if(response.data.success){
                  this.createNotif(this.edit.reference,'modifier')
                  this.edit =''
                  this.getCommentaire()
                  }
                  else{
                  alert(response.data.error)
                  }
            }).catch(error =>{
                    alert(error.response.data.error)
               
            }) 
        }else{
          var arrayNum = this.edit.reference.split(' ')
         await commentService.updateCommentDec({
             data:{
                commentaire : this.comment,
                updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                // commented_by: this.$store.state.user.id_user
                },
            where:{
                 num_dec : arrayNum[2],
                 annee: arrayNum[0],
                 created_at : moment(this.edit.created_at).format("YYYY-MM-DD HH:mm:ss"),
            }
        
            }).then(response=>{
              if(response.data.success){
                 this.createNotif(this.edit.reference,'modifier')
                  this.edit =''
                 this.getCommentaire()
                  }
                  else{
                  alert(response.data.error)
                  }
            }).catch(error =>{
                    alert(error.response.data.error)
               
            }) 
        }
    },
      createNotif(reference,action){
        commentService.addNotif({
             reference:reference,
             created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
             action:action,
             seen_at:'0000:00:00 00:00:00',
            //  id_user:this.$store.state.user.id_user,
            })
     },
       async getCommentaire(){
         if(this.$route.params.reference.num_doc){
          var response =  await commentService.getAllCommentDoc(this.$route.params.reference) 
          this.commentaires = response.data.comment
        }else{
         response =  await commentService.getAllCommentDec(this.$route.params.reference) 
          this.commentaires = response.data.comment
         }
       },
        setDate(date){
             if(moment().diff(date,'day','day',true) > 1){
             return moment(date).locale('fr').format('llll')
         }else
             return moment(date).locale('fr').fromNow()
        },
      async deleteComment(){
        if(this.$route.params.reference.num_doc){
          await commentService.deleteCommentDoc({data:{
                num_doc:this.selected.reference,
                created_at: moment(this.selected.created_at).format("YYYY-MM-DD HH:mm:ss")
                }})
            .then(response => {
              if (response.data.success) {
              this.alert()
              this.alertType= 'success'
              this.message =  response.data.success
              }else{
                this.alert()
              this.alertType= 'error'
              this.message =  response.data.error
              
              } })
              .catch(error =>{
               this.alert()
              this.alertType= 'error'
              this.message =  error.response.data.error
               })
               this.closeModal()
                this.getCommentaire()
        }else{
         var arrayNum = this.selected.reference.split(' ')
         await commentService.deleteCommentDec({data:{
                num_dec:arrayNum[2],
                annee : arrayNum[0],
                created_at: moment(this.selected.created_at).format("YYYY-MM-DD HH:mm:ss")
                }})
            .then(response => {
              if (response.data.success) {
              this.alert()
              this.alertType= 'success'
              this.message =  response.data.success
              }else{
                this.alert()
              this.alertType= 'error'
              this.message =  response.data.error
              
              } })
              .catch(error =>{
               this.alert()
              this.alertType= 'error'
              this.message =  error.response.data.error
               })
               this.closeModal()
                this.getCommentaire()
        }
  
      }
    },
    mounted(){
      // this.$refs.loader.loading()
      // this.getCommentaire()
    }
  }
</script>
<style>
.c-pointer {
    cursor: pointer;
}
</style>
