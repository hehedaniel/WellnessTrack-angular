import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-proponer-alimento',
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
  templateUrl: './form-proponer-alimento.component.html',
  styleUrl: './form-proponer-alimento.component.css'
})
export class FormProponerAlimentoComponent {

  #router: Router = inject(Router);
  #dialog: MatDialog = inject(MatDialog);
  #snackBar: MatSnackBar = inject(MatSnackBar);

  formularioProponerAlimento: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
  });

  hide = true;

  base64Image: string = '';

  proponer() {
    // console.log(this.formularioProponerAlimento.value);
    if (!this.formularioProponerAlimento.valid) {
      alert('Por favor rellene todos los campos');
      this.#snackBar.open('Por favor rellene todos los campos', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

    } else {
      //Aqui guardo los datos del formulario por separado en localstorage para avanzar a  la siguiente pantalla
      localStorage.setItem('nombre', this.formularioProponerAlimento.value.nombre);
      localStorage.setItem('cantidad', this.formularioProponerAlimento.value.cantidad);
      localStorage.setItem('marca', this.formularioProponerAlimento.value.marca);
      localStorage.setItem('descripcion', this.formularioProponerAlimento.value.descripcion);
      localStorage.setItem('imagen', this.base64Image);
      this.#router.navigate(['proponer-alimento-nutrientes']);
    }
  }

  subirImg(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // console.log(base64String);
        this.base64Image = base64String;
      };
    }
  }

  cancelar(){
    this.#dialog.closeAll();
  }
}
