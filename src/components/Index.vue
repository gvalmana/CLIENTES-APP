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
    :showselect="false"
    :singleSelect="false"
  />
  <Detalles 
    :dialog="dialog" 
    :item="editedItem" 
    nombreCard="_detalles"
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
import { Component, Vue } from 'vue-property-decorator';
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
  mixins:[CRUD, loadFromAPI],
  data: () => ({
    urlBase: '/nomencladores/v1/clientes',
    urlEnpoint: '',
    componenteCreate: 'Create',
    componenteUpdate: 'Update', 
    formulario:'_form',
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
      reeup: '',
      nit:'',
      banco:'',
      sucursal:'',
      cup:'',
      cuc:'',
      representante:'',
      resolucion_representante:'',
      fecha_resolucion:'',
      actividad:[]
    },
    defaultItem: {
      id: '',
      nombre: '',
      direccion: '',
      reeup: '',
      nit:'',
      banco:'',
      sucursal:'',
      cup:'',
      cuc:'',
      representante:'',
      resolucion_representante:'',
      fecha_resolucion:'',
      actividad:[]
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
  },  
}
</script>
<style>

</style>