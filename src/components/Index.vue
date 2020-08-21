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
import { mapActions, mapState, mapMutations } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import Detalles from "@/components/modals/Detalles";
import Modal from "@/components/modals/Modal";
import Datatable from "@/components/datatables/Datatable";
export default {
  name: "ClientesIndex",
  components: {
    Datatable,
    Detalles,
    Modal,
  },
  data: () => ({
    formulario: "_form",
    objetoAPI: {
      mensajeSuccess: "Operación realizada con éxito!!!",
      mensajeError: "Ha ocurrido un error en la operación!!!",
      mensajeEmpty: "No hay registros!!!",
    },
    items: [],
    dialog: false,
    confirm: false,
    editedIndex: -1,
    editedItem: {
      id: "",
      nombre: "",
      direccion: "",
      reeup: "",
      nit: "",
      banco: "",
      sucursal: "",
      cup: "",
      cuc: "",
      representante: "",
      resolucion_representante: "",
      fecha_resolucion: "",
      actividad: [],
    },
    defaultItem: {
      id: "",
      nombre: "",
      direccion: "",
      reeup: "",
      nit: "",
      banco: "",
      sucursal: "",
      cup: "",
      cuc: "",
      representante: "",
      resolucion_representante: "",
      fecha_resolucion: "",
      actividad: [],
    },
    headers: [
      { text: "Nombre", value: "nombre", sortable: false },
      { text: "Dirección", value: "direccion" },
      { text: "Código REEUP", value: "reeup" },
      { text: "NIT", value: "nit" },
      { text: "Acciones", value: "action", sortable: false },
    ],
    filters: [],
  }),
  computed: {
    ...mapState(["notificacion"]),
  },
  methods: {
    ...mapMutations(["mostrarNotificacion"]),
    async initialize() {
      try {
        const res = await this.axios.get("/nomencladores/v1/clientes");
        if (res.status == 204) {
          this.mostrarNotificacion({
            color: "warning",
            texto: this.objetoAPI.mensajeEmpty,
          });
        } else {
          this.items = res.data;
        }
      } catch (error) {
        this.mostrarNotificacion({
          color: "error",
          texto: `${this.objetoAPI.mensajeError}. ${error}`,
        });
      } finally {
        this.cargando = false;
      }
    },
    viewItem(item) {
      this.dialog = true;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    desactivateItem(item) {
      this.confirm = true;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    close() {
      this.dialog = false;
      this.confirm = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    createItem() {
      this.$router.push({
        name: "Create",
        params: {
          editedItem: this.editedItem,
          editedIndex: this.editedIndex,
          formulario: this.formulario,
        },
      });
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$router.push({
        name: "Update",
        params: {
          editedItem: this.editedItem,
          editedIndex: this.editedIndex,
          formulario: this.formulario,
        },
      });
    },
    async eliminar(item, index) {
      try {
        this.items.splice(index, 1);
        const res = await this.axios.post(
          `/nomencladores/v1/clientes/desactivate/${item.id}`
        );
        if (res.status == 200) {
          this.mostrarNotificacion({
            color: "success",
            texto: this.objetoAPI.mensajeSuccess,
          });
        }
      } catch (error) {
        this.mostrarNotificacion({
          color: "error",
          texto: `${this.objetoAPI.mensajeError}. ${error}`,
        });
      } finally {
        this.close();
      }
    },
  },
  created() {
    this.initialize();
  },
};
</script>
<style>
</style>