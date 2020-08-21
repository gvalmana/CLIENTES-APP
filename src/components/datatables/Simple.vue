<template>
<v-row>
  <v-col>
  <v-data-table
    :dense="dense"
    :headers="headers"
    :items="items"
    :sort-by="sorteable"
    :search="search"
    :loading = false
    :loading-text="textoCargando"     
    class="elevation-1"
    :single-select="singleSelect"
    :show-select="showselect"
    :footer-props="{
      showFirstLastPage: true,
      itemsPerPageText: 'Filas por página.'
    }"    
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{titulo}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="textoBuscar"
          single-line
          hide-details
        ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on" @click="search = ''" fab><v-icon>mdi-cached</v-icon></v-btn>
          </template>
          <span>Reiniciar búsqueda</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" fab dark small v-on="on" color="primary" @click="dense = !dense">
              <v-icon dark v-if="dense==false" >mdi-minus</v-icon><v-icon dark v-else >mdi-plus</v-icon>
            </v-btn>
          </template>
          <span v-if="dense==false">Disminuir zoom</span><span v-else>Aumentar zoom</span>
        </v-tooltip>         
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reiniciar</v-btn>
    </template>
  </v-data-table>
</v-col>
</v-row>  
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
    name: 'Simple',
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
        'singleSelect'
    ],
    data:()=>({
      search: "",
      dense: false,
      cargando: true,
    }),
    computed: {
      ...mapState(['notificacion']),      
    },

}
</script>

<style>

</style>