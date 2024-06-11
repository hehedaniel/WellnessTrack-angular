import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviromens/enviroment';
import { HttpClient } from '@angular/common/http';
import { AlimentoProponerModel } from '../models/alimento.model';


@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  #http: HttpClient = inject(HttpClient);

  url: string = 'http://localhost:8000';

  getConsumoDiario(usuario: any, fechaInicio: any, fechaFin: any){
    return this.#http.post(`${environment.urlConsumoDiario}/${usuario}`, {fechaInicio, fechaFin});
  }

  getAlimento(id: string){
    return this.#http.get(`${environment.urlAlimento}/${id}`);
  }

  getBusquedaNombre(nombre: string){
    return this.#http.post(`${environment.urlBusquedaNombre}`, { nombre });
  }

  postConsumoDiarioGuardar(comida: string, cantidad: string, momento: string, fecha: string, hora: string, idUsuario: string){
    return this.#http.post(`${environment.urlConsumoDiarioGuardar}/${idUsuario}`, { comida, cantidad, momento, fecha, hora, idUsuario });
  }

  postProponerAlimento(alimento: any){
    return this.#http.post(`${environment.urlProponerAlimento}`, {alimento});
  }

  deleteConsumoDiario(comida: string, fecha: string, hora: string, idUsuario: string){
    return this.#http.post(`${environment.urlConsumoDiarioEliminar}`, { comida, fecha, hora, idUsuario });
  }

  // Comprobar por que da error de sobrecarga
  // deleteConsumoDiario(comida: string, fecha: string, hora: string, idUsuario: string){
  //   return this.#http.delete(`${environment.urlConsumoDiarioEliminar}`, { comida, fecha, hora, idUsuario });
  // }
}
