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
                      <v-chip loading class="px-4 text-center my-2 ">Voir plus de message</v-chip>   
                    </v-row>
                     <v-row no-gutters class="px-4" height="30" v-for="i in 10" :key="i">
                        <div class="col-12">
                         <userProfil/>
                         <v-chip color="blue" class="white--text ml-2 my-3">
                            Some awesome message
                        </v-chip>
                        </div>
                        <div class="d-flex justify-end float-right col-12">
                         <v-chip color="blue" class="white--text my-3">
                            Some awesome message
                         </v-chip>
                      </div>
                    </v-row>
                    </v-card>
                    <v-card class="px-16 elevation-2">
                      <FormReponse icon="fas fa-paper-plane" text="Envoyer" @onClick="sendMessage" />
                    </v-card>
                </v-card>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import userProfil from '../components/profilUser'
import FormReponse from '../components/FormulaireCommentaire'
    export default{
        components:{
            userProfil,
            FormReponse
        },
        methods:{
            sendMessage(){
                alert("Message send")
            }
        }
    }
</script>