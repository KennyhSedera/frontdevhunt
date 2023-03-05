<template>
   <div class="fill-height">
    <v-row  class="fill-height ">
       <v-col cols="8" class=" fill-height">
        <v-card height="48%" class="ma-2">
                
        </v-card>
        <v-card height="19%" class="ma-2 pa-2 row d-flex justify-space-between">
            <div class="col-3 blue lighten-4 rounded" v-for="i in 3" :key="i" height="100%"></div>
        </v-card>
        <v-card height="29%" class="ma-2">

        </v-card>
       </v-col>
       <v-col cols="4" class=" fill-height">
        <v-card flat height="70%" class="ma-2 pb-4">
          <v-date-picker 
             width="100%"
             v-model="date1"
            locale="fr"
            :events="arrayEvents"
            event-color="green lighten-1"
            height="100%"
            @click:date="afficheEvent"></v-date-picker>   
           
        </v-card>
        <v-card height="28%" class="ma-2">

        </v-card>
    </v-col> 
    </v-row>
    </div>
</template>
<script>
export default {
  name:"dashBoardPage",
    data: () => ({
      arrayEvents: null,
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),

    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },
    methods:{
        afficheEvent(date){
           var event = this.arrayEvents.filter(e=> e === date)
           if(event.length>0){ alert(`You have just double clicked the following date: ${date}`)}
      }},
    }

</script>