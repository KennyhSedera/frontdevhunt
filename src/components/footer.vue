  <template>
  <v-footer
    dark
    padless
    v-if="$route.name==='Home'"
  >
    <v-row
      flat
      tile
      class=" white--text text-center  fill-width"
      center
    >
      <v-row justify="center" no-gutters class="pt-6">
        <div class="transparent lighten-1">
        <v-btn
          v-for="media,i in mediasocio"
          :key="i"
          class="mx-2 white--text"
          icon
          @click="openWindow(media.link)"
        >
         <v-icon size="24px">
            {{media.icon}}
          </v-icon>
        </v-btn>
     </div>
      </v-row>

      <v-card-text class="white--text pt-0">
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;{{ new Date().getFullYear() }} — <strong>Avoutra Randriah</strong>
      </v-card-text>
    </v-row>
  </v-footer>
</template>
<script lang="ts">

export default {
    name:"footerPage",
    data: () => ({
      mediasocio: [
        {icon:'fab fa-facebook-f',link:"//https://www.facebook.com/djauck.randriah"},
        {icon:'fab fa-linkedin',link:"//https://linkedin.com/in/djauck-randriaharimalala-481190264"},
        {icon:'fa-sharp fa-solid fa-envelope',link:""},
        {icon:'fab fa-github',link:"//https://github.com/AvoutraRandriah"},
      ],
    }),
    methods:{
     openWindow(link){
      window.open(link)
     }
    }
  }
</script>