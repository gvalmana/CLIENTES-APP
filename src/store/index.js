import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notificacion:{
      texto: '',
      show: false,
      color:'',
    },
    user: {
      authenticated: false,
      username:'',
      roles:[],
      emaiL:'',
      nombre:'',
      apellidos:'',
      nombreCompleto: ''
    },    
  },
  mutations: {
    mostrarNotificacion(state,data){
      setTimeout(() => {
        state.notificacion.color = data.color
        state.notificacion.texto = data.texto
        state.notificacion.show = true
      }, 800);
    },
    ocultarNotificacion(state){
      state.notificacion.show = false
    },
    startEntidad(state, data){
      state.user.authenticated = data.authenticated
      state.user.username = data.username,
      state.user.roles = data.roles
      state.user.emaiL = data.emaiL
      state.user.nombre = data.nombre
      state.user.apellidos = data.apellidos
      state.user.nombreCompleto = data.nombreCompleto
    },    
  },
  actions: {
  },
  modules: {
  }
})
