<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="items"
        :sort-by="sorteable"
        class="elevation-1"
        :search="search"
        :show-select="showselect"
        :loading="false"
        :loading-text="textoCargando"
        :dense="dense"
        v-model="selected"
        fixed-header
        :single-select="singleSelect"
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
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" @click="createItem" v-on="on" v-if="permisos.crear">
                  <v-icon>mdi-plus</v-icon>Nuevo
                </v-btn>
              </template>
              <span>{{textoCrear}}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="textoBuscar"
              single-line
              hide-details
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on" @click="search = ''" fab>
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </template>
              <span>Reiniciar búsqueda</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  v-on="on"
                  color="primary"
                  @click="dense = !dense"
                >
                  <v-icon dark v-if="dense==false">mdi-minus</v-icon>
                  <v-icon dark v-else>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span v-if="dense==false">Disminuir zoom</span>
              <span v-else>Aumentar zoom</span>
            </v-tooltip>
          </v-toolbar>
        </template>
        <template v-slot:item.edad="{ item }">
          <v-chip :color="getColor(item.edad)" dark>{{ item.edad }}</v-chip>
        </template>
        <template v-slot:item.cantidad_dias_desagrupada="{ item }">
          <v-chip
            :color="getColor(item.cantidad_dias_desagrupada)"
            dark
          >{{ item.cantidad_dias_desagrupada }}</v-chip>
        </template>
        <template v-slot:item.dias_entregada="{ item }">
          <v-chip :color="getColorGuias(item.dias_entregada)" dark>{{ item.dias_entregada }}</v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon small @click="viewItem(item)" color="green" v-on="on">mdi-eye-settings</v-icon>
            </template>
            <span>Ver</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
                color="blue"
                v-on="on"
                v-if="permisos.editar"
              >mdi-pencil</v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon
                small
                @click="desactivateItem(item)"
                color="red"
                v-on="on"
                v-if="permisos.eliminar && (item.estado==='Lista para extraer' || item.estado==='Active')"
              >mdi-delete</v-icon>
            </template>
            <span>Desactivar</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Recargar</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import { Component, Vue } from "vue-property-decorator";
export default {
  name: "Datatable",
  props: [
    "headers",
    "items",
    "titulo",
    "initialize",
    "textoBuscar",
    "sorteable",
    "textoCargando",
    "createItem",
    "textoCrear",
    "viewItem",
    "editItem",
    "desactivateItem",
    "showselect",
    "filters",
    "columnas",
    "singleSelect",
  ],
  data: () => ({
    dialog: false,
    search: "",
    dense: false,
    borrar: false,
    cargando: true,
    selected: [],
    permisos: {
      eliminar: false,
      extraer: false,
      crear: false,
      editar: false,
    },
  }),
  created() {
    this.permisos.eliminar = this.user.roles.includes("admin");
    this.permisos.extraer = this.user.roles.includes("user");
    this.permisos.crear = this.user.roles.includes("user");
    this.permisos.editar = this.user.roles.includes("user");
  },
  computed: {
    ...mapState(["notificacion", "user"]),
    componenteOpcional() {
      return () => import(`@/components/${this.columnas}`);
    },
  },
  methods: {
    ...mapMutations(["mostrarNotificacion"]),
  },
};
</script>
<style>
/* tr td.text-start:last-child { opacity: 0 ; transition: all .2s ease-in; }
tr:hover > td.text-start:last-child {opacity: 1;} */
</style>