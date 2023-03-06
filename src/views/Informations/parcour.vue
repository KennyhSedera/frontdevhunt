<template>
    <div class="pt-4  ma-4" >   
      <div>
      <v-card class="my-2 pa-5">
       <v-card-title >
            <div class="text-xl-h1 text-lg-h2 text-md-h3  text-h4 text-sm-h3  blue--text font-weight-black"> <span class="grey--text">P</span>arcours</div>  
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
                <v-col class="col-4 col-xl-3 col-lg-3 col-md-3 col-sm-5">
                     <v-text-field
                        class='mb-3 rounded-pill col-12'
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
                  <v-text-field  align='left' readonly=true label="Id parcour"   v-model='id_parcours' prepend-icon='fas fa-folder-open'/>
                  <v-text-field align='right' label="Nom parcour" v-model='nomParcour' prepend-icon='fas fa-home' class="mb-2"/>
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
                    :items="Parcour"
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
     <deleteDialog  ref="deleteModal" @confirm='deleteParcour' title='Supprimer le parcour' :message='deleteMessage'  ></deleteDialog>
      <alertMessage ref='alert' :types='alertType' :message='message'></alertMessage>
  </div>
  </div>
</template>
<script >
   import deleteDialog from '../../components/Delete'
   import alertMessage from '../../components/alertMessage'
   import parcourService  from '../../services/parcourService'

export default{ name : "pageDomaine",
  components :{
   deleteDialog,
   alertMessage,
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
         id_parcours : '',
         nomParcour :'',
         search:'',
         totalParcour :0,
         loading: false,
        options: {},
        titre:'',
        Parcour :[],
        header :[
            {text:'Id parcour',value:'id_parcours'},
            {text:'Nom parcour',value:'libelle_parcours'},
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
     this.$refs.alert.openAlert()
   },
    getMax(){
      if (this.Parcour.length<= 0){
            this.id_parcours= '1'
        }else {
            var max  = this.Parcour[this.Parcour.length - 1].id_parcours
        }
        const num = parseInt(max)+1
        this.id_parcours= num
    },
     async register () {
          await parcourService.register({
            libelle_parcours: this.nomParcour.toUpperCase()
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
         this.title = `Modification du pays n° ${data.id_parcour}`       
         this.id_parcours= data.id_parcour,
         this.nomParcour = data.nom_Parcour
     },
     async update ( ){
       await parcourService.update({
           data: {
            nom_parcour: this.nomParcour.toUpperCase(),
           },
            where: {
               id_parcour: this.id_parcours
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
         this.id_parcours = ''
         this.readonly = false
         this.nomParcour = ''   
        this.Textbtn='Enregistrer'
      },
    async getDataFromApi () {
           const response = await parcourService.getAll()
          //console.log(response.data.parcour)
          this.Parcour = response.data.Parcours
          this.getMax()
          
        },
       async deleteParcour(){
      await parcourService.delete(this.delSelected)
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
       this.$refs.deleteModal.openDialog()
       this.deleteMessage = `Voulez vous supprimer le parcour ${data.nom_parcour} qui a un id ${data.id_parcour}?`
       this.delSelected = data.id_parcour
     },
     closeModal(){
       this.$refs.deleteModal.closeDialog()
       this.delSelected = []
       this.selected =  []
     }
  }
 , 
}
</script>
