import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { Enlace, FormRealizarEjercicioComponent } from '../form-realizar-ejercicio/form-realizar-ejercicio.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TablaEjerciciosComponent } from '../tabla-ejercicios/tabla-ejercicios.component';

@Component({
  selector: 'app-form-editar-ejercicio-realizado',
  standalone: true,
  imports: [
    MatInputModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './form-editar-ejercicio-realizado.component.html',
  styleUrl: './form-editar-ejercicio-realizado.component.css'
})
export class FormEditarEjercicioRealizadoComponent {

  constructor(
    public dialogRef: MatDialogRef<FormEditarEjercicioRealizadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}  


  // Falta recibir los datos y mostrarlos en el formulario

  ruta = 'http://localhost:8000';
  #dialog: MatDialog = inject(MatDialog);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);

  myControl = new FormControl('');
  options: string[] = ['Escriba el nombre del ejercicio'];
  idOpciones: string[] = [''];


  //Datos que recibo desde el otro componente
  nombre: string = '';
  calorias: string = '';
  tiempo: string = '';
  hora: string = '';
  fecha: string = '';

  // Me guardo el tiempo viejo para hacer la regla de 3
  tiempoViejo: number = 0;

  //Datos que recojo desde la peticion
  ejercicioSeleccionado: string = '';
  idEjercicioSeleccionado: string = '';
  idEjercicioNuevo: string = '';
  valorMet: string = '';
  grupoMuscular: string = '';
  dificultad: string = '';
  textareaContent: string = '';
  tieneEnlaces: boolean = false;
  enlaces: Enlace[] = [];

  datosRecibidos: boolean = false;

  ngOnInit() {
    this.checkLogedIn();
    if (this.data && this.data.dialogData) {
      // Me guardo el tiempo viejo para hacer la regla de 3
      this.tiempoViejo = Number(this.data.dialogData.tiempo);
      //Recojo y reasigno los datos que recibo
      this.nombre = this.data.dialogData.nombre;
      this.calorias = this.data.dialogData.calorias;
      this.tiempo = this.data.dialogData.tiempo;
      this.hora = this.data.dialogData.hora;
      this.fecha = this.data.dialogData.fecha;
      
      //Hago la peticion para obtener el ejercicio el resto de datos
      this.#ejercicioService.postBusquedaNombre(this.nombre).subscribe((data: any) => {
        this.idEjercicioSeleccionado = data.respuesta[0].id;
        this.textareaContent = data.respuesta[0].descripcion;
        this.valorMet = data.respuesta[0].valorMET;
        this.dificultad = data.respuesta[0].dificultad;
        this.tieneEnlaces = true;
        this.grupoMuscular = data.respuesta[0].grupoMuscular;
        this.enlaces = data.respuesta[0].enlaces;
        this.datosRecibidos = true;
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
    const hora = this.hora;
    const fecha = this.fecha;

    //Aqui obtengo las nuevas calorias mediante una regla de 3
    //(Solo sirve si no se cambia de ejercicio, eres tonto)
    //const calorias = (Number(this.calorias) / this.tiempoViejo) * Number(this.tiempo);

    // Comprueba que se han introducido todos los datos
    if (tiempo === '' || this.idEjercicioNuevo === '' || tiempo === undefined || this.idEjercicioNuevo === undefined ) {
      this.#snackBar.open('Por favor, rellene todos los campos', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Hago la petición para editar el ejercicio realizado
    this.#ejercicioService.putEditarEjercicioRealizado(idUsuario, fecha, hora, this.idEjercicioSeleccionado, tiempo, this.idEjercicioNuevo, this.valorMet)
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.#dialog.closeAll();
          location.reload();
          this.#snackBar.open('Ejercicio actualizado correctamente', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        }else {
          this.#snackBar.open('No ha sido posible actualizar el ejercicio', '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
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

  openDialog() {
    this.#dialog.open(FormRealizarEjercicioComponent);
  }

  closeDialog() {
    this.#dialog.closeAll();
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
    if (opcion == "undefined") {
      this.textareaContent = 'Descripcion del ejercicio';
      this.grupoMuscular = 'Grupo muscuarl';
      this.valorMet = 'Valor Met';
      this.dificultad = 'Dificultad';
    } else {
      // console.log(opcion)
      this.#ejercicioService.postBusquedaNombre(opcion).subscribe((data: any) => {
        this.idEjercicioNuevo = data.respuesta[0].id;
        this.textareaContent = data.respuesta[0].descripcion;
        this.grupoMuscular = data.respuesta[0].grupoMuscular;
        this.valorMet = data.respuesta[0].valorMET;
        this.dificultad = data.respuesta[0].dificultad;
        this.tieneEnlaces = true;
        this.enlaces = data.respuesta[0].enlaces;
      });
    }
  }

  openDialogProponer() {
    this.#dialog.open(FormRealizarEjercicioComponent, {
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
