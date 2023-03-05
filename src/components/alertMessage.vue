<template>
     <v-snackbar
        v-model="show"
        transition='slide-x-reverse-transition'
        :color='`${types}`'
         top
         right
        max-width="500px"
         elevation = '24'
          :timeout="3000"
        >
            <v-alert :type="types" dissmissible >
              {{message}}
           
           </v-alert>    
     </v-snackbar>
</template>
<script >
export  default {
    name:"alertMessage",
    props: [
        "message",
        "types",
       ],
    data (){
         return {
             show: false
         }
    },
    methods:{
        openAlert(){
            this.show = true
        }
    }
    
}

</script>

