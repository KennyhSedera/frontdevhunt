<template>
<div>
    <v-row justify="space-between" class="my-2">
        <v-hover>
            <template  v-slot='{ hover }'>
                 <v-icon :color='hover? "blue":"grey"'  @click="$emit('like')">fas fa-thumbs-up</v-icon>
            </template>
        </v-hover>
        <v-hover>
            <template v-slot='{ hover }'>
                <v-icon :color='hover? "blue":"grey"'  @click="$emit('dislike')">fas fa-thumbs-down</v-icon>
             </template>
        </v-hover>
        <v-hover>
            <template v-slot='{ hover }'>
                <v-icon :color='hover? "red":"grey"'   @click="$emit('love')">fas fa-heart</v-icon>
             </template>
        </v-hover>
        <v-hover>
            <template v-slot='{ hover }'>
                <v-icon :color='hover? "green":"grey"'  @click="$emit('comment')">fas fa-comment</v-icon>
             </template>
        </v-hover>
        
    </v-row>
</div>
</template>
<script>

export default {
    name:"reactionComponent",
    data() {
        return{}
    },
    component:{

    }
}
</script>