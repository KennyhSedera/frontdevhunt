<template>
  <v-app  class='grey lighten-4 overflow-hidden'>
   <navBar app ref="navBar" v-if="$route.name!=='Login'&& $route.name!=='ChangePW'"/>
    <v-main class="overflow-hidden">
       <router-view ></router-view>
     <!-- <Footer app />   -->
    </v-main>
    
   <Loader ref="loader" text="Déconnexion" :overlay="false" />
    </v-app>
</template>

<script>
 import navBar from '@/components/navBar'
  // import Footer from '@/components/footer'
 import Loader from './components/pageLoader'

import moment from 'moment'
// import historiqueService from './services/historiqueService'
import SocketioService from './services/socketio.service.js'

export default {
  name: 'App',
    components:{
     Loader,
    //  Footer,
     navBar,
     },
     sockets:{
      connect:function(){console.log('socket connecté')},
      message:function(msg){
        // console.log(msg)
        
       this.$store.dispatch('addMessage',msg)
       
      }
     },
     beforeUnmount() {
      SocketioService.disconnect()
     },
  methods :{
    setMessage(value){
      
       this.$store.dispatch('addMessage',value)
    },
   getLastEvent(last){
      if( this.$route.name!=='Login'){
      var now = moment()
      if(now.diff(last,'h')>1){
         this.$refs.loader.loading()
          // historiqueService.updateHistoriqueCnx({ 
          //       data:{
          //            deconnected_at:moment().format('YYYY-MM-DD HH:mm:ss'),
          //            deconnected_by:1 
          //            },
          //       where:{
          //             id_user: this.$store.state.user.id_user,
          //              connected_at: this.$store.state.user.connected_at
          //           }
          //       })
           this.$store.dispatch('setToken', null)
           this.$router.push({name: 'Login',params:{email:this.$store.getters.getEmail}})
         }
       }
    },
    getNetworkCnx(){
      if(!navigator.onLine){
        alert('Verifier votre connexion')
      }
    }
  },
  watch : {
    $route(to){
      //   if( to.name==='Login' && this.$store.getters.isUserLoggedIn){
      //      alert('Vous êtes déjà connecté sur le plateforme !')
      //     window.history.back()
      //     }
      // if(from.name !== 'ChangePW'){
      //       this.$refs.navBar.getNotification()
      //       this.$refs.navBar.clickContent =false
      //    }
        document.title = to.meta.title || 'Some Default title'
        
    }
  },
  mounted(){
    
    window.onmousemove =  () => {
    var last = this.$store.getters.lastEvent
    this.$store.dispatch('setLastEvent',moment().format('YYYY-MM-DD HH:mm:ss'))
    this.getLastEvent(last)
    // this.getNetworkCnx()
   }
    document.title = this.$route.meta.title
    // if(!this.$store.state.isUserLoggedIn && this.$route.name !=='Login') {
    //        alert('Veuillez vous connecter d\'abord !')
           
    //         this.$router.push({name: 'Login'})
           
    //      }
    //  if(this.$store.state.isUserLoggedIn && this.$route.path==='/'){
    //        if(this.$store.state.user.role_permission=='Administrateur'){
    //             this.$router.push({name:'bilan'})
    //           }
    //           else{
    //             this.$router.push({name:'Home'})
    //           }
    //  }
   
  }
};
</script>

