import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviromens/enviroment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EjerciciosRealizadosService {

  #http: HttpClient = inject(HttpClient);

  getEjercicioRealizados(usuario: any){
    return this.#http.get(`${environment.urlObtenerEjercicios}/${usuario}`);
  }

  postBusquedaNombre(nombre: string){
    return this.#http.post(`${environment.urlObtenerTodosEjercicio}/nombreConEnlaces`, { nombre });
  }

  postEjercicioRealizadoGuardar(idEjercicio: string, idUsuario: string, tiempo: string, met: string){
    return this.#http.post(`${environment.urlUsuarioRealizaEjercicio}`, { idEjercicio, idUsuario, tiempo, met });
  }

  postProponerEjercicio(nombre: string, dificultad: string, grupoMuscular: string, valorMET: string, descripcion: string, instrucciones: string, idUsuario: string, enlace1: string, enlace2: string){
    return this.#http.post(`${environment.urlProponerEjercicio}`, { nombre, dificultad, grupoMuscular, valorMET, descripcion, instrucciones, idUsuario, enlace1, enlace2 });
  }

  putEditarEjercicioRealizado(idUsuario: string, fecha: string, hora: string, idEjercicioViejo: string, tiempo: string, idEjercicioNuevo: string, met: string){
    return this.#http.put(`${environment.urlEditarEjercicioRealizado}`, { idUsuario, fecha, hora, idEjercicioViejo, tiempo, idEjercicioNuevo, met });
  }

  deleteEjercicioRealizado(idUsuario: string, fecha: string, hora: string, idEjercicio: string){
    return this.#http.post(`${environment.urlEliminarEjercicioRealizado}`, { idUsuario, fecha, hora, idEjercicio });
  }

  // // Comprobar por que da error de sobrecarga
  // // deleteConsumoDiario(comida: string, fecha: string, hora: string, idUsuario: string){
  // //   return this.#http.delete(`${environment.urlConsumoDiarioEliminar}`, { comida, fecha, hora, idUsuario });
  // // }
}
