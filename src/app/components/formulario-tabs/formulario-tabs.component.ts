import { Component, inject } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistroComponent } from "../registro/registro.component";
import { LoginComponent } from "../login/login.component";
// import { AuthService } from '../../services/auth.service';


@Component({
   selector: 'app-formulario-tabs',
   standalone: true,
   templateUrl: './formulario-tabs.component.html',
   styleUrl: './formulario-tabs.component.css',
   imports: [
      MatTabsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatLabel,
      MatFormField,
      MatInput,
      MatIcon,
      MatButton,
      RegistroComponent,
      LoginComponent
   ]
})
export class FormularioTabsComponent {

   activeTab: string = 'Iniciar sesión';

   // Servicios del componente
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);

   // Variables del componente
   formularioRegistro: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required]),
      contrasenarepeat: new FormControl('', [Validators.required])
   });

   // Variables del componente
   formularioLogin: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required])
   });

   hide = true;

   loggedIn: boolean = false; // Variable para saber si el usuario esta logeado

   ngOnInit() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            console.log('Usuario logeado, redirigiendo a perfil');
            this.loggedIn = true;
            this.#router.navigate(['/perfil']);
         } else {
            console.log('Usuario no logeado');
         }
      });
   }

   registrarUsuario() {
      console.log(this.formularioRegistro.value);
      // this.#authService.fbRegistro(this.formularioRegistro.value.correo,this.formularioRegistro.value.contrasena);

      // this.#router.navigate(['/home']);
      //Guardar los datos del formulario en localStorage
      localStorage.setItem('correo', this.formularioRegistro.value.correo);
      localStorage.setItem('contrasena', this.formularioRegistro.value.contrasena);
      this.#router.navigate(['/registrodatos']);
   }

   // Metodos del componente
   // loginUser() {
   //    console.log(this.formularioLogin.value);
   //    this.#authService.fbLogin(this.formularioLogin.value.correo, this.formularioLogin.value.contrasena);
   //    this.#router.navigate(['/perfil']);
   // }

}
