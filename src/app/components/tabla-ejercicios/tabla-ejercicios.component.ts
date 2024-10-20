import { Component, inject } from '@angular/core';
import { EjerciciosRealizadosService } from '../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarEjercicioRealizadoComponent } from '../form-editar-ejercicio-realizado/form-editar-ejercicio-realizado.component';


export interface Ejercicio {
  hora: string;
  nombre: string;
  tiempo: string;
  calorias: number;
}

export interface EjercicioRealizadoModificar {
  tiempo: string;
  met: string;
  idEjercicio: string;
  nombre: string;
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

  editarEjercicio(ejercicio: Ejercicio) {

    // const dialogData = {
    //   grupoMuscular: ejercicio.grupoMuscular,
    //   descripcion: this.textareaContent,
    //   tiempo: this.tiempo,
    //   valorMet: this.valorMet,
    //   dificultad: this.dificultad,
    //   opciones: this.options // si también quieres pasar opciones
    // };

    // this.#dialog.open(FormEditarEjercicioRealizadoComponent, {
    //   data: {
    //     idEjercicioRealizado: ejercicio.idEjercicioRealizado,
    //     tiempo: ejercicio.tiempo,
    //     met: ejercicio.met,
    //     idEjercicio: ejercicio.idEjercicio,
    //     nombre: ejercicio.nombre,
    //     idUsuario: ejercicio.idUsuario
    //   },
    //   width: '50%',
    //   height: 'auto',
    //   maxHeight: '90vh',  // Para evitar que el diálogo se expanda demasiado verticalmente
    // });
  }

}
