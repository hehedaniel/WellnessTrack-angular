import { Component, inject } from '@angular/core';
import { EjerciciosRealizadosService } from '../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarEjercicioRealizadoComponent } from '../form-editar-ejercicio-realizado/form-editar-ejercicio-realizado.component';
import { FormEliminarEjercicioRealizadoComponent } from '../form-eliminar-ejercicio-realizado/form-eliminar-ejercicio-realizado.component';


export interface Ejercicio {
  fecha: string;
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
  #dialog: MatDialog = inject(MatDialog);

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
          // console.log(data.respuesta);
          data.respuesta.forEach((respuesta: any) => {
            // console.log(respuesta.fecha.date.split(' ')[0]);
            // console.log(respuesta.hora.date.split(' ')[1].split('.')[0]);
            // console.log(respuesta.tiempo);
            // console.log(respuesta.calorias);
            // console.log(respuesta.ejNombre);
            this.newData.push({
              // Añado a la lista de ejercicios realizados los datos que muestro en la tabla
              nombre: respuesta.ejNombre,
              hora: (respuesta.hora.date.split(' ')[1]).split('.')[0],
              tiempo: respuesta.tiempo,
              calorias: respuesta.calorias,
              fecha: respuesta.fecha.date.split(' ')[0]
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
    const dialogData = {
      tiempo: ejercicio.tiempo,
      calorias: ejercicio.calorias,
      hora: ejercicio.hora,
      nombre: ejercicio.nombre,
      fecha: ejercicio.fecha
    };
    this.#dialog.open(FormEliminarEjercicioRealizadoComponent, {
      data: {
        dialogData
      },
      width: 'auto',
      height: 'auto',
      maxHeight: '90vh',
    });
  }

  editarEjercicio(ejercicio: Ejercicio) {

    const dialogData = {
      tiempo: ejercicio.tiempo,
      calorias: ejercicio.calorias,
      hora: ejercicio.hora,
      nombre: ejercicio.nombre,
      fecha: ejercicio.fecha
    };
    this.#dialog.open(FormEditarEjercicioRealizadoComponent, {
      data: {
        dialogData
      },
      width: '50%',
      height: 'auto',
      maxHeight: '90vh',  // Para evitar que el diálogo se expanda demasiado verticalmente
    });
  }

}
