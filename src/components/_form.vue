<template>
  <v-container fluid grid-list-sm>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout wrap>
        <v-flex md12>
          <v-card fill-height style="height:100%" class="elevation-1">
            <v-card-title primary-title>{{formTitle}}</v-card-title>
            <v-card-text>
              <v-layout>
                <v-flex>
                  <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  <v-text-field v-model="editedItem.direccion" label="Dirección"></v-text-field>
                  <v-text-field v-model="editedItem.reeup" label="Código REUP"></v-text-field>
                  <v-text-field v-model="editedItem.nit" label="Código NIT"></v-text-field>
                  <v-text-field v-model="editedItem.banco" label="Banco en que opera"></v-text-field>
                  <v-text-field v-model="editedItem.sucursal" label="Sucursal"></v-text-field>
                  <v-text-field v-model="editedItem.cup" label="Cuenta en CUP"></v-text-field>
                  <v-text-field v-model="editedItem.cuc" label="Cuenta en CUC"></v-text-field>
                  <v-text-field v-model="editedItem.representante" label="Representante legal"></v-text-field>
                  <v-text-field
                    v-model="editedItem.resolucion_representante"
                    label="Resolución de nombramiento del representante"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.fecha_resolucion"
                    label="Fecha de la resolución de nombramiento"
                  ></v-text-field>
                  <v-btn @click="agregarActividad(actividad)">Agregar</v-btn>
                  <v-text-field v-model="actividad" label="Actividades económicas autorizadas"></v-text-field>
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
    {{editedItem}}
  </v-container>
</template>
<script>
import { rules } from "@/helpers/validators";
import { mapState, mapMutations } from "vuex";
import { mapToAPI } from '../mappers'

export default {
  name: "Form",
  props: ["escenario", "editedIndex", "editedItem"],
  data: () => ({
    valid: false,
    reglas: rules,
    objetoAPI: {
      mensajeSuccess: "Operación realizada con éxito!!!",
      mensajeError: "Ha ocurrido un error en la operación!!!",
    },
    actividad: "",
  }),
  computed: {
    ...mapState(["notificacion", "user", "permisos", "loading"]),
    formTitle() {
      return this.escenario === "create"
        ? "Registrar cliente"
        : `Editar cliente ${this.editedItem.nombre}`;
    },
  },
  methods: {
    ...mapMutations(["mostrarNotificacion", "mostrarProcesando"]),
    async save() {
      if (this.$refs.form.validate()) {
        this.mostrarProcesando(true);
        if (this.escenario === "update" && this.editedIndex != -1) {
          // Editar
          try {
            const editado = mapToAPI(this.editedItem);
            const res = await this.axios.put(
              `http://localhost:8884/v1/clientes/${this.editedItem.id}`,
              editado
            );
            this.mostrarNotificacion({
              color: "success",
              texto: this.objetoAPI.mensajeSuccess,
            });
          } catch (error) {
            console.log(error);
            this.mostrarNotificacion({
              color: "error",
              texto: `${this.objetoAPI.mensajeError}. ${error}`,
            });
          } finally {
            setTimeout(() => {
              this.$router.push({ name: "Index" });
              this.mostrarProcesando(false);
            }, 1000);
          }
        } else {
          //Guardar
          try {
            const res = await this.axios.post(
              "http://localhost:8884/v1/clientes",
              this.editedItem
            );
            this.mostrarNotificacion({
              color: "success",
              texto: this.objetoAPI.mensajeSuccess,
            });
          } catch (error) {
            this.mostrarNotificacion({
              color: "error",
              texto: `${this.objetoAPI.mensajeError}. ${error}`,
            });
          } finally {
            setTimeout(() => {
              this.$router.go(-1);
              this.mostrarProcesando(false);
            }, 1000);
          }
        }
      } else {
        this.mostrarNotificacion({
          color: "error",
          texto: "Error de validación en los datos",
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    cancelar() {
      this.clear();
      this.$router.push({ name: "Index" });
    },
    agregarActividad(item) {
      this.editedItem.actividad.push(item);
      this.actividad = "";
    },
  },
};
</script>

    <style>
</style>