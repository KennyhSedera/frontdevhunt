<template>
<div class="">
  <v-carousel 
   cycle
   v-resize="onResize"
   :height="height"
   hide-delimiters
   show-arrows-on-hover>
    <v-carousel-item
      v-for="(img, i) in images"
      :key="i"
       reverse-transition="fade-transition"
      transition="fade-transition"
      :src="img.src"
      class="pa-0"
    >
    <div :class="`fill-height `">
      <v-img  class="fill-height"  gradient='to top, rgba(100,115,201,.3), rgba(25,32,72,.7)'>
        
        <v-sheet :class="`col-5 float-${img.float} fill-height pa-0`"  color='transparent'  >
          <v-img  :src="img.src" 
            :class="`fill-height ${img.float ==='left' ?'right': 'left' }`">
        </v-img>
    </v-sheet>
    <v-card color="transparent" class="col-7  fill-height fill-width" v-if="i===0">
            <v-row class=" fill-height ">
            <div class="white  fill-height cover3 col-4"></div>
             <div class="fill-height cover col-4"></div>
             <div class="white  fill-height cover4 col-4">
            
             </div>
          </v-row>
        </v-card>     
       <div v-else :class='`text-h4 font-weight-black white--text  text-center my-8`'>Description</div>
     </v-img>
    </div>
  </v-carousel-item>
  </v-carousel>
  <v-card color="transparent"  class="elevation-2 title elevation-0 fill-width absolute float-center text-center  rounded-large title mt-lg-n13 mt-n8 mb-16 px-5  text-lg-h1 text-h2 font-weight-black">
     E-fanampy
    </v-card>
  <v-container class="fill-width  overflow-auto absolute  my-8" :height="1000">
     <v-row justify="space-between" no-gutters class="fill-height fill-width grey lighten-2 my-4 px-8  pb-8 rounded ">
      <cardHover  v-for="domaine,i in Domaines" :key="i" width="30%">
          <v-card slot="card" @click="$router.push('/publication')"
          :class="`rounded pa-4 blue lighten-4   mt-n14 absolute`" :height="400">
            <div class="font-weight-bold my-2 py-2 text-h5 ">{{domaine.name}}</div> 
            <v-img src="web image/background_image (3).jpg" height="60%" class=""></v-img>
            <div class="py-4 ">
              {{domaine.description}}
            </div>
          </v-card>
        </cardHover>
    </v-row>
    <v-row no-gutters class="grey lighten-4 py-4 px-8 my-4 fill-width" >
      <div class="fill-width col-12">
        <div class="font-weight-black grey--text ">Top publications</div><br>
       <v-row no-gutters class="fill-width" justify="space-between">
        <card-hover cssClass="col-2" v-for="j in 4" :key="j">
          <v-card slot="card" :height="150" class="blue lighten-4 px-4">
         Link
        </v-card>
        </card-hover>
        
       </v-row>
        
      </div>
    </v-row>
    <v-row no-gutters  :height="400" class="grey lighten-4 py-4 px-8 my-4 fill-height" justify="space-between">
        <v-row no-gutters class="col-9">
          <div class="col-12 fill-height">
          <div class="grey--text text-title ma-2 font-weight-black">Partenariat de l'Eni</div>
            <v-row no-gutters justify="space-between" class="fill-height">
            <cardHover v-for="j in 3" :key="j" cssClass="blue col-3 fill-height lighten-4 px-4">
              <div slot="card"    >
                    <div class="py-2">Partenariat</div>
                    <div>
                      <v-image src="admin.jpg"></v-image>
                    </div>
              </div>
            </cardHover>
            </v-row>
          </div>
       </v-row>
      <div class="col-3  row  pa-4 white rounded">
          <div v-for="a in 4" :key="a" class="col-3">
            <v-avatar size="60" class="mx-4">
              <v-img src="admin.jpg"/>
            </v-avatar>
            <div>Admin name</div>
        </div>
      </div>
    </v-row>
  </v-container>
 </div>   
</template>
<script >
import cardHover from "../components/cardHover"
export default {
   name:"homePage",
  components:{
    cardHover,
  },
    data () {
        return {
            height:0,
            images:[
              {src: 'Caroussel/caroussel.jpg',float:'right',color:'cyan lighten-2'},
              {src: 'Caroussel/caroussel (2).jpg',float:'left',color:'cyan'},
              {src: 'Caroussel/caroussel (4).jpg',float:'left',color:'indigo'},
              {src: 'Caroussel/caroussel (5).jpg',float:'left',color:'blue'}

          ],
          Domaines:[{name:"Devloppement",description:"Lorem iposum"},
                    {name:"Réseaux",description:"Lorem iposum"},
                    {name:"Communications & langues ",description:"Lorem iposum"}]
        }
    },
    methods:{
      navigateTo (route) {
        this.$router.push(route)
        },
      onResize(){
        this.height = window.innerHeight*45/100 
        }
    },
    mounted(){
     this.onResize()
    }
}
</script>
<style scoped>
.cover3{
 -webkit-clip-path: polygon(25% 0, 0 20%, 0 36%, 16% 43%, 28% 25%, 48% 23%, 48% 40%, 26% 46%, 30% 66%, 53% 56%, 58% 83%, 29% 87%, 14% 69%, 1% 79%, 11% 100%, 62% 100%, 95% 89%, 94% 57%, 73% 47%, 93% 30%, 91% 11%, 67% 0);
clip-path: polygon(25% 0, 0 20%, 0 36%, 16% 43%, 28% 25%, 48% 23%, 48% 40%, 26% 46%, 30% 66%, 53% 56%, 58% 83%, 29% 87%, 14% 69%, 1% 79%, 11% 100%, 62% 100%, 95% 89%, 94% 57%, 73% 47%, 93% 30%, 91% 11%, 67% 0);

}
.cover4{
  -webkit-clip-path: polygon(37% 0, 23% 11%, 0 28%, 0 68%, 42% 68%, 42% 46%, 11% 47%, 20% 38%, 34% 22%, 43% 11%, 43% 33%, 42% 51%, 41% 67%, 41% 100%, 57% 100%, 71% 100%, 71% 68%, 100% 68%, 100% 44%, 71% 46%, 72% 18%, 62% 0);
clip-path: polygon(37% 0, 23% 11%, 0 28%, 0 68%, 42% 68%, 42% 46%, 11% 47%, 20% 38%, 34% 22%, 43% 11%, 43% 33%, 42% 51%, 41% 67%, 41% 100%, 57% 100%, 71% 100%, 71% 68%, 100% 68%, 100% 44%, 71% 46%, 72% 18%, 62% 0%);

}
.cover{
  -webkit-clip-path: polygon(100% 30%, 68% 22%, 100% 79%, 0 81%, 26% 22%, 0% 29%, 21% 0%, 48% 20%, 26% 58%, 48% 100%, 68% 57%, 49% 21%, 76% 0%);
  clip-path:polygon(100% 30%, 68% 22%, 100% 79%, 0 81%, 26% 22%, 0% 29%, 21% 0%, 48% 20%, 26% 58%, 48% 100%, 68% 57%, 49% 21%, 76% 0%);
  background-image: linear-gradient(to top,#8ff0e8 50%, #fff 50%);
}
.titre{
  text-shadow: 2px;
  font-weight: 900;
}
.title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.right{
  clip-path:polygon(0% 0%,100% 0%,50% 100%,0% 100%);
}
.left{
  clip-path:polygon(0 0,100% 0,100% 100%,40% 100%);
}

.title {
  /* Fallback: Set a background color. */
  background-image: linear-gradient(to top,#0978b4 50%, #fff 50%);
  /* text-shadow:-12px -2px 2px #64B5F6; */
  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  
  /* Animate the text when loading the element. */
    /* This animates it on page load and when hovering out. */
    animation: rainbow-text-simple-animation-rev 0.75s ease forwards;

}

.title:hover{
    animation: rainbow-text-simple-animation 0.5s ease-in forwards;
}


/* Move the background and make it smaller. */
/* Animation shown when entering the page and after the hover animation. */
@keyframes rainbow-text-simple-animation-rev {
    0% {
        background-size: 650%;
    }
    40% {
        background-size: 650%;
    }
    100% {
        background-size: 100%;
    }
}

/* Move the background and make it larger. */
/* Animation shown when hovering over the text. */
@keyframes rainbow-text-simple-animation {
    0% {
        background-size: 100%;
    }
    80% {
        background-size: 650%;
    }
    100% {
        background-size: 650%;
    }
}


</style>
