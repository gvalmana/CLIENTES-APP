<template>
<v-container fluid>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by="sorteable"
    class="elevation-1"
    :search="search"
    :show-select="showselect"
    :loading = false
    :loading-text="textoCargando"    
    :dense="dense"
    v-model="selected"
    :footer-props="{
      showFirstLastPage: true,
      itemsPerPageText: 'Filas por página.'
    }"  
  >
    <template v-slot:top>
    <v-layout wrap>
      <v-spacer></v-spacer>
    </v-layout>      
      <v-toolbar flat color="dark">
        <v-toolbar-title>{{titulo}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" @click="createItem" v-on="on" v-if="permisos.crear"><v-icon>mdi-plus</v-icon>Registrar</v-btn>
          </template>
          <span>{{textoCrear}}</span>
        </v-tooltip>            
      </v-toolbar>
    </template>

    <component v-bind:is="componenteOpcional"></component>

    <template v-slot:item.action="{ item }">     
        <v-tooltip top>
          <template v-slot:activator="{ on }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            color="blue"
            v-on="on"
            v-if="permisos.editar"
          >
            mdi-pencil
          </v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" >Recargar</v-btn>      
    </template>
  </v-data-table>
</v-container>  
</template>

<script>
import axios from "axios";
import {mapActions, mapState, mapMutations} from 'vuex'
import {mapToAPI,mapAPIToContenedor,mapContenedorToGrid} from '@/mappers/MercanciasMapper'
import { Component, Vue } from 'vue-property-decorator';
import {filtrosMercancias} from '@/helpers/filters'
export default {
  name: 'SimpleCRUD',
  props: [
    'headers',
    'items',
    'titulo',
    'initialize',
    'textoBuscar',
    'sorteable',
    'textoCargando',
    'createItem',
    'textoCrear',
    'viewItem',
    'editItem',
    'desactivateItem',
    'showselect',
    'filters',
    'columnas'
  ],
  data: () => ({
    dialog: false,
    search: "",
    dense: false,
    borrar: false,
    cargando: true,
    selected:[],
    permisos: {
      eliminar: false,
      crear: false,
      editar: false,
    },    
  }),
  created(){
    this.permisos.eliminar = this.user.roles.includes('admin')
    this.permisos.crear = this.user.roles.includes('user')
    this.permisos.editar = this.user.roles.includes('user')
  },  
  computed: {
    ...mapState(['notificacion','user']),
    componenteOpcional() {
      return ()=>import (`@/components/${this.columnas}`)
    },   
  },    
  methods:{
    ...mapMutations(['mostrarNotificacion']),
      getColor (valor) {
        console.log(valor)
        if (valor > 16) return 'red'
        else if (valor > 11) return 'orange'
        else return 'green'
      },     
  }
}
</script>
<style>

</style>