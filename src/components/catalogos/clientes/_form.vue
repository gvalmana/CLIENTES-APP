<template>
<v-container fluid grid-list-sm>
<v-form ref="form" v-model="valid" lazy-validation>
<v-layout wrap>
<v-flex md12>
<v-card fill-height style="height:100%" class="elevation-1">
  <v-card-title primary-title>
    {{formTitle}}
  </v-card-title>
  <v-card-text>
    <v-layout>
      <v-flex>
        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
        <v-text-field v-model="editedItem.direccion" label="Dirección"></v-text-field>
        <v-text-field v-model="editedItem.correo" label="Correo electrónico"></v-text-field>
        <v-text-field v-model="editedItem.telefono" label="Teléfono"></v-text-field>
      </v-flex>
    </v-layout>  
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn text @click="cancelar" v-on:keyup.esc="close">Cancelar</v-btn>
    <v-btn text color="primary" :disabled="!valid" @click.prevent="save">Guardar</v-btn>    
  </v-card-actions>  
</v-card>
</v-flex>
</v-layout>
</v-form>
</v-container>
</template>
<script>
import axios from "axios"
import {rules} from '@/helpers/validators'
import {mapState} from 'vuex'
import {mapToAPI} from '@/mappers/MercanciasMapper'
import {SaveCatalogo} from '@/services/index'

export default {
    name:'Form',
    mixins:[SaveCatalogo],
    props:['escenario','editedIndex','editedItem'],
    data: () => ({
      valid: false,
      reglas: rules,
      urlBase: '/nomencladores/v1/clientes',
      res:null,
      componenteIndex: 'indexcliente'
    }),
    computed: {
      ...mapState(['notificacion','user','permisos','catalogo']),
      formTitle () {
        return this.escenario === 'create' ? 'Registrar cliente' : `Editar cliente ${this.editedItem.nombre}`
      },
    }, 
}
</script>

<style>

</style>