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

  // getBusquedaNombre(nombre: string){
  //   return this.#http.post(`${environment.urlBusquedaNombre}`, { nombre });
  // }

  // postConsumoDiarioGuardar(comida: string, cantidad: string, momento: string, fecha: string, hora: string, idUsuario: string){
  //   return this.#http.post(`${environment.urlConsumoDiarioGuardar}/${idUsuario}`, { comida, cantidad, momento, fecha, hora, idUsuario });
  // }

  // postProponerAlimento(alimento: any){
  //   return this.#http.post(`${environment.urlProponerAlimento}`, {alimento});
  // }

  // deleteConsumoDiario(comida: string, fecha: string, hora: string, idUsuario: string){
  //   return this.#http.post(`${environment.urlConsumoDiarioEliminar}`, { comida, fecha, hora, idUsuario });
  // }

  // // Comprobar por que da error de sobrecarga
  // // deleteConsumoDiario(comida: string, fecha: string, hora: string, idUsuario: string){
  // //   return this.#http.delete(`${environment.urlConsumoDiarioEliminar}`, { comida, fecha, hora, idUsuario });
  // // }
}
