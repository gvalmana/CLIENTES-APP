<template>
<v-container fluid grid-list-sm>
        <v-card-text>
            <v-layout wrap>
                {{item}}                                     
            </v-layout> 
        </v-card-text>   
</v-container>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
    name:'Detalles',
    props:['item','editedIndex'],
    methods: {
        atras(){
            this.$router.push({ name: 'indexcont'})
        },
        editItem (item) {
            this.$router.push({ name: 'updatecont', params: { editedItem: this.item, editedIndex: this.editedIndex }})
        },       
    },
    created(){
        if (this.item==null) {
            this.$router.push('Error404')
        }
    },
    computed: {
        ...mapState(['notificacion','user','roles']),        
        colorDias(){
            if (this.item.cant_dias_documentos_entregados >= 13 && this.item.cant_dias_documentos_entregados < 15) {
                return 'warning'
            } else if (this.item.cant_dias_documentos_entregados >= 15){
                return 'error'
            }else{
                return 'success'
            }            
        },
        colorEstadia(){
            if (this.item.edad_contenedor >= 13 && this.item.edad_contenedor < 15) {
                return 'warning'
            } else if (this.item.edad_contenedor >= 15){
                return 'error'
            }else{
                return 'success'
            }            
        },
        colorEstado(){
            let res = "info"
            switch (this.item.estado) {
                case "Por extraer":
                    res = "info"
                    break;
                case "Extraida":
                    res = "warning"
                    break;
                case "Devuelta":
                    res = "error"
                    break;
            }
            return res; 
        },
        confirmado(){
            return this.item.estado?'Confirmado con el cliente':'No confirmado con el cliente'
        },
        estado(){
            let res = ""
            switch (this.item.estado) {
                case "Por extraer":
                    res = "Para extraer"
                    break;
                case "Extraida":
                    res = "Extraido"
                    break;
                case "Devuelta":
                    res = "Devuelto"
                    break;
            }
            return res;            
        }
    },
}
</script>

<style>

</style>