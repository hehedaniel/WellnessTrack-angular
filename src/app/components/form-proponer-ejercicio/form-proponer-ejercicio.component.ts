import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjerciciosRealizadosService } from '../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormEditarEnlaceEjercicioComponent } from '../form-editar-enlace-ejercicio/form-editar-enlace-ejercicio.component';

@Component({
  selector: 'app-form-proponer-ejercicio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatIcon,
    MatButton,
  ],
  templateUrl: './form-proponer-ejercicio.component.html',
  styleUrl: './form-proponer-ejercicio.component.css'
})
export class FormProponerEjercicioComponent {

  constructor(private dialogRef: MatDialogRef<FormEditarEnlaceEjercicioComponent>) {}

  ruta = 'http://localhost:8000';
  #dialog: MatDialog = inject(MatDialog);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #usuarioService: UsuarioService = inject(UsuarioService);
  #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);

  formProponerEjercicio: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    dificultad: new FormControl('', [Validators.required]),
    grupoMuscular: new FormControl('', [Validators.required]),
    valorMet: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    instrucciones: new FormControl('', [Validators.required]),
    // enlaces: this.fb.array([])
  });

  nombre: string = '';
  dificultad: string = '';
  descripcion: string = '';
  grupoMuscular: string = '';
  valorMet: string = '';
  instrucciones: string = '';
  // Lista de enlaces y nuevo enlace
  enlaces: {
    numero: string,
    titulo: string,
    url: string
  }[] = [
      {
        numero: "1",
        titulo: 'Enlace 1',
        url: 'https://www.example.com/video1'
      },
      {
        numero: "2",
        titulo: 'Enlace 2',
        url: 'https://www.example.com/video2'
      }
    ];

  // Método para editar un enlace (puedes mejorarlo para abrir un modal, por ejemplo)
  editarEnlace(numero: string, enlace: any) {
    const enlaceActual = this.enlaces.find(e => e.numero === numero);
    if (enlaceActual) {
      localStorage.setItem('enlaceActual', JSON.stringify(enlaceActual));
      //Ahora mediante el numero de enlace, obtengo el enlace actual
      const dialogEditarEnlae = this.#dialog.open(FormEditarEnlaceEjercicioComponent, {
        width: '30%',
        height: '40%',
        maxHeight: '100vh',
      });

      dialogEditarEnlae.afterClosed().subscribe(result => {
        //Obtengo el enlace que se ha editado
        // console.log(localStorage.getItem('enlaceActual'));
        //Lo guardo en la lista de enlaces
        if (localStorage.getItem("enlaceActual") !== 'por defecto') {
          enlaceActual.url = localStorage.getItem("enlaceActual") || '';
        }
      });
    } else {
      console.log('No se ha encontrado el enlace');
    }
  }

  // Método para enviar la propuesta
  enviarPropuestaEjercicio() {

    //Primero obtengo el id del usuario logeado
    const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
    if (idUsuario === '') {
        console.log('No se ha podido obtener el id del usuario');
        return;
    }

    //Ahora obtengo todos los datos del formulario
    this.nombre = this.formProponerEjercicio.get('nombre')?.value;
    this.dificultad = this.formProponerEjercicio.get('dificultad')?.value;
    this.descripcion = this.formProponerEjercicio.get('descripcion')?.value;
    this.grupoMuscular = this.formProponerEjercicio.get('grupoMuscular')?.value;
    this.valorMet = this.formProponerEjercicio.get('valorMet')?.value;
    this.instrucciones = this.formProponerEjercicio.get('instrucciones')?.value;
    const enlace1 = this.enlaces[0].url;
    const enlace2 = this.enlaces[1].url;

    //Ahora hacemos la peticion al backend
    this.#ejercicioService.postProponerEjercicio(this.nombre, this.dificultad, this.grupoMuscular, this.valorMet, this.descripcion, this.instrucciones, idUsuario, enlace1, enlace2)
      .subscribe((data: any) => {
        console.log(data);
        if (data.code === 200) {
          this.#dialog.closeAll();
          this.#snackBar.open('Ejercicio propuesto correctamente', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        }else{
          this.#snackBar.open('Ha habido un error al proponer el ejercicio', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
