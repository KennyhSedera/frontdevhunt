   <template>
    <div class="col-12 " >
      <v-row no-gutters>
          <v-textarea autofocus v-model="contenue"
          outlined 
          :placeholder="placeholder"
          clearable
          class="col-11 white"
           height="100"></v-textarea>
          <div align="right" class="col-1">
              <v-btn class="mx-2 text-capitalize" color='primary' @click="$emit('onClick')" ><v-icon class="mr-2" small>{{icon}}</v-icon>{{text}} </v-btn>
         </div>
      </v-row>
    </div>
</template>

<script>
export default {
  props:["icon","text","placeholder"],
    data(){
        return{
          contenue:'',
        }
    }

}
</script>

<style>

</style>