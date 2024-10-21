const urlBase = 'http://localhost:8000';

export const environment = {
  ulr: urlBase,


  urlCrearUsuario: `${urlBase}/usuario/crear`,
  urlObtenerUsuario: `${urlBase}/usuario/buscar`,
  urlEditarUsuario: `${urlBase}/usuario/editar`,

  urlConsumoDiario: `${urlBase}/consumodia/usuario/rango`,
  urlConsumoDiarioGuardar: `${urlBase}/consumodia/crear/usuario`,
  urlConsumoDiarioEliminar: `${urlBase}/consumodia/eliminar`,

  urlBusquedaNombre: `${urlBase}/alimento/nombre`,
  urlAlimento: `${urlBase}/alimento/index`,
  urlProponerAlimento: `${urlBase}/alimento/crear`,

  urlObtenerPesos: `${urlBase}/peso/rangofechas`,
  urlGetAllPesos: `${urlBase}/peso/usuario`,
  urlEditarPeso: `${urlBase}/peso/editar`,
  urlEliminarPeso: `${urlBase}/peso/eliminar`,
  urlEncontrarPeso: `${urlBase}/peso/encontrar`,
  urlAnadirPeso: `${urlBase}/peso/crear`,

  urlObtenerTodosEjercicio: `${urlBase}/ejercicio`,
  urlProponerEjercicio: `${urlBase}/ejercicio/crear`,
  urlObtenerEjercicios: `${urlBase}/usuariorealizaejercicio/usuario`,
  urlEditarEjercicioRealizado: `${urlBase}/usuariorealizaejercicio/editar`, 
  urlEliminarEjercicioRealizado: `${urlBase}/usuariorealizaejercicio/eliminar`, 

  urlUsuarioRealizaEjercicio: `${urlBase}/usuariorealizaejercicio/realiza`,

}