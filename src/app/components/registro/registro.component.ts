import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-registro',
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
   templateUrl: './registro.component.html',
   styleUrl: './registro.component.css'
})
export class RegistroComponent {

   // Servicios del componente
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);

   // Variables del componente
   formularioRegistro: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required]),
      contrasenarepeat: new FormControl('', [Validators.required])
   });

   hide = true;

   registrarUsuario(){
      console.log(this.formularioRegistro.value);
      // this.#authService.fbRegistro(this.formularioRegistro.value.correo,this.formularioRegistro.value.contrasena);

      // this.#router.navigate(['/home']);
      //Guardar los datos del formulario en localStorage
      localStorage.setItem('correo', this.formularioRegistro.value.correo);
      localStorage.setItem('contrasena', this.formularioRegistro.value.contrasena);
      this.#router.navigate(['/registrodatos']);

   }
}
