<template>
<v-container fluid grid-list-sm>
    <!-- <Form :escenario="escenario" :editedIndex="editedIndex" :editedItem="editedItem" /> -->
    <component
      v-bind:is="componenteOpcional" 
      v-if="formulario" 
      :editedItem="editedItem" 
      :editedIndex="editedIndex"
      :escenario="escenario"
    >
    </component>
</v-container>
</template>
<script>
import Cargando from '@/components/dashboard/Cargando.vue'
export default {
    name: 'Create',
    components: {
      Cargando
    },    
    props:[
      'editedItem',
      'editedIndex',
      'formulario'
    ],
    data:()=>({
      escenario: 'create',
      loading: true,    
    }),
    computed: {
        componenteOpcional() {
            return ()=>import (`@/components/${this.formulario}`)
        },
    },
    methods: {
      
    },
    created() {
      if (this.editedItem==null) {
          this.$router.push('Error404')
      }       
    },
}
</script>

<style>

</style>