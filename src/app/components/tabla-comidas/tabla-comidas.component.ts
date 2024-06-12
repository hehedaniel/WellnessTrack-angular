import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlimentosService } from '../../services/alimentos.service';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormConsumirComponent } from '../form-consumir/form-consumir.component';
import { FormEliminarConsumoDiarioComponent } from '../form-eliminar-consumo-diario/form-eliminar-consumo-diario.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Comida {
  nombre: string;
  hora: string;
  calorias: number;
}

@Component({
  selector: 'app-tabla-comidas',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatIcon
  ],
  templateUrl: './tabla-comidas.component.html',
  styleUrl: './tabla-comidas.component.css'
})

export class TablaComidasComponent {

  #alimentoService: AlimentosService = inject(AlimentosService);
  #dialog: MatDialog = inject(MatDialog);
  #snacbkar: MatSnackBar = inject(MatSnackBar);

  newData: Comida[] = [];
  existeData: boolean = false;

  displayedColumns: string[] = ['Hora', 'Nombre', 'Calorías'];
  dataSource = this.newData;

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): Comida[] {

    const fecha = this.obtenerFecha();
    // const fecha = '2024-06-01';

    this.#alimentoService.getConsumoDiario(localStorage.getItem('idUsuarioLogeado'), fecha, fecha)
      .subscribe((data: any) => {
        if (data.respuesta == "No se encontraron entradas en las fechas indicadas."){
          console.log("No se encontraron entradas en las fechas indicadas.");
          return;
        }else {
          this.existeData = true;
          data.respuesta.forEach((respuesta: any) => {
            const horaCompleta = respuesta.hora.date.split(' ')[1];
            this.newData.push({
              nombre: respuesta.nutrientes.nombre,
              hora: horaCompleta.split('.')[0],
              calorias: respuesta.nutrientes.calorias
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

  eliminarComida(comida: any) {
    console.log(comida);

    const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
    if (idUsuario === '') {
      console.log('No se ha podido obtener el id del usuario');
      return;
    }

    localStorage.setItem('fecha', this.obtenerFecha());
    localStorage.setItem('hora', comida.hora);
    localStorage.setItem('comida', comida.nombre);
    localStorage.setItem('calorias', comida.calorias.toString());

    this.#dialog.open(FormEliminarConsumoDiarioComponent);


  }

  editarComida(comida: any) {

    this.#snacbkar.open('Lo sentimos esa opción no esta disponible', '', {
      duration: 2000,
    });

    console.log("Editar comida: " + comida);

  }
}


