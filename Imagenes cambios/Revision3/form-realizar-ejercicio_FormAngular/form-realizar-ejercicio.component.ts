import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EjerciciosRealizadosService } from '../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormProponerEjercicioComponent } from '../form-proponer-ejercicio/form-proponer-ejercicio.component';
import { YoutubeVideoPlayerComponent } from '../youtube-video-player/youtube-video-player.component';

export interface Enlace {
  url: string;
}

@Component({
  selector: 'app-form-realizar-ejercicio',
  standalone: true,
  imports: [
    MatInputModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    YoutubeVideoPlayerComponent
],
  templateUrl: './form-realizar-ejercicio.component.html',
  styleUrl: './form-realizar-ejercicio.component.css'
})
export class FormRealizarEjercicioComponent {

  ruta = 'http://localhost:8000';
  #dialog: MatDialog = inject(MatDialog);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #usuarioService: UsuarioService = inject(UsuarioService);
  #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);

  myControl = new FormControl('');
  options: string[] = ['Escriba el nombre del ejercicio'];
  idOpciones: string[] = [''];
  opcionesGrupoMuscular: string[] = ['Pecho', 'Espalda', 'Hombros', 'Biceps', 'Triceps', 'Piernas', 'Abdominales', 'Gluteos', 'Cardio', 'Full Body'];

  textareaContent: string = '';
  seleccionadoTiempo = false;

  ejercicioSeleccionado: string = '';
  idEjercicioSeleccionado: string = '';
  grupoMuscular: string = '';
  tiempo: string = '';
  valorMet: string = '';
  dificultad: string = '';
  tieneEnlaces: boolean = false;
  enlaces: Enlace[] = [];

  ngOnInit() {
    this.checkLogedIn();
  }

  checkLogedIn() {
    this.#authService.fbUserEmail().then((email) => {
      if (email !== null) {
        console.log('Usuario logeado');
      } else {
        console.log('Usuario no logeado');
        this.#router.navigate(['/login']);
      }
    });
  }

  abrirVideo(url: string, event: MouseEvent) {
    event.preventDefault(); // Evita que el enlace navegue a otra página
    const videoId = this.extraerIDVideo(url);
    this.#dialog.open(YoutubeVideoPlayerComponent, {
      data: { videoId },
    });
  }

  private extraerIDVideo(url: string): string {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v') || '';
  }

  openDialog() {
    this.#dialog.open(FormRealizarEjercicioComponent);
  }

  closeDialog() {
    this.#dialog.closeAll();
  }

  focusTiempo(){
    this.seleccionadoTiempo = true;
  }

  onInputChange(event: Event): void {
    // Falta que al no encontrar resultados, se muestre una unica opcion, no opciones vacias
    const input = event.target as HTMLInputElement;

    this.#ejercicioService.postBusquedaNombre(input.value).subscribe((data: any) => {
      // console.log(data.respuesta);
      let respuestas = [];
      let ids = [];
      if (data.respuesta === "No se ha encontrado el ejercicio") {
        respuestas.push('No se encontraron resultados, propón el tuyo!');
      } else {
        for (const ejercicio of data.respuesta) {
          respuestas.push(ejercicio.nombre);
          this.idOpciones.push(ejercicio.id);
        }
      }
      this.options = respuestas;
    });
  }

  mostrar(opcion: string) {
    // Esta funcion muestra la informacion del ejercicio seleccionado
    if (opcion == "undefined") {
      this.textareaContent = 'Descripcion del ejercicio';
      this.grupoMuscular = 'Grupo muscuarl';
      this.valorMet = 'Valor Met';
      this.dificultad = 'Dificultad';
    } else {
      // console.log(opcion)
      this.#ejercicioService.postBusquedaNombre(opcion).subscribe((data: any) => {
        this.idEjercicioSeleccionado = data.respuesta[0].id;
        this.textareaContent = data.respuesta[0].descripcion;
        this.grupoMuscular = data.respuesta[0].grupoMuscular;
        this.valorMet = data.respuesta[0].valorMET;
        this.dificultad = data.respuesta[0].dificultad;
        this.tieneEnlaces = true;
        this.enlaces = data.respuesta[0].enlaces;
      });
    }
  }

  guardarEjercicioRealizado() {
    const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
    if (idUsuario === '') {
      console.log('No se ha podido obtener el id del usuario');
      return;
    }

    const tiempo = this.tiempo; 
    const met = this.valorMet; 
    const idEjercicio = this.idEjercicioSeleccionado; 

    // Comprueba que se han introducido todos los datos
    if (tiempo === '' || idEjercicio === '' || tiempo === undefined || idEjercicio === undefined) {
      this.#snackBar.open('Por favor, rellene todos los campos', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    console.log(met);

    // Hago la petición para guardar el ejercicio realizado
    this.#ejercicioService.postEjercicioRealizadoGuardar(idEjercicio, idUsuario, tiempo, met)
      .subscribe((data: any) => {
        console.log(data);
        if (data.code === 200) {
          this.#dialog.closeAll();
          location.reload();
          this.#snackBar.open('Ejercicio guardado correctamente', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        }else {
          this.#snackBar.open('No ha sido posible guardar el ejercicio', '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
  }

  openDialogProponer() {
    this.#dialog.open(FormProponerEjercicioComponent, {
      width: '80%',
      height: 'auto',
      maxHeight: '90vh',
    });
  }

  obtenerFecha() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }
  obtenerHora() {
    const date = new Date();
    return date.toISOString().split('T')[1].split('.')[0];
  }

}
