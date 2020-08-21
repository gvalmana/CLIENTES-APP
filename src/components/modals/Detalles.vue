<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="100%"
      max-height="100%"
      :overlay="false"
      transition="dialog-transition"
      persistent
  >
    <v-card>
        <v-card-title primary-title>
            {{title}}
        </v-card-title>
        <component v-bind:is="componenteOpcional" v-if="nombreCard" :item="item" :editedIndex="editedIndex"></component>        
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="error" @click="close">Cerrar</v-btn>
        </v-card-actions>
        {{editedIndex}}
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'Detalles',
    data:()=>({
        
    }),
    props:[
        'title',
        'nombreCard',
        'dialog',
        'editedIndex',
        'item',
        'close'
    ],
    computed: {
        componenteOpcional() {
            return ()=>import (`@/components/${this.nombreCard}`)
        },
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>

<style>

</style>