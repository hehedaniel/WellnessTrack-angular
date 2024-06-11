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
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  // Servicios del componente
  #authService: AuthService = inject(AuthService);
  #usuarioService: UsuarioService = inject(UsuarioService);
  #router: Router = inject(Router);
  #dialog: MatDialog = inject(MatDialog);
  #snackBar: MatSnackBar = inject(MatSnackBar);

  // Variables del componente
  formularioLogin: FormGroup = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    contrasena: new FormControl('', [Validators.required])
  });

  hide = true;

  loginUser() {
    // console.log(this.formularioLogin.value);
    if (this.formularioLogin.valid) {
      this.#authService.fbLogin(this.formularioLogin.value.correo, this.formularioLogin.value.contrasena).then((result) => {
        // console.log(result);
        if (!result){
          console.log('Usuario no logeado');
          // Mostrar pop up de error
          this.#snackBar.open('No ha sido posible iniciar sesión, compruebe los datos introducidos', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }else {
          console.log('Usuario logeado');
          this.#authService.fbUserEmail().then((email) => {
            console.log(email);
            this.#usuarioService.getUser(email).subscribe((usuario: any) => {
              console.log(usuario);
              if (usuario){
                console.log(usuario);
                localStorage.setItem('idUsuarioLogeado', usuario.respuesta.id);
                // this.#router.navigate(['/home']);
                this.#router.navigate(['/perfil']);
              }else {
                // console.log('Usuario no encontrado');
                this.#router.navigate(['/registro']);
              }
            });
          });
          this.#router.navigate(['/home']);
        }
      });
    }else {
      // Mostar pop up de error
      alert('Formulario invalido');
    }
  }

}