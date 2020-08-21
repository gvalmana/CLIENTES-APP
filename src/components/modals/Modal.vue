<template>
  <!-- DIALOGO DE CONFIRMAR ACCION-->    
  <v-dialog 
    v-model="dialog" 
    max-width="490"
    transition="dialog-transition"
    persistent    
  >
    <v-card>
      <v-card-title class="headline" color="error">{{titulo}}</v-card-title>
      <v-card-text>
          {{texto}} Escriba <b>{{validacion}}</b> para confirmar.
        <v-text-field v-model="palabra"></v-text-field>        
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cerrar">Cancelar</v-btn>
        <v-btn text color="error" error @click="click(item)" :disabled="!textoConfirmar">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  
</template>

<script>
export default {
    name:'Modal',
    props:[
      'titulo',
      'texto',
      'accion',
      'validacion',
      'dialog',
      'item',
      'index',
      'close'
    ],
    data:()=>({
        palabra:"",
    }),
    computed:{
      textoConfirmar(){
        return this.palabra == this.validacion
      },
      cerrado(){
        return confirm = !confirm
      }     
    },
    methods: {
      click(item){
        this.accion(this.item, this.index)
        this.palabra = ""
        this.close()
      },
      cerrar(){            
        this.palabra = ""
        this.close()
      }           
    },
    mounted() {

    },
    created() {

    },
}
</script>

<style>

</style>