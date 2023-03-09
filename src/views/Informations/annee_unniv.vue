<template>
    <div class="pt-4 ma-4" >   
      <div>
      <v-card class="my-2 pa-5">
       <v-card-title >
          <div class="text-xl-h1 text-lg-h2 text-md-h3  text-h4 text-sm-h3  blue--text font-weight-black"> <span class="grey--text">A</span>nnée 
             <span class="grey--text">U</span>niversitaire</div>  
            <v-spacer></v-spacer>
           <v-col class=" col-xl-4 col-lg-4 col-md-4 col-sm-5">
            <v-text-field
                class='rounded-pill col-12 '
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
                  <v-text-field  align='left' readonly=true label="Id Annee"    v-model='id_annee' prepend-icon='fas fa-folder-open'/> 
                  <v-row>
                    <v-icon class="mx-4">fa-calendar</v-icon>
                    <div style="max-width: 200px">
                        <v-otp-input
                            v-model="nomAnnee"
                            :length="length"
                        ></v-otp-input>
                        </div>
                    </v-row>
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
                    :items="Annee"
                    :loading='loading'
                    :search="search"
                    class="elevation-4 black--text mb-4 fill-height"
                >
                   <template v-slot:item[`annee1`]="{ item }">
                    <v-chip
                      color="red"
                    >
                      {{ item.annee1 }}
                    </v-chip>
                  </template>
                    <template v-slot:item[`action`]="{ item }">
                    <v-icon color='blue' class='ma-2' small @click='displayData(item)' >fas fa-edit</v-icon>
                    <v-icon color='red' small  class='ma-2' @click='selectTodelete(item)'>fas fa-trash</v-icon>
                   </template>
                </v-data-table>
            </div>
        </v-col>
      </v-row>
     <deleteDialog  ref="deleteModal" @confirm='deleteAnnee' title='Supprimer un Annee' :message='deleteMessage'  ></deleteDialog>
      <alertMessage ref='alert' :types='alertType' :message='message'></alertMessage>
  </div>
  </div>
</template>
<script >
   import deleteDialog from '../../components/Delete'
   import alertMessage from '../../components/alertMessage'
   import anneeunivService  from '../../services/anneeunivService'

export default{ name : "pageAnnee",
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
            id_annee : '',
            nomAnnee :'',
            search:'',
            totalAnnee :0,
            loading: false,
            options: {},
            titre:'',
            length: 4,
            Annee :[],
            header :[
                {text:'Id Annee',value:'id_annee'},
                {text:'Annee',value:'annee1'},
                {text:'Annee',value:'annee2'},
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
    },
 mounted () {
     this.getDataFromApi()
      },
  methods: {  
    getMax(){
      if (this.Annee.length <= 0){
            this.id_annee= '1'
        }else {
            var max  = this.Annee[this.Annee.length - 1].id_annee
        }
        const num = parseInt(max)+1
        this.id_annee= num
    },
    alert(){
     this.$refs.alert.openAlert()
   },
     async register () {
        const an = this.nomAnnee
        const annee2 = parseInt(an)+1
        console.log(annee2)
          await anneeunivService.register({
            id_annee: this.id_annee,
            annee1: this.nomAnnee.toUpperCase(),
            annee2: annee2
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
         this.title = `Modification du pays n° ${data.id_annee}`       
         this.id_annee= data.id_annee,
         this.nomAnnee = data.annee1
     },
     async update ( ){
       await anneeunivService.update({
           data: {
            annee1: this.nomAnnee.toUpperCase(),
           },
            where: {
               id_annee: this.id_annee
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
         this.id_annee = ''
         this.readonly = false
         this.nomAnnee = ''   
        this.Textbtn='Enregistrer'
      },
    async getDataFromApi () {
           const response = await anneeunivService.getAll()
          //console.log(response.data.Annee)
          this.Annee = response.data.Anneeuniv
          this.getMax()
          
        },
       async deleteAnnee(){
      await anneeunivService.delete(this.delSelected)
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
       this.deleteMessage = `Voulez vous supprimer le Annee ${data.annee1} qui a un id ${data.id_annee}?`
       this.delSelected = data.id_annee
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
