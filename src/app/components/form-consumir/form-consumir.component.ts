import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlimentosService } from '../../services/alimentos.service';
import { id } from '@swimlane/ngx-charts';
import { FormProponerAlimentoComponent } from '../form-proponer-alimento/form-proponer-alimento.component';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-consumir',
  standalone: true,
  imports: [
    MatInputModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form-consumir.component.html',
  styleUrl: './form-consumir.component.css'
})
export class FormConsumirComponent {


  ruta = 'http://localhost:8000';
  #dialog: MatDialog = inject(MatDialog);
  #router: Router = inject(Router);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #authService: AuthService = inject(AuthService);
  #usuarioService: UsuarioService = inject(UsuarioService);

  #alimentoService: AlimentosService = inject(AlimentosService);

  myControl = new FormControl('');
  options: string[] = ['Escriba el nombre del alimento'];

  textareaContent: string = 'Texto inicial';

  comidaSeleccionada: string = '';
  base64Image: string = '';

/**
 * TODO: Comprobar que el formulario esta relleno
 * Rellenar el formulario cuando este es para editar
 */

  closeDialog() {
    this.#dialog.closeAll();
  }

  onInputChange(event: Event): void {
    // Falta que al no encontrar resultados, se muestre una unica opcion, no opciones vacias
    const input = event.target as HTMLInputElement;

    this.#alimentoService.getBusquedaNombre(input.value).subscribe((data: any) => {
      console.log(data.respuesta);
      let respuestas = [];
      if (data.respuesta === "No se ha encontrado el alimento") {
        respuestas.push('No se encontraron resultados, propón el tuyo!');
      } else {
        for (const alimento of data.respuesta) {
          respuestas.push(alimento.nombre);
        }
      }
      this.options = respuestas;
    });
  }

  mostrar(opcion: string) {
    // Esta funcion muestra la informacion del alimento seleccionado
    if (opcion == "undefined") {
      this.textareaContent = 'Descripcion';
    } else {
      this.#alimentoService.getBusquedaNombre(opcion).subscribe((data: any) => {
        console.log(data.respuesta);
        this.textareaContent = data.respuesta[0].descripcion;
        this.comidaSeleccionada = data.respuesta[0].nombre;
        this.base64Image = data.respuesta[0].imagen;
        // Aqui deberia mostar la imagen
      });
    }
  }

  guardarConsumo(cantidad: string) {

    if (this.comidaSeleccionada === '' || this.comidaSeleccionada === 'No se encontraron resultados, propón el tuyo!' || this.comidaSeleccionada === undefined) {
      alert('Alimento seleccionado no válido');
      this.#snackBar.open('Alimento seleccionado no válido', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }else {
    // Aqui se realiza la peticion para guardar el consumo
    const idUsuario = this.getIDUsuario();
    console.log(idUsuario);
    const fechaActual = new Date();
    const fecha = fechaActual.toISOString().split('T')[0];
    const hora = fechaActual.toISOString().split('T')[1].split('.')[0];

    console.log(typeof parseFloat(cantidad));

    let momento: string;
    const horaActual = fechaActual.getHours();

    if (horaActual >= 6 && horaActual < 10) {
      momento = 'Desayuno';
    } else if (horaActual >= 12 && horaActual < 16) {
      momento = 'Almuerzo';
    } else if (horaActual >= 20 && horaActual < 24) {
      momento = 'Cena';
    } else {
      momento = 'Entre horas';
    }

    this.#alimentoService.postConsumoDiarioGuardar(this.comidaSeleccionada, cantidad, momento, fecha, hora, idUsuario).subscribe((data: any) => {
      console.log(data.respuesta);
      if (data.code == 200){
        this.#dialog.closeAll();
        location.reload();
        this.#snackBar.open('Consumo guardado correctamente', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }
    });
    }
  }

  proponerAlimento() {
    this.#dialog.closeAll();
    this.#router.navigate(['proponer-alimento']);
  }

  getIDUsuario(): any {
    return localStorage.getItem('idUsuarioLogeado');
  }
}
