import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {axiosConfig} from '@/config'
import {mapState, mapMutations} from 'vuex'
import {mapToAPI} from '@/mappers/MercanciasMapper'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = axiosConfig.url
axios.defaults.headers = axiosConfig.headers

export const loadFromAPI = {
    data: () =>( {
          objetoAPI: {
            mensajeSuccess: "Operación realizada con éxito!!!",
            mensajeError: "Ha ocurrido un error en la operación!!!",
            mensajeEmpty: "No hay registros!!!"
        }    
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
            this.items = res.data        
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

export const CRUD = {
  data: () =>( {
        objetoAPI: {
          mensajeSuccess: "Operación realizada con éxito!!!",
          mensajeError: "Ha ocurrido un error en la operación!!!",
          mensajeEmpty: "No hay registros!!!"
      }    
    }),
  methods: {
    ...mapMutations(['mostrarNotificacion']),
    viewItem (item) {
      this.dialog = true
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    desactivateItem (item){
      this.confirm = true
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    close () {
      this.dialog = false
      this.confirm = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    createItem(){
      this.$router.push({ 
        name: this.componenteCreate, 
        params: {
          editedItem: this.editedItem, 
          editedIndex: this.editedIndex, 
          formulario:this.formulario,
        }
      })
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push({ 
        name: this.componenteUpdate, 
        params: { 
          editedItem: this.editedItem, 
          editedIndex: this.editedIndex, 
          formulario:this.formulario, 
        }})
    },
    async eliminar(item,index){
      try {
        this.items.splice(index, 1)
        const res = await this.axios.post(`${this.urlBase}/desactivate/${item.id}`)
        if (res.status==200) {
          this.mostrarNotificacion({
            color:"success",
            texto: this.objetoAPI.mensajeSuccess
          })           
        }
      } catch (error) {
        this.mostrarNotificacion({
          color:"error",
          texto:`${this.objetoAPI.mensajeError}. ${error}`
        })        
      } finally {
        this.close()
      }
    }                       
  },
  computed: {
    ...mapState(['notificacion']),
  },  
}

export const Save = {
  data: () => ({
    objetoAPI: {
      mensajeSuccess: "Operación realizada con éxito!!!",
      mensajeError: "Ha ocurrido un error en la operación!!!",
  } 
  }),
  methods: {
    ...mapMutations(['mostrarNotificacion','mostrarProcesando']),
    async save () {
      if (this.$refs.form.validate()) {
        this.mostrarProcesando(true)
        if (this.escenario === "update" && this.editedIndex != -1) {
          // Editar
          try {
            const res = await axios.put(`${this.urlBase}/${this.editedItem.id}`, this.editItem)
            this.mostrarNotificacion({
              color:"success",
              texto: this.objetoAPI.mensajeSuccess
            })
            this.res = res.data
          } catch (error) {
            console.log(error)
            this.mostrarNotificacion({
              color:"error",
              texto:`${this.objetoAPI.mensajeError}. ${error}`
            })
          }finally{
            setTimeout(() => {
              this.$router.push({ name: this.componenteIndex})
              this.mostrarProcesando(false)
            }, 1000);
            
          }
        } else {
          //Guardar
          try {
            const res = await axios.post(this.urlBase, this.editedItem)            
            this.mostrarNotificacion({
              color:"success",
              texto: this.objetoAPI.mensajeSuccess
            })
          } catch (error) {
            this.mostrarNotificacion({
              color:"error",
              texto:`${this.objetoAPI.mensajeError}. ${error}`
            })
          }finally{
            setTimeout(() => {
              this.$router.go(-1)
              this.mostrarProcesando(false)
            }, 1000);
          }
        }           
      }else{
        this.mostrarNotificacion({
          color:"error",
          texto:"Error de validación en los datos"
        })
      }      
    },
    clear() {
      this.$refs.form.reset();
    },
    cancelar(){
      this.clear()
      this.$router.push({ name: this.componenteIndex})
    },        
  },
}