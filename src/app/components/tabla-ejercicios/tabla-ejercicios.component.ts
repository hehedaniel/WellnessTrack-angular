import { Component, inject } from '@angular/core';
import { EjerciciosRealizadosService } from '../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Ejercicio {
  hora: string;
  nombre: string;
  tiempo: string;
  calorias: number;
}

@Component({
  selector: 'app-tabla-ejercicios',
  standalone: true,
  imports: [],
  templateUrl: './tabla-ejercicios.component.html',
  styleUrl: './tabla-ejercicios.component.css'
})
export class TablaEjerciciosComponent {

  #ejRealizadosService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService)

  newData: Ejercicio[] = [];
  existeData: boolean = false;

  displayedColumns: string[] = ['Hora', 'Nombre', 'Calorías'];
  dataSource = this.newData;

  #snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): Ejercicio[] {
    this.#ejRealizadosService.getEjercicioRealizados(localStorage.getItem('idUsuarioLogeado'))
      .subscribe((data: any) => {
        if (data.respuesta.length == 0){
          console.log("No se encontraron ejercicios realizados.");
          return;
        }else {
          this.existeData = true;
          data.respuesta.forEach((respuesta: any) => {
            this.newData.push({
              nombre: respuesta.ejNombre,
              hora: (respuesta.hora.date.split(' ')[1]).split('.')[0],
              tiempo: respuesta.tiempo,
              calorias: respuesta.calorias
            });
          });
        }
      });

    return this.newData;
  }

  obtenerFecha(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  eliminarEjercicio(ejercicio: any) {
    this.#snackBar.open('No ha sido posible eliminar el ejercicio', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  editarEjercicio(ejercicio: any) {
    this.#snackBar.open('No ha sido posible editar el ejercicio', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

}
