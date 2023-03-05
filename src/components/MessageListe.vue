<template>
    <v-list  two-line nav dense  max-height="700px" class="grey lighten-2 full-screen overflow-auto pb-4">
                  <v-list-item class=" grey lighten-2 py-xl-4 py-lg-4 py-md-2 " >
                     <v-row >
                      <v-flex xl3 lg3 md3 sm4  class=''>
                         <v-icon color="black" class="mx-2">fas fa-envelope</v-icon> 
                         <span class="font-weight-black text-left text-lg-h6 text-md-h5 text-sm-h6 text-xs-h2">Messages</span> 
                       </v-flex>
                       <v-spacer></v-spacer>
                       <v-flex v-if="messages.length>0" xl3 lg3 md3 sm4  
                          class="justify-xs-end justify-lg-end justify-xl-end justify-md-end ">
                             <a v-if="unseen > 0 " class="ml-4 text-right text-caption text-sm-body-2 text-md-caption text-lg-subtitle-1  font-weight-regular" @click="setAllSeen">Marquer tous comme lus</a>
                             <a v-else class="ml-4 text-right text-caption text-sm-body-2 text-md-caption text-lg-subtitle-1 font-weight-regular" @click="setAllunSeen">Marquer tous comme non lus</a>
                        </v-flex>
                    </v-row>
                  </v-list-item>
                   
                  <v-list-item-group v-if="messages.length>0">
                    <template v-for="(item, index) in messages">
                    <v-list-item
                        :key="index"
                        :class="`${item.vu === null ?'grey lighten-4':'white'}`"
                        link
                        @click="goTo(item)"
                    >
                    <v-list-item-avatar>
                        <img :src="`${server}${item.profil_image}`" />
                        </v-list-item-avatar>
                    <v-list-item-content>
                      <!-- <v-list-item-title> -->
                        <span class="pa-4 text-left text-xl-subtitle-1 text-lg-subtitle-2 text-lg-subtitle-1 text-caption" v-html="action(item)">
                          
                        </span>
                    <!-- </v-list-item-title> -->
                    <!-- <v-list-item-subtitle> -->
                         <span class="px-4 text-xl-h6 text-left text-xl-body-2 text-lg-body-2 text-md-caption text-sm-caption text-caption">
                           {{setDateFromNow(item.created_at)}}
                        </span> 
                    <!-- </v-list-item-subtitle> -->
                   </v-list-item-content>   
                </v-list-item>
               <v-divider class="black my-1" :key="item.created_at" v-if="index < messages.length -1"></v-divider>
                </template>
                  </v-list-item-group>
                  <div v-else class="mx-16">
                      Auccune message !
                  </div>

     </v-list>
</template>

<script>
import commentService from '../services/commentaireService'
import moment from 'moment'
import server from  '../services/server.config'

export default {
    name:'componentListMssg',
 data (){
     return{
        //  messages:[]
         server:server.URL,

     }
 },
props:['messages','unseen'],
 methods:{
    setAllSeen(){
        this.messages.forEach(element => {
           if( element.vu === null){
             this.seeNotif(element) 
            }
        });
         this.getmessage()
    },
    setAllunSeen(){
        this.messages.forEach(element => {
            if( element.seen_at !== null){
               this.deleteNotif(element) 
            }
        });
      this.getmessage()
    },
    async deleteNotif(data){
        await commentService.deletemessage({data:{
            reference: data.reference,
            created_at: moment(data.created_at).format("YYYY-MM-DD HH:mm:ss"),
            vu:this.$store.state.user.id_user,
            }})
    },
    seeNotif(item){
        commentService.setVuNotif({
             reference:item.reference,
             created_at:moment(item.created_at).format("YYYY-MM-DD HH:mm:ss"),
             action:item.action,
             id_user:item.id_user,
             vu:this.$store.state.user.id_user,
             seen_at : moment().format("YYYY-MM-DD HH:mm:ss")
             })
     },
     setDate(date){

            return moment(date).locale('fr').format('llll')
        },
     setDateFromNow(date){
         if(moment().diff(date,'day','day',true) > 1){
             return moment(date).locale('fr').format('llll')
         }else
             return moment(date).locale('fr').fromNow()
    },
    goTo(item){
        console.log(item.seen_at)
       if(item.seen_at===null){
          this.seeNotif(item)
         }
        if(item.action==="modifier" || item.action==="commenter"){
             if(item.reference.indexOf('/') > -1){
                    this.$router.push({name: 'Commentaire',params:{ reference :{num_doc : item.reference},time: item.created_at}})
        
                }else{
                    this.$router.push({name: 'Commentaire',params:{ reference :{declaration : item.reference},time: item.created_at}})
                }
         }else{
             this.$router.push({name: 'document',params:{ num_doc : item.reference }})
        
         }
         this.$parent.$parent.$parent.$parent.menu = false
        
    },
    setNumDec(data){
      return moment(data.date_dec).format('YYYY')+' '+data.bureau+' '+data.num_dec
    },
    action(item){
        var verbe =""
        switch (item.action) {
            case "commenter":
                verbe = "a commenté "  
                break;
             case "modifier":
                verbe = "a modifié le commentaire sur "  
                break;
              case "modifier_doc":
                verbe = "a modifié "  
                break;
              case "commencer":
                verbe = "a commencé l'étude sur "  
                break;
             case "Términé":
                verbe = "a términé "  
                break;
             case "Critique":
                verbe = "a mis en critique "  
                break;
             case "reétudier":
                verbe = "a reétudié "  
                break;
            default:
                verbe = 'a ajouté'
                break;
        }
       var action =`<b>${item.nom} ${item.prenom}</b> ${verbe} ${item.reference.indexOf('/')> -1 ?'le document': 'la déclaration' } <b>${item.reference}</b>`
       return action
       },
    async getmessage(){
      this.$parent.$parent.$parent.$parent.getmessage()
     
    }
 },
 mounted(){
    //   this.messages = []
    //  this.getmessage()
 }
}
</script>

<style>

</style>