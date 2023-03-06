<template>
    <div class="pt-6  ma-4" >   
      <div class="text-xl-h1 text-lg-h2 text-md-h3  text-h4 text-sm-h3  blue--text font-weight-black"> <span class="grey--text">N</span>iveaux</div>  
      <div>
      <v-card class="my-4 pa-5">
       <v-card-title >
            <v-spacer></v-spacer>

            <v-col>
           <v-text-field
            class='mb-8 rounded-pill col-9 col-xl-4 col-lg-4 col-md-4 col-sm-5 '
                v-model="search"
                append-icon="fas fa-search"
                label="Search"
                single-line
                outlined
                dense
                hide-details
            ></v-text-field>
        </v-col>
       </v-card-title>        
    </v-card>
       <v-row no-gutters class="elevation-4 px-2 pt-8 mt-8 rounded">
      <v-col col='6'>
        <v-form v-model="valid">
          <v-card   transition="scroll-y-reverse-transition"  class="mb-8 mr-sm-4 elevation rounded">
                <v-toolbar dense text >
                  <v-toolbar-title text>
                    Formulaire
                  </v-toolbar-title>
                </v-toolbar>
              <div class="px-8 elevation py-2  mr-4">
                  <v-text-field  align='left' :readonly='readonly' label="Id niveau"   v-model='idNiveau' prepend-icon='fas fa-folder-open'/>
                  <v-text-field align='right' label="Nom niveau" v-model='nomNiveau' prepend-icon='fas fa-home' class="mb-2"/>
                  <v-btn color='cyan' outlined class="  rounded-pill white--text mr-4 my-4 col-6 " center @click="AddorUpdate" >
                    <span class="text-capitalize" align='center'>{{Textbtn}}</span>
                  </v-btn>
                  <v-btn outlined  color="red" class="   rounded-pill white--text col-5"  @click="clearForm" >
                    <span class="text-capitalize"> Annuler</span>
                  </v-btn>
              </div>
          </v-card>
        </v-form>
         </v-col> 
        <v-col col='6'>
           <div  class=" mb-8  pb-4 fill-height" >
                <v-data-table 
                    :headers='header'
                    :items="Niveau"
                    :loading='loading'
                    :search="search"
                    class="elevation-4 black--text mb-4 fill-height"
                >
                    <template v-slot:item[`action`]="{ item }">
                    <v-icon color='blue' class='ma-2' small @click='displayData(item)' >fas fa-edit</v-icon>
                    <v-icon color='red' small  class='ma-2' @click='selectTodelete(item)'>fas fa-trash</v-icon>
                   </template>
                </v-data-table>
            </div>
        </v-col>
      </v-row>
     <!-- <deleteDialog  ref="deleteModal" @confirm='deleteNiveau' title='Supprimer le niveau' :message='deleteMessage'  ></deleteDialog>
      <alertMessage ref='alert' :types='alertType' :message='message'></alertMessage> -->
  </div>
  </div>
</template>
<script >
//    import deleteDialog from '../components/Delete'
//    import alertMessage from '../components/alertMessage'
   import niveauService  from '../../services/niveauService'

export default{ name : "pageDomaine",
  components :{
//    deleteDialog,
//    alertMessage,
   },
    data () {
        return{
          valid : false,
          selected: [],
         delSelected:[],
         alertType :'success',
         deleteMessage : '' ,
        message:'',
          readonly : false,
         Textbtn : 'Enregistrer',
          show : '',
         idNiveau : '',
         nomNiveau :'',
         search:'',
         totalNiveau :0,
         loading: false,
        options: {},
        titre:'',
        Niveau :[],
        header :[
            {text:'Id niveau',value:'id_niveau'},
            {text:'Nom niveau',value:'nom_niveau'},
            {text: 'Actions',value: 'action',sortable:false,groupable:false}
           ],
                   
    }
 },
  watch: {
      options: {
        handler () {
        this.getDataFromApi()
       
        },
        deep: true,
      },
    }
 ,mounted () {
     this.getDataFromApi()
      },
  methods: {  
    alert(){
    //  this.$refs.alert.openAlert()
   },
     async register () {
          await niveauService.register({
            id_niveau: this.idNiveau,
            nom_niveau: this.nomNiveau.toUpperCase()
            }).then(response=>{
              this.loading = true 
              if(response.data.success){
                  this.alert()
                  this.alertType= 'success'
                  this.message =  response.data.success
                  this.getDataFromApi()
                  this.clearForm()
                }
                else{
                  this.alert()
                  this.alertType= 'error'
                  this.message =  response.data.error
                  
                }
            }).catch(error =>{
              this.alert()
              this.alertType= 'error'
              this.message =  error.response.data.error 
            })
          setTimeout(() => {   
          this.loading = false 
          this.load = false
          }, 3000)
       },
      displayData(data){
         this.Textbtn= 'Modifier'
         this.readonly = true
         this.title = `Modification du pays n° ${data.id_niveau}`       
         this.idNiveau= data.id_niveau,
         this.nomNiveau = data.nom_niveau
     },
     async update ( ){
       await niveauService.update({
           data: {
            nom_niveau: this.nomNiveau.toUpperCase(),
           },
            where: {
               id_niveau: this.idNiveau
            }
          }).then(response=>{
             if(response.data.success){
                  this.alert()
                  this.alertType= 'success'
                  this.message =  response.data.success
                  this.getDataFromApi()
                  this.clearForm()
                }
                else{
                  this.alert()
                  this.alertType= 'error'
                  this.message =  response.data.error
                  
                }
            }).catch(error =>{
              this.alert()
              this.alertType= 'error'
              this.message =  error.response.data.error
               
            })
            setTimeout(() => {   
          this.loading = false 
          this.load = false
         }, 5000)
     },
     AddorUpdate (){
       if(this.Textbtn=='Enregistrer'){
         this.register()
       }
       else{
         this.update()
       }
        
     },
     clearForm () {
         this.idNiveau = ''
         this.readonly = false
         this.nomNiveau = ''   
        this.Textbtn='Enregistrer'
      },
    async getDataFromApi () {
           const response = await niveauService.getAll()
          //console.log(response.data.niveau)
          this.Niveau = response.data.niveau
          
        },
       async deleteNiveau(){
      await niveauService.delete(this.delSelected)
            .then(response => {
             if(response.data.success){
                  this.alert()
                  this.alertType= 'success'
                  this.message =  response.data.success
                  }
                else{
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
            this.getDataFromApi()
          
    },
    selectTodelete(data){
    //    this.$refs.deleteModal.openDialog()
       this.deleteMessage = `Voulez vous supprimer le niveau ${data.nom_niveau} qui a un id ${data.id_niveau}?`
       this.delSelected = data.id_niveau
     },
     closeModal(){
    //    this.$refs.deleteModal.closeDialog()
       this.delSelected = []
       this.selected =  []
     }
  }
 , 
}
</script>
