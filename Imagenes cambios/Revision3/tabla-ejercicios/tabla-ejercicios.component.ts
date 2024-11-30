import { Component, inject } from '@angular/core';
import { EjerciciosRealizadosService } from '../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarEjercicioRealizadoComponent } from '../form-editar-ejercicio-realizado/form-editar-ejercicio-realizado.component';
import { FormEliminarEjercicioRealizadoComponent } from '../form-eliminar-ejercicio-realizado/form-eliminar-ejercicio-realizado.component';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


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
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './tabla-ejercicios.component.html',
  styleUrl: './tabla-ejercicios.component.css'
})
export class TablaEjerciciosComponent implements AfterViewInit{

  @ViewChild(MatSort) sort!: MatSort;

  #ejRealizadosService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService)

  newData: Ejercicio[] = [];
  existeData: boolean = false;

  displayedColumns: string[] = ['hora', 'nombre','tiempo', 'calorias', 'acciones'];
  dataSource!: MatTableDataSource<Ejercicio>;

  #dialog: MatDialog = inject(MatDialog);

  ngOnInit() {
    this.fetchData();
  }
 
  ngAfterViewInit() {
    const interval = setInterval(() => {
      if (this.existeData) {  // Comprobamos si ya hay datos
        this.dataSource.sort = this.sort;
        console.log("Ya existe data, configurado sort");
        clearInterval(interval);  //Para parar el intervalo
      } else {
        console.log("Esperando a data");
      }
    }, 500);//Tiempo del intervalo
  }
  
  fetchData(): void {
    this.#ejRealizadosService.getEjercicioRealizados(localStorage.getItem('idUsuarioLogeado'))
      .subscribe((data: any) => {
        if (data.respuesta.length === 0) {
          console.log("No se encontraron ejercicios realizados.");
          this.existeData = false;
          return;
        } else {
          this.existeData = true;
          
          this.newData = data.respuesta.map((respuesta: any) => ({
            nombre: respuesta.ejNombre,
            hora:  (respuesta.hora.date.split(' ')[1]).split('.')[0],
            tiempo: respuesta.tiempo,
            calorias: respuesta.calorias,
            fecha: respuesta.fecha.date.split(' ')[0]
          }));
          this.dataSource = new MatTableDataSource(this.newData); // Actualiza dataSource
        }
      });
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

  editarEjercicio(ejercicio: any) {
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
