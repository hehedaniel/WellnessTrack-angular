import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-editar-enlace-ejercicio',
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
  templateUrl: './form-editar-enlace-ejercicio.component.html',
  styleUrl: './form-editar-enlace-ejercicio.component.css'
})
export class FormEditarEnlaceEjercicioComponent {

  constructor(private dialogRef: MatDialogRef<FormEditarEnlaceEjercicioComponent>) {}
  
  #dialog: MatDialog = inject(MatDialog);
  #snacbar: MatSnackBar = inject(MatSnackBar);

  formEditarEnlace: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required]),
  });

  url: string = '';

  ngOnInit() {
    //Obtengo el enlace que se va a editar desde localStorage
    const enlace = localStorage.getItem('enlaceActual');
    if (enlace){
      this.url = JSON.parse(enlace).url;
    }
  }

  editarEnlace() {
    console.log(this.formEditarEnlace.value);
    //Compruebo si ha introducido un enlace o lo ha dejado en blanco
    if (this.formEditarEnlace.value["url"] === '') {
      console.log("No se ha introducido un enlace");
      localStorage.setItem('enlaceActual', 'por defecto');

    } else {
      console.log("Se ha introducido un enlace");
      localStorage.setItem('enlaceActual', this.formEditarEnlace.value["url"]);
    }
    this.dialogRef.close(); // Cierra unicamente este dialog
    //Muestro un snacbar indica que se ha editado el enlace
    this.#snacbar.open('Enlace editado', 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
  }

  closeDialog() {
    this.dialogRef.close(); // Cierra unicamente este dialog
  }
}
