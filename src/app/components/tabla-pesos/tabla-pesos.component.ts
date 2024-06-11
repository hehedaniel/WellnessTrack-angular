import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PesoService } from '../../services/peso.service';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarPesoComponent } from '../form-editar-peso/form-editar-peso.component';
import { FormDeletePesoComponent } from '../form-delete-peso/form-delete-peso.component';
import { FormAnadirPesoComponent } from '../form-anadir-peso/form-anadir-peso.component';

export interface Peso {
  fecha: string;
  hora: string;
  peso: number;
}

@Component({
  selector: 'app-tabla-pesos',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatIcon
  ],
  templateUrl: './tabla-pesos.component.html',
  styleUrl: './tabla-pesos.component.css'
})
export class TablaPesosComponent {

  #pesoService: PesoService = inject(PesoService);
  #dialog: MatDialog = inject(MatDialog);

  newData: Peso[] = [];

  displayedColumns: string[] = ['Fecha y hora', 'peso'];
  dataSource = this.newData;

  ngOnInit() {
    // console.log(this.newData);

    this.fetchData();
  }

  fetchData(): Peso[] {

    const fecha = this.obtenerFecha();

    this.#pesoService.getAllPesos('2')
      .subscribe((data: any) => {
        data.respuesta.forEach((respuesta: any) => {
          const horaCompleta = respuesta.hora.date.split(' ')[1];
          console.log(horaCompleta);
          console.log(respuesta);
          this.newData.push({
            fecha: respuesta.fecha.date.split(' ')[0],
            hora: horaCompleta.split('.')[0],
            peso: respuesta.peso
          });
        });
      });

    return this.newData;
  }

  obtenerFecha(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  anadirPeso(){
    this.#dialog.open(FormAnadirPesoComponent);
  }

  editPeso(peso: any){

    console.log(peso);

    localStorage.setItem('peso', peso.peso);
    localStorage.setItem('fecha', peso.fecha);
    localStorage.setItem('hora', peso.hora);

    this.#dialog.open(FormEditarPesoComponent);

    // this.#pesoService.putEditarPeso('2', peso.fecha, peso.hora, peso.peso).subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  deletePeso(peso: any){

    console.log(peso);

    localStorage.setItem('peso', peso.peso);
    localStorage.setItem('fecha', peso.fecha);
    localStorage.setItem('hora', peso.hora);

    this.#dialog.open(FormDeletePesoComponent);
  }
}
