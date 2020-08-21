<template>
<v-container fluid>
  <Datatable
    :items="items"
    :headers="headers"
    titulo="Clientes"
    :initialize="initialize"
    textoBuscar="Buscar contenedor por nombre...."
    sorteable="nombre"
    textoCargando="Cargando lista de clientes..."
    :createItem="createItem"
    :viewItem="viewItem"
    :editItem="editItem"
    :desactivateItem="desactivateItem"
    textoCrear="Registrar cliente"
    :filters="filters"
    :showselect="true"
    :singleSelect="true"
  />
  <Detalles 
    :dialog="dialog" 
    :item="editedItem" 
    nombreCard="catalogos/clientes/_detalles"
    title="Detalles"
    :close="close"
  />
  <Modal
    :dialog="confirm"
    titulo="Eliminar cliente"
    :accion="eliminar"
    texto="¿Está seguro que desea ralizar la acción?"
    validacion="ELIMINAR"
    :item="editedItem"
    :index="editedIndex"
    :close="close"
  />
</v-container>  
</template>

<script>
import axios from "axios";
import {mapActions, mapState, mapMutations} from 'vuex'
import {mapToAPI,mapAPIToContenedor,mapContenedorToGrid} from '@/mappers/MercanciasMapper'
import { Component, Vue } from 'vue-property-decorator';
import {filtrosMercancias} from '@/helpers/filters'
import SimpleCRUD from '@/components/datatables/SimpleCRUD'
import Detalles from '@/components/modals/Detalles'
import Modal from '@/components/modals/Modal'
import {CRUD,loadFromAPI} from '@/services/index'
import Datatable from '@/components/datatables/Datatable'
export default {
  name: "ClientesIndex",
  components:{
    Datatable,
    Detalles,
    Modal
  },
  mixins:[CRUD],
  data: () => ({
    urlBase: '/nomencladores/v1/clientes',
    urlEnpoint: '',
    componenteCreate: 'createcliente',
    componenteUpdate: 'updatecliente', 
    formulario:'catalogos/clientes/_form',
    objetoAPI: {
      mensajeSuccess: "Operación realizada con éxito!!!",
      mensajeError: "Ha ocurrido un error en la operación!!!",
      mensajeEmpty: "No hay registros!!!"
    },      
    items:[],
    dialog: false,
    confirm: false,
    editedIndex: -1,
    editedItem: {
      id: '',
      nombre: '',
      direccion: '',
      correo: '',
      telefono: '',
    },
    defaultItem: {
      id: '',
      name: '',
      nombre: '',
      direccion: '',
      correo: '',
      telefono: '',
    },      
    headers:[
      { text: 'Nombre', value: 'nombre', sortable: false },
      { text: 'Dirección', value: 'direccion'},
      { text: 'Código REEUP', value: 'reeup'},
      { text: 'NIT', value: 'nit'},
      { text: 'Acciones', value: 'action', sortable: false },
    ],
    filters:[],
  }),
  methods: {
    ...mapMutations(['mostrarNotificacion']),
    async initialize () {
      try {       
        const res = await this.axios.get(`${this.urlBase}${this.urlEnpoint}`)
        if (res.status==204) {
          this.mostrarNotificacion({
            color:"warning",
            texto: this.objetoAPI.mensajeEmpty
          })           
        } else {
          this.items = res.data._embedded.clientes      
        }
      } catch (error) {
        this.mostrarNotificacion({
          color:"error",
          texto:`${this.objetoAPI.mensajeError}. ${error}`
        })
      } finally {
        this.cargando = false
      }
    }, 
  },
  created () {
    this.initialize()
  },  
}
</script>
<style>

</style>