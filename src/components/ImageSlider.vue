<template>
  <v-sheet
    class="mx-auto elevation-0"
    elevation="8"
    width="1000"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      prev-icon="fas fa-minus"
      next-icon="fas fa-plus"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="img,n in items"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4 "
          height="300"
          width="400"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
            no-gutters
          >
            <v-scale-transition>
                <v-img class="fill-height" :src="img"></v-img> 
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
  export default {
    props:['items'],
    data: () => ({
      model: null,
    }),
  }
</script>
