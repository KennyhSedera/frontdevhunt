<template>
    <v-hover class="rounded">
       <template v-slot='{ hover }'>
         <v-card  :width="width" :class="`rounded-t ${cssClass} elevation-${hover?24:4}`" >
            <slot name="card" >
            
            </slot> 
         </v-card>
       </template>
    </v-hover>
</template>
<script>
export default {
    name:"cardHover",
    props: [
        "width",
        "cssClass",
        "height"
    ]
}
</script>
