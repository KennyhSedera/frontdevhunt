<template>
    <div>
        <v-card>
            <v-toolbar>
                <v-card-title >                        
                    <v-avatar size="40" class=" mr-4">
                           <userProfil/>
                        </v-avatar>
                        Discussion Name
                </v-card-title>
            </v-toolbar>
            <v-card-text>
                <v-card color="transparent" class="elevation-0"> 
                    <v-card class="overflow-y-auto overflow-x-hidden pt-4" height="400" >
                    <v-row justify="center">
                      <v-chip  v-if="Message" loading class="px-4 text-center my-2">Voir plus de message</v-chip>   
                    </v-row>
                     <v-row no-gutters class="px-4" height="30" >
                        <div class="col-12" v-for="msg,i in Message" :key="i">
                            <div class="float-left pt-n2" v-if="msg"> 
                                <userProfil v-if="i%2!==0"/>
                            </div>
                        <v-chip v-if="msg" :color="i%2!==0?'blue':'indigo'" :class="`white--text ml-2 mt-4 col-4 d-flex float-${i%2!==0 ?'left':'right'}`" >
                                {{msg.contenue}}
                        </v-chip>
                     </div>
                        <!-- <div class="d-flex justify-end float-right col-12">
                         <v-chip color="blue" class="white--text my-3">
                            Some awesome message
                         </v-chip>
                      </div> -->
                    </v-row>
                    </v-card>
                    <v-card class="px-xl-16 px-4 elevation-2">
                      <FormReponse ref="textField" icon="fas fa-paper-plane" text="Envoyer" @onClick="sendMessage" />
                    </v-card>
                </v-card>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import userProfil from '../components/profilUser'
import FormReponse from '../components/FormulaireCommentaire'
import {mapGetters} from 'vuex'

    export default{
        components:{
            userProfil,
            FormReponse
        },
        data(){
            return{
                messages:[]
            }
        },
        methods:{
           async sendMessage(){
                var message = this.$refs.textField.getContenue()
                var msg = {
                    user:{id_user:1,nom:"Avotra",prenom:"Randriah",photo_Profil:"admin.jpg"},
                    contenue:message
                }                
                await this.$socket.emit('message',msg)
                this.$refs.textField.setContenue("")
            }
        },
        computed:{
            ...mapGetters(['Message','User'])
        },
        mounted(){
            this.$store.dispatch('setMessage',1)
        }
    }
</script>