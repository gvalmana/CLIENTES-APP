export const mapToAPI = (data) =>({
    fecha_habilitacion: data.fecha_habilitacion,
    fecha_documentos: data.fecha_documentos,
    situacion: data.situacion,
    observaciones: data.observaciones,
    descripcion: data.descripcion,
    cliente: data.cliente,
    importadora: data.importadora,
    estado: mapEstado(data),
    fecha_arribo: data.fecha_arribo,
    codigo: data.codigo,
    manifiesto: data.manifiesto,
    bl: data.bl,
    fecha_planificacion: data.fecha_planificacion,
    tamano: data.tamano,
    puerto: data.puerto,
    codigo_contenedor: data.codigo_contenedor,
    dm: data.dm,
    fecha_descarga: data.fecha_descarga,
    fecha_desagrupe: data.fecha_desagrupe,
    peso: data.peso,
    cantidad_de_bultos: data.cantidad_de_bultos,
    fecha_entrega: data.fecha_entrega,
})

function mapEstado(data){
    let res = ""
    if (data.fecha_habilitacion===null) {
        res = "PENDIENTE_DE_HABILITAR"
        return res
    }else if (data.fecha_documentos===null) {
        res = "PENDIENTE_DE_ENTREGAR"
        return res
    }
    switch (data.estado) {
        case "Extraida":
            res = "EXTRAIDA"
            break;
        case "Devuelta":
            res = "DEVUELTA"
            break;
        case "Active":
            res =  "ACTIVE";
            break;
        case "Disabled":
            res = "DISABLE";
            break;
        case "Active":
            res = "ACTIVE";
            break;            
        default:
            res = "LISTO_PARA_EXTRAER"
            break;
    }
    return res;
}

export const mapAPIToContenedor = (data)=>({
    id: data.id,
    confirmado: data.confirmado,
    codigo: data.codigo,
    manifiesto: data.manifiesto,
    bl: data.bl,
    descripcion: data.descripcion,
    cliente: data.cliente,
    importadora: data.importadora,
    fecha_arribo: data.fecha_arribo,
    fecha_habilitacion: data.fecha_habilitacion,
    fecha_planificacion: data.fecha_planificacion,
    fecha_documentos: data.fecha_documentos,
    situacion: data.situacion,
    observaciones: data.observaciones,
    tamano: data.tamano,
    puerto: data.puerto,
    estado: data.estado,
    estadia: data.estadia,
    edad_contenedor: data.edad_contenedor,
    cant_dias_documentos_entregados: data.cant_dias_documentos_entregados
})

export const mapContenedorToGrid = (data)=>({
    id: data.id,
    codigo: data.codigo,
    descripcion: data.descripcion,
    fecha_arribo: data.fecha_arribo,
    manifiesto: data.manifiesto,
    bl: data.bl,    
    cliente: data.cliente,
    importadora: data.importadora,
    edad_contenedor: data.edad_contenedor,
    fecha_habilitacion: data.fecha_habilitacion,
    fecha_documentos: data.fecha_documentos,
    fecha_planificacion: data.fecha_planificacion,
    cant_dias_documentos_entregados: data.cant_dias_documentos_entregados,
    tamano: data.tamano,
    situacion: data.situacion,
    observaciones: data.observaciones,
})