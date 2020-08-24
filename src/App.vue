<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <!-- DIALOGO DE CONFIRMAR SALIDA-->    
      <v-dialog
          v-model="cerrar"
          max-width="490"
        >
          <v-card>
            <v-card-title class="headline" color="error">¿Desea cerrar la aplicación?</v-card-title>
            <v-card-text>
              Está seguro que desea cerrar sessión?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="cerrar = false"
              >
                Cancelar
              </v-btn>
              <v-btn                
                text
                class="primary"
                error
                @click="logout"
              >
                Salir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- CUADRO DE NOTIFIACIONES -->    
        <v-snackbar
          v-model="notificacion.show"
          :timeout="3000"
          top
          :color= "notificacion.color"
        >
          {{notificacion.texto}}
          <v-btn text @click.native="ocultarNotificacion"><v-icon>mdi-close</v-icon></v-btn>
        </v-snackbar>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="http://localhost:8180/auth/realms/GEASP/account/"
        target="_blank"
      >
        <span class="mr-2">Perfil de usuario {{user.username}}</span>
        <v-icon>mdi-users</v-icon>
      </v-btn>
      <v-btn
        text
        @click="cerrar = true"
      >
        <span class="mr-2">Cerrar sessión</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          top
          color="deep-purple accent-4"
        ></v-progress-linear>      
        <v-layout
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <router-view></router-view>
          </v-col>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home';
import { Component, Vue } from 'vue-property-decorator';
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({
    cerrar: false,
    appName: 'OPTEI',
    authenticated: false,
    logo: require('@/assets/GEASP.png'),
    usuario: {
      username: '',
      email: '',
      roles:[]
    },
  }),
  computed: {
    ...mapState(['user','notificacion','loading'])
  },
  created() {
    // TODO:
      try {
        if (Vue.prototype.$keycloak.token !== null) {
          const entidad = {
            authenticated: true,
            username: Vue.prototype.$keycloak.userName,
            roles: Vue.prototype.$keycloak.tokenParsed.realm_access.roles,
            email: Vue.prototype.$keycloak.tokenParsed.email,
            nombre: Vue.prototype.$keycloak.tokenParsed.given_name,
            apellidos: Vue.prototype.$keycloak.tokenParsed.family_name,
            nombreCompleto: Vue.prototype.$keycloak.tokenParsed.name,
          }
        this.startEntidad(entidad)
        }          
      } catch (error) {
        console.log(error)
      }
    },
    methods:{
      ...mapMutations(['startEntidad','mostrarProcesando','mostrarNotificacion','ocultarNotificacion']),
      logout(){
        Vue.prototype.$keycloak.logoutFn();        
      },
      logIn() {
        // TODO:
        Vue.prototype.$keycloak.loginFn();
      },
    },      
};
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>