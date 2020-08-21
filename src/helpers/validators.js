export const rules = {
    codigoRules:[
        v => !!v || 'El código es requerido',
        v => (v && v.length <= 15) || 'El código debe tener menos de 15 caracteres',
        v => (v && v.length >= 10) || 'El código debe tener más de 10 caracteres',      
    ],
    manifiestoRules:[
        v => !!v || 'El manifiesto es requerido',
    ],
    blRules: [
        v => !!v || 'El B/L es requerido',
    ],
    descripcionRules:[
        v => !!v || 'La descripción es requerida',
    ],
    empresaRules:[
        v => !!v || 'Empresa es requerida',
    ],
    fechaDocumentos: [
        //v => !!v || 'La fecha de entrega de los documentos es requerida'
    ],
    fechaPlanificacion: [
        //v => !!v || 'La fecha de planificación es requerida'
    ] 
}