<template>
    <div class="fill-height pb-8">
     <div class="text-h3 mx-4 pa-4 font-weight-black" ref="top">Historiques de connexion</div>
      <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="blue--text elevation-2"
        multiple
      >
        <template v-for="(item, index) in historiqueCnx">
            
            <v-list-item :key="item.connected_at">
                <template v-slot:default="{ active }">
                <v-list-item-content>
                    <v-list-item-title v-text="item.browser_type"></v-list-item-title>

                    <v-list-item-subtitle
                    class="text--primary"
                    >Adresse Ip : {{item.ip_adress}}</v-list-item-subtitle>

                    <v-list-item-subtitle >Localisation : {{getPosition(item.localisation)}} </v-list-item-subtitle>
                    <v-list-item-subtitle >Système : {{item.system_type}} </v-list-item-subtitle>
                
                </v-list-item-content>

                <v-list-item-action>
                    <v-list-item-action-text ><span class="text-h4 green--text font-weight-black mr-1" v-if="item.deconnected_at===null">.</span>{{getStatus(item)}}</v-list-item-action-text>
                    <input type="checkbox" checked v-if="active"/>
                    <!-- <v-icon
                   v-if="active"
                    color="yellow darken-3"
                    >
                    fas fa-star
                    </v-icon> -->
                    <a v-if="active && item.deconnected_at===null && item.connected_at !== $store.state.user.connected_at" 
                        class="text-caption ma-1 pt-1" @click="logout(item)"> Déconnexion</a>
                </v-list-item-action>
                </template>
            </v-list-item>
            <v-divider
                v-if="index < historiqueCnx.length - 1"
                :key="index"
            ></v-divider>
          
        </template>
      </v-list-item-group>
    </v-list>
    <v-row>
        <div class="ma-4 px-4">
            <a @click="logOutAll">Déconnecter tous les  autres appareil
                <v-icon color="blue" x-small class="ml-1">fas fa-tablet</v-icon>
            </a>
            
        </div>
        <v-spacer></v-spacer>
        <div class="ma-4 px-4">
            <a @click="pageCnx+=1" v-if="pageCount >=pageCnx ">Afficher plus d'historique
                <v-icon color="blue" x-small class="ml-1">fas fa-laptop</v-icon>
            </a>
            <a @click="pageCnx=1" v-else>Reduire l'historique
                <v-icon color="blue" x-small class="ml-1">fas fa-laptop</v-icon>
            </a>
        </div>
   </v-row>
   
   <Loader ref="loader"  text="Déconnexion de tous les autres appareils" :timeOut="4000"/>
  </div>
</template>
<script>
import historiqueService from '../../services/historiqueService'
import Loader from '../../components/pageLoader'
import moment from 'moment'
// import IP from 'ip'
// import axios from 'axios'

export default {
    name:"HistoriqueConnexion",
    data() {
     return {
        checked:[],
         pageCnx:1,
         historiques:[],
         pageCount:0,
         listCnx:[],
          selected:[],
        
    }
    },
 components:{
     Loader
 },
 methods: {
    //  async getUserIP(){
    // //   const API_KEY = '''https://geoplugin.net/json.gp'
    //    const response = await axios.get('https://ipinfo.io/json')
    //    console.log(response.data)
    //  },
    getPosition(position){
      if(position){
            const lieu = position.split(' ')
            return lieu[0]
        }
    },
      logout(data){
         this.$refs.loader.loading()
         historiqueService.updateHistoriqueCnx({ 
                data:{
                     deconnected_at:moment().format('YYYY-MM-DD HH:mm:ss')
                     },
                where:{
                      id_user: this.$store.state.user.id_user,
                      connected_at: data.connected_at
                    }
                })
                this.getHistorique()
     },
     getStatus(item){
         if(item.deconnected_at===null){
             return 'En ligne'
         }else{
            return  this.setDate(item.deconnected_at)
         }
     },
    async getHistorique(){
        var response = await historiqueService.getHistoriqueCnx({id_user:this.$store.state.user.id_user})
         this.listCnx = response.data.historique
         this.pageCount = Math.round(this.listCnx.length/10)
         this.loading = true
      },
      setDate(date){
         if(moment().diff(date,'day','day',true) > 1){
             return moment(date).locale('fr').format('llll')
         }else
             return moment(date).locale('fr').fromNow()
    },
    logOutAll(){
        this.$refs.loader.loading()
        for(var cnx in this.listCnx){
            if(moment(this.listCnx[cnx].connected_at).format('YYYY-MM-DD HH:mm:ss') !== this.$store.state.user.connected_at && this.listCnx[cnx].deconnected_at=== null) {
                historiqueService.updateHistoriqueCnx({ 
                data:{
                     deconnected_at:moment().format('YYYY-MM-DD HH:mm:ss')
                     },
                where:{
                      id_user: this.$store.state.user.id_user,
                      connected_at: this.listCnx[cnx].connected_at
                    }
                })
            }
        }
        this.getHistorique()

    }
 },
 mounted(){
     this.getHistorique()
 },
 
 computed:{
     historiqueCnx(){
          var items = this.listCnx.slice(0 , this.pageCnx * 10)
         return items
     }
    
 }
}
</script>
