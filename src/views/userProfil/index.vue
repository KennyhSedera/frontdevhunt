<template>
    <v-div class="full-screen ma-4">
      <v-row no-gutters class="mx-4">
        <v-col cols="4" >
                <v-card >
                    <v-responsive align='center'>
                         <v-flex  >
                            <v-img src='web image/background_image (6).jpg'
                                height=''
                                class="pt-4 pb-8"
                                gradient='to top, rgba(0,0,0,.1), rgba(0,0,0,.5)'>
                                <v-avatar class="mt-2"  size='200'>
                                  <v-img :src="`${user.profil_image}`" ></v-img>
                                </v-avatar> 
                                <div class="white--text text-h5 font-weight-black mb-2">
                                     {{user.prenom}} {{user.nom}}
                                </div>
                               <div class="mb-4 text-h6 grey--text">
                                  {{user.user_permission}} 
                                </div>
                           </v-img>
                         </v-flex>      
                     </v-responsive>      
                </v-card>
        </v-col>
        <v-col >
           <v-card class="ml-4 mr-2 elevation-2 fill-height">
               <v-toolbar flat dense class=" rounded-t" dark>
                  <v-toolbar-title><v-icon small class="mx-4">fas fa-info-circle</v-icon>Informations personnel</v-toolbar-title>          
              </v-toolbar>
           <v-card-text>
                <div class="text-subtitle-1"><v-icon small class="mx-4">IM</v-icon><span class="font-weight-black">{{user.num_matricule}}</span> </div>
                <div class="text-subtitle-1"> <v-icon small class="mx-4">fas fa-user</v-icon> {{user.nom}}  {{user.prenom}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-calendar</v-icon>{{setDate(user.dateNaiss)}} à {{user.lieuNaiss}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-map-marker</v-icon>{{user.adresse}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-sitemap</v-icon>{{user.nom_div}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-street-view</v-icon>{{user.role}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-envelope</v-icon>{{user.email}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-tty</v-icon>0{{user.num_Tel}}</div>
                
            </v-card-text>
             </v-card>
        </v-col>
     </v-row> 
    <v-row class="mx-4" no-gutters>
        <v-card class="pb-10 px-4 col-4 my-4" >
            <div class="my-4 py-4  text-h5 font font-weight-black">
                <v-icon small color="black" class="mr-4">
                 fas fa-chart-bar
                </v-icon>
              Pérformences
          </div> 
          <div class="pb-4">
          <span>Document participé : <span class="text-h6">{{document}}</span></span>   <v-progress-linear color="orange" value="100"></v-progress-linear>
          </div>
          <div class="pb-4">
              <span class="">Total déclarations : <span class="text-h6">{{totalDec}}</span></span><v-progress-linear color="blue accent-4" value="100"></v-progress-linear>
          </div>
          <div class="pb-4">
              <span class="">RAS : <span class="text-h6">{{RienASignaler}}%</span></span><v-progress-linear color="green accent-4" :value="RienASignaler"></v-progress-linear>
          </div>
          <div class="pb-4">
              <span class="">En attente : <span class="text-h6">{{Waiting}}%</span></span><v-progress-linear color="yellow accent-4" :value="Waiting"></v-progress-linear>
          </div>
          <div class="pb-4">
              <span class="">Fraude : <span class="text-h6">{{Frauduleux}}%</span></span><v-progress-linear color="red accent-4" :value="Frauduleux"></v-progress-linear>
          </div>
          <div class="mb-2 pb-4">
          <span> PVS : </span><span class="text-h6">{{pvs}}/{{Fraude}}</span> <v-progress-linear color="cyan" :value="havePvs"></v-progress-linear>
          </div>
       </v-card> 
       <div class="col-8 my-4"> 
          <v-card class="ml-4" :height="`${me? '50%' : '100%'}`">
              <div class="text-h5 font-weight-black mb-4 grey py-2">
                <v-icon small color="black" class="mx-4">
                  fas fa-history
                </v-icon>
                Historiques
              </div>
              <div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon>Dernier mise à jour déclarations : {{lastDec}}</div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon>Dernier rapport sectoriel : {{lastRp}}</div>
                <!-- <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon>Dernier connexion </div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon><a class="black--text" >Historiques de connexion</a></div> -->
              
              </div>
          </v-card>
          <v-card class="ml-4 my-5 " height="50%" v-if="me">
              <div class="text-h5 font-weight-black mb-4 grey py-2"><v-icon color="black"  small c class="mx-4">fas fa-wrench</v-icon>Paramètres</div>
              <div>
                <div class="text-subtitle-1 mb-2">
                  <v-icon small c class="mx-4">fas fa-key</v-icon>
                  <a @click="$router.push({name: 'ChangePW',params:{nav: true}})" class="blue--text">
                    Changer le mot de passe
                    </a> 
                </div>
                
              </div>
          </v-card>
       </div>
    </v-row>
    </v-div> 
</template>
<script>
import moment from 'moment'
import AuthentificationService from '@/services/AuthentificationServices'
import server from  '../../services/server.config'

export default {
   name:"userProfil",
    data () {
        return {
          server:server.URL,
            userInfos : '',
            user:{id:1,email: 'avoutrarandriah@gmail.com',password: '$2a$08$cbKXzEbyOTat722PxtYNIOYiLeXiSIFOTHvtEZ6ewflNezrrnrShq',profil_image: 'admin.jpg',user_permission:'Administrateur',status_user:true,status_connexion: true,created_at: '2021-04-01 00:00:00',updated_at: '2022-12-13 09:30:18',user_matricule:554,nom: 'LIONEL',prenom: 'Messi',date_naiss: '2021-05-04 00:00:00',lieu_naiss: 'Argentine',adresse: 'Barcelone',role: 'Inspecteur', num_tel:554554554},
            defaultImg :`logo.png` ,
            totalDec:20,
            RAS:3,
            Fraude:5, 
            Wait: 2,
            id:1,
            document :12,
            pvs :0,
            lastDec : "Auccune déclaration enrgistrée",
            lastRp : "Auccun rapport sur les déclarations",
            me : false
        }
    },
    methods :{
        setDate(date){
       return moment(date).format('DD/MM/YYYY')
        },
        async profilUser(){ 
          this.user =[]
          if(this.$route.params.idUser ===  this.$store.state.user.id_user){
           this.user = this.$store.state.user
           this.me = true
         }
          else 
          {
            const user = await AuthentificationService.infos(this.$route.params.idUser)
           this.user = user.data.infos
           }

        const response = await AuthentificationService.profil(this.$route.params.idUser)
        //  console.log(response.data)
        this.Wait = Number(response.data.enAttente.nbrEnAttente )
        this.Fraude =  Number(response.data.fraude.nbrFraude)  
        this.RAS =   Number(response.data.Ras.nbrRAS)
        this.totalDec = this.Wait + this.Fraude + this.RAS
        this.document =Number(response.data.Doc.nbrDoc) 
        this.lastDec =response.data.story.maxDec === null ? "Auccune déclaration enregistrée" : moment(response.data.story.maxDec).locale('fr').format("LLLL")
        this.pvs = response.data.Pvs === null ? 0 : Number(response.data.Pvs.nbrPvs) 
        this.lastRp = response.data.story.rapportsectoriel.maxRp ===null ? "Auccun rapport sur les déclarations" : moment(response.data.story.maxRp).locale('fr').format("LLLL")
       
     }
    },
     watch : {
       options: {
        handler () {
        this.profilUser()
        this.user = this.$refs.comboUser.user
        },
        deep: true,
      },
     
     },
    mounted () { 
      // this.profilUser()
     } ,
    computed:{
    idUser(){
        return this.$store.state.user.id_user 
        },
      rating (){
         var rt = this.Fraude <= 0 ? 0 : this.totalDec < 5 ? 1 : parseFloat((Number(this.Fraude) *5/Number(this.totalDec)).toFixed(2))
        return rt = isNaN(rt) ?0 : rt
      },
       Waiting(){
         var wait = Number(this.Wait * 100/this.totalDec)
         return wait = isNaN(parseFloat(wait.toFixed(2))) ? 0 : parseFloat(wait.toFixed(2))
       },
       RienASignaler(){
         var ras = Number(this.RAS * 100/this.totalDec)
         return ras = isNaN(parseFloat(ras.toFixed(2))) ? 0 : parseFloat(ras.toFixed(2))
       },
       Frauduleux(){
         var fraude = Number(this.Fraude * 100/this.totalDec)
        return fraude = isNaN(parseFloat(fraude.toFixed(2))) ? 0 : parseFloat(fraude.toFixed(2))
       },
       havePvs(){
         var pvs = Number(this.pvs * 100/this.Fraude)
        return pvs = isNaN(parseFloat(pvs.toFixed(2))) ? 0 : parseFloat(pvs.toFixed(2))
       }
    }
}
</script>
<style scoped>
.cover3{
 -webkit-clip-path: polygon(25% 0, 0 20%, 0 36%, 16% 43%, 28% 25%, 48% 23%, 48% 40%, 26% 46%, 30% 66%, 53% 56%, 58% 83%, 29% 87%, 14% 69%, 1% 79%, 11% 100%, 62% 100%, 95% 89%, 94% 57%, 73% 47%, 93% 30%, 91% 11%, 67% 0);
clip-path: polygon(25% 0, 0 20%, 0 36%, 16% 43%, 28% 25%, 48% 23%, 48% 40%, 26% 46%, 30% 66%, 53% 56%, 58% 83%, 29% 87%, 14% 69%, 1% 79%, 11% 100%, 62% 100%, 95% 89%, 94% 57%, 73% 47%, 93% 30%, 91% 11%, 67% 0);

}
.cover4{
  -webkit-clip-path: polygon(37% 0, 23% 11%, 0 28%, 0 68%, 42% 68%, 42% 46%, 11% 47%, 20% 38%, 34% 22%, 43% 11%, 43% 33%, 42% 51%, 41% 67%, 41% 100%, 57% 100%, 71% 100%, 71% 68%, 100% 68%, 100% 44%, 71% 46%, 72% 18%, 62% 0);
clip-path: polygon(37% 0, 23% 11%, 0 28%, 0 68%, 42% 68%, 42% 46%, 11% 47%, 20% 38%, 34% 22%, 43% 11%, 43% 33%, 42% 51%, 41% 67%, 41% 100%, 57% 100%, 71% 100%, 71% 68%, 100% 68%, 100% 44%, 71% 46%, 72% 18%, 62% 0%);

}
.cover{
  -webkit-clip-path: polygon(100% 30%, 68% 22%, 100% 79%, 0 81%, 26% 22%, 0% 29%, 21% 0%, 48% 20%, 26% 58%, 48% 100%, 68% 57%, 49% 21%, 76% 0%);
clip-path:polygon(100% 30%, 68% 22%, 100% 79%, 0 81%, 26% 22%, 0% 29%, 21% 0%, 48% 20%, 26% 58%, 48% 100%, 68% 57%, 49% 21%, 76% 0%);

}
</style>
