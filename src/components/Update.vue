<template>
    <!-- <Form :escenario="escenario" :editedItem="editedItem" :editedIndex="editedIndex"/> -->
    <component 
      v-bind:is="componenteOpcional" 
      v-if="formulario" 
      :editedItem="editedItem" 
      :editedIndex="editedIndex"
      :escenario="escenario"
    >    
  </component>
</template>

<script>
export default {
    name: 'Update',
    props:['editedItem','editedIndex','formulario'],
    data:()=>({
      escenario: 'update', 
    }),
    created() {
      //this.initialize()
      if (this.editedItem==null) {
          this.$router.push('Error404')
      }      
    },
    computed: {
        componenteOpcional() {
            return ()=>import (`@/components/${this.formulario}`)
        },
    }, 
}
</script>

<style>

</style>