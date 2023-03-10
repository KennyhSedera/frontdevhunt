<template>
    <v-list  two-line nav dense min-width="500px"  max-height="700px" class="grey lighten-2 full-screen overflow-auto pb-4">
                  <v-list-item class=" grey lighten-2 pt-n8" >
                     <v-row>
                      <v-flex xl6 lg6 md6 sm6  class='px-4'>
                        <v-row>
                         <v-icon color="black" class="mx-2 col-1">fas fa-envelope</v-icon> 
                         <span class="col-9 font-weight-black text-left text-lg-h6 text-md-h5 text-sm-h6 text-xs-h2">Messages</span> 
                       </v-row>
                       </v-flex>
                       <v-spacer></v-spacer>
                       <v-flex v-if="items.length>0" xl6 lg6 md6 sm6  
                          class="justify-xs-end justify-lg-end justify-xl-end justify-md-end ">
                             <a v-if="unseen > 0 " class="ml-4 text-right text-caption text-sm-body-2 text-md-caption text-lg-subtitle-1  font-weight-regular" @click="setAllSeen">Marquer tous comme lus</a>
                             <a v-else class="ml-4 text-right text-caption text-sm-body-2 text-md-caption text-lg-subtitle-1 font-weight-regular" @click="setAllunSeen">Marquer tous comme non lus</a>
                        </v-flex>
                    </v-row>
                  </v-list-item>
                   
                  <v-list-item-group v-if="items.length>0">
                    <template v-for="(item, index) in items">
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
                        <span class="pa-4 text-left text-xl-subtitle-1 text-lg-subtitle-2 text-lg-subtitle-1 text-caption"
                         >
                         message
                        </span>
                         <span class="px-4 text-xl-h6 text-left text-xl-body-2 text-lg-body-2 text-md-caption text-sm-caption text-caption">
                           {{setDateFromNow(item.created_at)}}
                        </span>
                   </v-list-item-content>   
                </v-list-item>
               <v-divider class="black my-1" :key="item.created_at" v-if="index < items.length -1"></v-divider>
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
        //  items:[]
         server:server.URL,

     }
 },
props:['items','unseen'],
 methods:{
    setAllSeen(){
        this.items.forEach(element => {
           if( element.vu === null){
             this.seeNotif(element) 
            }
        });
         this.getmessage()
    },
    setAllunSeen(){
        this.items.forEach(element => {
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
    async getmessage(){
      this.$parent.$parent.$parent.$parent.getmessage()
     
    }
 },
 mounted(){
    // this.$store.dispatch('setNbrMsg',0)
    //   this.items = []
    //  this.getmessage()
 }
}
</script>

<style>

</style>