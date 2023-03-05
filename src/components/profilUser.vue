<template>
    <v-avatar @click="$router.push({name:'userProfil',params:{idUser: item.id_user|| item.admin }})"  :size="'50' || size" class="grey pointer my-4 lighten-2">
            <v-img src="admin.jpg" ></v-img>
    </v-avatar> 
</template>

<script>
 import AuthentificationService  from '../services/AuthentificationServices'
 import server from  '../services/server.config'

export default {
    name:'userProfil',
    props:[
        'user',
        'load',
        'size'
    ],
    data(){
        return{
        server:server.URL,
         item : ''
        }
    },
    methods:{
   async getUser(){
       if(this.user){
      const response = await AuthentificationService.infos(this.user)
    //    console.log(response.data.infos);
      this.item = response.data.infos
           }
     }
     }
     ,
    mounted (){
        
         this.getUser()
    
        
     },
    
    

}
</script>

<style>

</style>