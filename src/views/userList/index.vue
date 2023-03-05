<template>
    <div class="">
        <div class="py-4 ma-4 text-xl-h1 text-lg-h2 text-h4 text-sm-h3 blue--text font-weight-black">
            <span class="grey--text">L</span>iste des utilisateurs 
        </div>
        <v-card class="ma-4 py-4">
            <v-row>
            <v-col class='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3'>
                <v-btn @click='openDialog' color='cyan  white--text text-capitalize my-4 ml-4' >Nouveau +</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class='col-xl-4 col-lg-4 col-md-4 col-sm-5 col-8 pl-4'>
                <v-text-field
                    class="ma-4 outlined rounded-xl "
                    v-model="search"
                    outlined
                    dense
                    placeholder="Recherche d'un utilisateur"
                    append-icon="fas fa-search"
                    label="Search"
                    single-line
                    hide-details
                    @keyup="Recherche"
                ></v-text-field>
            </v-col>
        </v-row>
        </v-card>
        <v-row
                  align="center"
                  justify="space-around"
                  class="my-8 overflow-x-auto"
                >
                  <v-btn @click="active='all';getList()" :class="`col-2 rounded-t text-lg-subtitle-2 text-sm-caption ${active==='all'?'blue white--text':'grey lighten-4'}`">
                    Tous
                  </v-btn>
                  <v-btn @click="active='user';getList()" :class="`col-2  text-lg-subtitle-2 text-sm-caption ${active==='user'?'blue white--text':'grey lighten-4'}`" >
                     Actifs
                  </v-btn>
                 <v-btn @click="active='online';getList()" :class="`col-2  text-lg-subtitle-2 text-sm-caption ${active==='online'?'blue white--text':'grey lighten-4'}`" >
                    En ligne
                  </v-btn>
                   <v-btn @click="active='bloqued';getList()" :class="`col-2 text-lg-subtitle-2 text-sm-caption ${active==='bloqued'?'blue white--text':'grey lighten-4'}`" >
                    Bloqués
                  </v-btn>
                 
           </v-row>
            <v-layout row wrap  v-if="users.length>0" 
                max-height="600px"
                class="overflow-y-auto  ma-4">
                <v-flex  xs12 sm4  md4 lg3 v-for=" user in listUsers" :key="user.id_User">
                   <v-hover >
                       <template v-slot='{hover}'>
                            <v-card align='center' text :class='`xs6 offset-xs3 ma-3 elevation-${hover?24:4}`' >
                              
                                <v-responsive class="grey lighten-4" >
                                <v-img height='110' src='web image/background_image (6).jpg'>
                                  <v-spacer></v-spacer>
                              <v-card-actions>
                                <v-icon  small color='red' 
                                  class="c-pointer float-xl-right mt-n2 ml-n2"
                                  @click='del=true;confirmer(user)'>
                                  fas fa-times-circle
                                </v-icon>
                              </v-card-actions></v-img >
                                <v-flex class="mt-n11 " >
                                    <v-avatar size="100"  class="grey lighten-2 elevation-1">
                                         <v-img src="admin2.jpg" ></v-img>
                                    </v-avatar>
                                        
                                   <v-btn absolute  icon class="ml-n6 mt-16 mb-n9">
                                        <v-file-input v-model="img"  @change="changeProfilImg" @click="utilisateur=user.id_user"  hide-input prepend-icon="fas fa-camera"></v-file-input>
                                    </v-btn>
                                    <v-progress-linear v-if="progress && utilisateur===user.id_user" :value="progress"></v-progress-linear>
                                    <div class="mt-1 mb-4">
                                        <span class="font-weight-bold grey--text darken-2 subheading mt-1 ">{{user.nom}} {{user.prenom}}</span><br>
                                       </div>
                                </v-flex>   
                            </v-responsive>
                            <v-card-text align='left'>
                                
                                <div class="text-heading-6 pa-1 col-12 text-truncate">
                                    <v-icon small class="ma-1">fas fa-user</v-icon> 
                                    {{user.role}}
                                </div>
                                <div class="text-heading-6 pa-1 col-12 text-truncate">
                                    <v-icon small class="ma-1">fas fa-envelope</v-icon>
                                    {{user.email}}
                                </div>
                                <div class="text-heading-6 pa-1 col-12 text-truncate">
                                    <v-icon small class="ma-1">fas fa-tty</v-icon> 
                                    {{user.num_tel}}
                                </div>
                                <div class="text-heading-6 cursor pa-1 col-12 text-truncate" @click="navigateTo({name:'userProfil',params:{idUser: user.id_user}})">
                                     <v-icon small class="ma-1">fas fa-ellipsis-h</v-icon>
                                     Plus d'information
                                 </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="grey" >
                                    <v-icon size='2x'>far fa-comment-dots</v-icon>
                                    <span class="px-2 ">Message</span>
                                </v-btn>
                               
                                <v-spacer></v-spacer>
                                <v-row class=" mx-4">
                                <v-spacer></v-spacer>
                                   <v-col cols="1" class="mr-2">
                                    <toolTip :text='`Modifier `' >
                                        <v-icon slot='icon'  @click="displayData(user)" color='blue'  small class="mx-4 cursor" >fas fa-user-edit</v-icon>
                                    </toolTip>
                                    </v-col>
                                    <v-col  cols="1" class="mr-2">
                                    <toolTip :text='`${text = user.status_user? "Bloquer" : "Débloquer"}`' >
                                      <v-icon small  slot='icon' :color="user.status_user? 'red' : 'green' " @click="confirmer(user)"  class="mx-2  pr-2 cursor" >{{setIcon(user)}}</v-icon>
                                     </toolTip>
                                   </v-col>
                                </v-row>
                            </v-card-actions>
                            </v-card>
                      </template>
                   </v-hover>
                    
                </v-flex>
                <v-snackbar
                    v-model="hasUpdated"
                    :timeout="3000"
                    :color="types"
                     top right> 
                    <v-alert :type='types'>
                         {{message}}
                    </v-alert>
                   <template v-slot:action="{ attrs }">
                    <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        @click="hasUpdated = false"
                      > x </v-btn>
                   </template>
              </v-snackbar>
            </v-layout>
            <div v-else  class="text-center mx-auto mt-16 text-h4 font-weight-black  pa-4" transition="fab-transition">
                <v-icon color='orange' x-large class="ma-auto">fas fa-exclamation-triangle</v-icon> Auccun utilisateur !<v-icon x-large  class="ma-2">fas fa-frown</v-icon>
              </div>
            <Pagination ref="page" :pageCount='pageCount' />          
            <pageLoader ref="loader" :timeOut="3000" text="Lecture de la liste des utilisateurs"/>
        <register ref="form"  />
         <deleteDialog  ref="modal" title="Bloquer l'utilisateur" @confirm='accepted' :message='bloquageMessage'  > 
        </deleteDialog>
    </div>
</template>

<script >
import moment from 'moment'
import toolTip from '@/components/toolTip'
import Pagination from '@/components/Pagination'
import deleteDialog from '@/components/Delete'
import register from '../Register'
import AuthentificationService from '@/services/AuthentificationServices'
import server from  '@/services/server.config'
 import  pageLoader  from "@/components/pageLoader";

 export default {
     name:"userList",
    data () {
        return{        
            server:server.URL,
            page:1,
            utilisateur:'',
            message : '',
            hasUpdated: false,
            users:[
                {id:1,email: 'avoutrarandriah@gmail.com',password: '$2a$08$cbKXzEbyOTat722PxtYNIOYiLeXiSIFOTHvtEZ6ewflNezrrnrShq',profil_image: 'uploads/IMG_7302.JPG',user_permission:'Administrateur',status_user:true,status_connexion: true,created_at: '2021-04-01 00:00:00',updated_at: '2022-12-13 09:30:18',user_matricule:554,nom: 'LIONEL',prenom: 'Messi',date_naiss: '2021-05-04 00:00:00',lieu_naiss: 'Argentine',adresse: 'Barcelone',role: 'Inspecteur', num_tel:554554554},
                {id:2,email: 'rojonantenaina@gmail.com', password:'$2a$08$tLz7oSw/6z2YF/ldF21GJesnzi.2Rj4y1VglgdYAVyFucNrFNaMX6',profil_image: 'uploads/IMG_7221.JPG',user_permission:'User', status_user:true, status_connexion:false, created_at:'2021-04-01 00:00:00', updated_at:'2022-10-15 15:12:56',user_matricule:1985,nom: 'RANDRIAHARIMALALA',prenom: 'Avotra',date_naiss: '2021-04-05 00:00:00',lieu_naiss: 'Imady',adresse: 'ISada', role:'Controlleur', num_tel:342662319},
                {id:3,email: 'mandressy@gmail.com',password: '$2a$08$u2g2evIzmAUN0eU6P7ts9.8sKbcv66Pqc.OECJACejMbII1ne93f.', profil_image:'uploads/IMG_7200.JPG',user_permission:'User',status_user: true,status_connexion: true,created_at: '2021-04-01 00:00:00',updated_at: '2022-10-15 15:11:55',user_matricule:4564,nom: 'JOSOAH',prenom: 'Nantenaina',date_naiss: '2021-04-12 00:00:00',lieu_naiss: 'Ambatao',adresse: 'Andrainato',role: 'Auditeur',num_tel: 44555654},
                {id:4,email: 'josoah@gmail.com',password: '$2a$08$0evnvyc.dk4RsEQNixzS5.B38xLQ73/KTdYoyOcunZ.a7AnwrQq0C',profil_image: 'uploads/IMG_7234.JPG', user_permission:'User', status_user:true, status_connexion:true, created_at:'2021-04-01 00:00:00', updated_at:'2022-10-15 15:10:46',user_matricule:5545,nom: 'ROJONANTENAINA',prenom: 'Henri Paul',date_naiss: '2021-03-10 00:00:00',lieu_naiss: 'Ambato',adresse: 'Imandry', role:'Controlleur',num_tel: 45},
                {id:5,email: 'zukoyan.jason@gmail.com', password:'$2a$08$mjSbWVdXxrX6Ohr6ElIuUeJRytVsHSxKiEXBCeypBF0A2esS2M2oq',profil_image: 'uploads/IMG_20220802_202921.jpg',user_permission: 'User',status_user: true,status_connexion: true,created_at: '2021-04-07 00:00:00',updated_at: '2022-10-31 20:42:33',user_matricule:5665,nom: 'ZATOVO',prenom: 'Daniel',date_naiss: '1996-01-03 00:00:00',lieu_naiss: 'Mandrosonoro',adresse: 'Isada', role:'Auditeur',num_tel: 344555678},
                {id:6,email: 'zatovodaniel@gmail.com',password: '$2a$08$7VfMbe4l3QVsOd0sgZTcv.MALnQJxDwgkrPhU1PgH34XI3fPUP1kW',profil_image: 'uploads/IMG_7251.JPG',user_permission: 'Administrateur',status_user: true,status_connexion: true,created_at: '2021-04-04 00:00:00',updated_at: '2022-11-28 22:38:39',user_matricule:10098,nom: 'ANDRIATSITOHAINAHARIMALALA',prenom: ' Miangoty Fitia',date_naiss: '1998-04-05 00:00:00',lieu_naiss: 'Fianarantsoa', adresse:'Lot 03KIII-M/3605', role:'Côntrolleur',num_tel: 347263334},
                {id:7,email: 'lionel.messi@gmail.com',password: '$2a$08$pUxeQbQgbxNluSwuj8hsx.WNUTQWEdB/RYNFf.XBure77G91nDzyy',profil_image: 'uploads/IMG_20220812_180144.jpg',user_permission: 'Consulteur',status_user: true,status_connexion: false,created_at: '2021-05-01 11:45:33',updated_at: '2022-10-16 01:29:51',user_matricule:44555,nom: 'MANDRESY',prenom: 'Jofama',date_naiss: '2021-04-04 00:00:00',lieu_naiss: 'Ambositra',adresse: 'Isada', role:'Auditeur', num_tel:341786640},
                {id:8,email: 'randriah@gmail.com', password:'$2a$08$7Ieo/0xW9xjFV1n9HAEBkukf2cuAORa9X0RpxIa1Ot0HgnoDvQx7O',profil_image: 'uploads/1 (384).jpg',user_permission: 'Consulteur',status_user: true,status_connexion: false,created_at: '2021-05-01 20:02:18',updated_at: '2022-10-14 22:28:18',user_matricule:44565,nom: 'ZUKO ', prenom:'Yan', date_naiss:'2021-04-04 00:00:00',lieu_naiss: 'Fianarantsoa',adresse: 'Antsahameva',role: 'Controlleur',num_tel: 340745643},
                {id:9,email: 'jaomalala@gmail.com', password:'$2a$08$7Ieo/0xW9xjFV1n9HAEBkukf2cuAORa9X0RpxIa1Ot0HgnoDvQx7O', profil_image:'uploads/1 (384).jpg',user_permission:'User',status_user: true,status_connexion: true,created_at: '2022-10-07 05:59:17',updated_at: '2022-10-31 15:13:25',user_matricule:100034,nom: 'JAOMALALA',prenom: ' Tolojanahary Play Jofama',date_naiss: '2022-10-07 05:54:06',lieu_naiss: 'IMADY',adresse: 'AMBATOFINANDRAHANA',role: 'Auditeur',num_tel: 34726333},
                {id:10,email: 'miangotyandriah@gmail.com',password: '$2a$08$7Ieo/0xW9xjFV1n9HAEBkukf2cuAORa9X0RpxIa1Ot0HgnoDvQx7O',profil_image: 'uploads/Snapchat-921710734.jpg',user_permission:'User',status_user: false,status_connexion: true,created_at: '2022-10-10 12:57:47',updated_at: '2022-10-31 15:13:17',user_matricule:545554,nom: 'RANDRIAHARIMALALA',prenom: 'AVOTRA',date_naiss: '2021-05-11 00:00:00', lieu_naiss:'SDKVLLDKSKLDGHKLSD',adresse: 'LLSKDVLKSDKLQLK',role: 'Inspecteur',num_tel: 0},
                {id:12,email: 'azertyuiop@gmail.com',password: '$2a$08$7Ieo/0xW9xjFV1n9HAEBkukf2cuAORa9X0RpxIa1Ot0HgnoDvQx7O', profil_image:'uploads/954026446.jpg',user_permission:'Consulteur',status_user: false,status_connexion: true,created_at: '2022-10-15 14:37:51',updated_at: '2022-10-31 15:13:54',user_matricule:7676576,nom: 'UKKUGUGUGKUGUKG',prenom: ' Lmumlumlu',date_naiss: '2004-10-15 00:00:00',lieu_naiss: 'klhkhlkhkl',adresse: 'lkhlkhklh', role:'Agent',num_tel: 2147483647},
                ],
            show:false,
            search:'',
            file:null,
            img:null,
            types:'success',
            bloquageMessage : '',
            del:false,
            perPage:"10",
            progress:0,
            url_image:null,
            active:'all',
            userCopy:[]
        }
    },
  methods :{
      getList(){
          this.page=1
        if (this.active==='all') {
              this.users = this.userCopy
         }else if(this.active==='bloqued'){
             this.users = this.userCopy.filter(d => d.status_user===false )
         }else if(this.active==='online'){
             this.users = this.userCopy.filter(d => d.status_connexion===true )
         } else{
             this.users = this.userCopy.filter(d => d.status_user===true )
         } 
      },
     navigateTo (route) {
         this.$router.push(route)
       
        },
    setIcon(user){
          return user.status_user ? 'fas fa-user-times': 'fas fa-user'
      },
      openDialog(){
          this.$refs.form.openDialog()
      },
    displayData(data){
        this.show = true
        this.$refs.form.dispalayData(data)
    },
    async changeProfilImg () {
         if(this.img!==""){ 
         let formData = new FormData()
         formData.append('file',this.img)
         formData.append('name','picture') 
         AuthentificationService.upload(formData,(event)=>{
                this.progress = Math.round((100 * event.loaded)/event.total)
            })
            .then(resp=>{
                if (resp.data.message) {
                   this.updateProfil('uploads/'+this.img.name)
                   
                 }
            }).catch(err=>{
                this.hasUpdated=true
                this.message =  err
                this.types= 'error'

            })
           }
    },
    async updateProfil(img){
         await AuthentificationService.updateAccount({
            account:{
                profil_image: img,
                updated_at : moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            where :{ id_user : this.utilisateur}
            }).then(response => {
                if (response.data) {
                this.hasUpdated=true
                this.types= 'success'
                this.message =  response.data.success
                this.progress = 0
                } })
                .catch(error =>{
                this.alert=true
                this.alertType= 'error'
                this.message =  error
                })
                this.getAllUsers() 
    },
    closeDialog(){
        this.$refs.modal.closeDialog()
        this.del = false
       this.utilisateur = ""
    },
    accepted(){
        if(this.del) {
           this.deleteUser()
           } 
           else this.setStatusUser()
    },
    async getAllUsers () {
        this.$refs.loader.loading()
    //    const response = await AuthentificationService.show()
    //    this.users = response.data.user
       this.userCopy = this.users
       this.getList()
       }, 
      Recherche (){
         if(this.search === ''){
           this.getAllUsers()
          }
        else{
          var doc = this.users.filter(d => 
                d.nom.includes(this.search.toLowerCase())||d.prenom.toLowerCase().includes(this.search.toLowerCase())
                ||d.email.toLowerCase().includes(this.search.toLowerCase())
                )
                this.users = doc 
        }
    },  
    async changePassword () {
       const response = await AuthentificationService.updateAccount({
          account:{
               password: 'avotra54',
               updated_at : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
          where :{ email : 'avoutrarandriah@gmail.com',}
          }) 
       this.message= response.data.success
       this.hasUpdated = true
       this.getAllUsers()

    },
    confirmer(user){
       this.$refs.modal.openDialog()

       this.bloquageMessage =this.del ? `Voulez vous supprimer ${user.nom } ${user.prenom} de la liste des utilisateurs ?` : user.status_user ? `Voulez vous bloquer  ${user.nom } ${user.prenom}  ?` : `Voulez vous débloquer  ${user.nom } ${user.prenom}  ?`
       this.utilisateur = user
      },
    async setStatusUser () {
        var status = this.utilisateur.status_user
        await AuthentificationService.updateAccount({
          account:{
               status_user: !status,
               updated_at : moment().format('YYYY-MM-DD HH:mm:ss'),
          },
          where :{ id_user : this.utilisateur.id_user}
          }).then(response => {
              if (response.data) {
              this.hasUpdated=true
              this.types= 'success'
              this.message = `Vous avez  ${status ? 'bloqué ': 'débloqué '} ${this.utilisateur.nom} ${this.utilisateur.prenom}`
              } })
              .catch(error =>{
               this.hasUpdated=true
              this.types= 'error'
              this.message =  error.response.data.error
               })
       this.getAllUsers()
       this.closeDialog()
    }, 
    async deleteUser () {
       await AuthentificationService.delete({data :{ id_user : this.utilisateur.id_user}})
        .then(response => {
              if (response.data) {
              this.hasUpdated=true
              this.types= 'success'
              this.message = `Vous avez  supprimé ${this.utilisateur.nom} ${this.utilisateur.prenom}`
              } })
              .catch(error =>{
               this.hasUpdated=true
              this.types= 'error'
              this.message =  error.response.data.error
               })
       this.getAllUsers()
       this.$refs.modal.closeDialog()
    },

  },
  mounted (){
    this.getAllUsers()
    this.nbr =this.$refs.page.perPage
   
  },
  computed:{
       listUsers(){
        var items = this.perPage === 'All' ? this.users : this.users.slice((this.page - 1) * this.perPage, this.page * this.perPage)
         return items
     },
     pageCount (){
        return this.perPage === 'All' ? 1 : Math.ceil(this.users.length/this.perPage)
     }
  },
  components :{
     deleteDialog,
     toolTip,
     register,
     Pagination,
     pageLoader
  }

}
</script>
<style scoped>
.cursor {
    cursor: pointer
}
</style>


