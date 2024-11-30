import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
   selector: 'app-login',
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
      FormsModule,
      InputGroupModule,
      InputGroupAddonModule,
      InputTextModule,
      PasswordModule,
   ],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css',
})
export class LoginComponent {
   // Servicios del componente
   #authService: AuthService = inject(AuthService);
   #usuarioService: UsuarioService = inject(UsuarioService);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   // Variables del componente
   formularioLogin: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required]),
   });

   hide = true;
   passwordVisible = false;
   mosrtarControles = false;

   loginUser() {
      if (this.validarLogin('correo') && this.validarLogin('contrasena')) {
      }
   }

   validarLogin(campoValidar: string) {
      const control = this.formularioLogin.get(campoValidar);

      if (control?.invalid) {
         console.error(`El campo "${campoValidar}" tiene errores:`);

         const errors = control.errors || {};
         console.log(errors);

         if (errors['required']) {
            console.error(`- El campo "${campoValidar}" es obligatorio.`);
         }
         if (campoValidar === 'correo' && errors['pattern']) {
            console.error(`- El campo "correo" debe tener un formato válido (ejemplo: usuario@dominio.com).`);
         }
      } else {
         console.log(`El campo "${campoValidar}" es válido.`);
         return true;
      }
      return false;
   }

   togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
   }

   escribiendoContrasena() {
      this.mosrtarControles = true;
   }
}
