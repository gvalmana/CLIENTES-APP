export const filtrosMercancias = (items, filtros)=>{
  let extraer = items.filter(index=>{
    return filtros.extraer && index.estado === 'Por extraer'
  })
  let extraidas = items.filter(index=>{
    return filtros.extraidos && index.estado === 'Extraida'
  })

  let devueltas = items.filter(index=>{
    return filtros.devueltos && index.estado === 'Devuelta'
  })

  return extraer.concat(extraidas.concat(devueltas)) 
}

export const filtrosOperaciones = (items, filtros) => {
  let contenedores =  items.filter(index=>{
    return filtros.contenedores && index.mercancia.tipo_mercancia=='Contenedor'
  })
  let cargas = items.filter(index=>{
    return filtros.cargas && index.mercancia.tipo_mercancia=='Carga agrupada'
  })
  let guias = items.filter(index=>{
    return filtros.guias && index.mercancia.tipo_mercancia=='Guia aerea'
  })

  return contenedores.concat(cargas.concat(guias))
}