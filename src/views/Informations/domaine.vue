<template>
    <div class="pt-4 ma-4" >   
      <div>
      <v-card class="my-2 pa-5">
       <v-card-title >
          <div class="text-xl-h1 text-lg-h2 text-md-h3  text-h4 text-sm-h3  blue--text font-weight-black"> <span class="grey--text">D</span>omaines</div>  
            <v-spacer></v-spacer>
           <v-col class=" col-xl-4 col-lg-4 col-md-4 col-sm-5">
            <v-text-field
            class='mb-2 rounded-pill col-12 '
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
                  <v-text-field  align='left' readonly=true label="Id domaine"    v-model='id_domaine' prepend-icon='fas fa-folder-open'/>
                  <v-text-field align='right' label="Nom domaine" v-model='nomDomaine' prepend-icon='fas fa-home' class="mb-2"/>
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
                    :items="Domaine"
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
     <deleteDialog  ref="deleteModal" @confirm='deleteDomaine' title='Supprimer un domaine' :message='deleteMessage'  ></deleteDialog>
      <alertMessage ref='alert' :types='alertType' :message='message'></alertMessage>
  </div>
  </div>
</template>
<script >
   import deleteDialog from '../../components/Delete'
   import alertMessage from '../../components/alertMessage'
   import domaineService  from '../../services/domaineService'

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
         id_domaine : '',
         nomDomaine :'',
         search:'',
         totalDomaine :0,
         loading: false,
        options: {},
        titre:'',
        Domaine :[],
        header :[
            {text:'Id domaine',value:'id_domaine'},
            {text:'Nom domaine',value:'nom_domaine'},
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
      if (this.Domaine.length<= 0){
            this.id_domaine= '1'
        }else {
            var max  = this.Domaine[this.Domaine.length - 1].id_domaine
        }
        const num = parseInt(max)+1
        this.id_domaine= num
    },
    alert(){
     this.$refs.alert.openAlert()
   },
     async register () {
          await domaineService.register({
            nom_domaine: this.nomDomaine.toUpperCase()
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
         this.title = `Modification du pays n° ${data.id_domaine}`       
         this.id_domaine= data.id_domaine,
         this.nomDomaine = data.nom_domaine
     },
     async update ( ){
       await domaineService.update({
           data: {
            nom_domaine: this.nomDomaine.toUpperCase(),
           },
            where: {
               id_domaine: this.id_domaine
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
         this.id_domaine = ''
         this.readonly = false
         this.nomDomaine = ''   
        this.Textbtn='Enregistrer'
      },
    async getDataFromApi () {
           const response = await domaineService.getAll()
          //console.log(response.data.domaine)
          this.Domaine = response.data.Domaine
          this.getMax()
          
        },
       async deleteDomaine(){
      await domaineService.delete(this.delSelected)
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
       this.deleteMessage = `Voulez vous supprimer le domaine ${data.nom_domaine} qui a un id ${data.id_domaine}?`
       this.delSelected = data.id_domaine
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
