import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
// import { AuthService } from '../../services/auth.service';
import { UsuarioRegistroModel } from '../../models/usuario.model';

@Component({
  selector: 'app-registrodatos',
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
  templateUrl: './registrodatos.component.html',
  styleUrl: './registrodatos.component.css'
})
export class RegistrodatosComponent {

  #authService: AuthService = inject(AuthService);
  #usuarioService: UsuarioService = inject(UsuarioService);
  #router: Router = inject(Router);

  formularioDatos: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required]),
    altura: new FormControl('', [Validators.required]),
  });

  registrarUsuario(){
    console.log(this.formularioDatos.value);

    //Obtener los datos del formulario guardadso en localStorage
    let correo = localStorage.getItem('correo');
    let contrasena = localStorage.getItem('contrasena');

    if(correo == null || contrasena == null){
      //Mostrar que falta el correo y la contraseña para su registro
      console.log('Falta el correo y la contraseña');
      this.#router.navigate(['/registro']);
    }else {
      //Registro completo con correo y contraseña
      this.#authService.fbRegistro(correo,contrasena);

      // Datos que se han de rellenar más tarde


      //Hago la peticion a la api para el registro completo
      let usuario = new UsuarioRegistroModel(
        this.formularioDatos.value.nombre,
        this.formularioDatos.value.apellidos,
        correo,
        this.formularioDatos.value.edad,
        this.formularioDatos.value.altura
      );
      // this.#usuarioService.postRegistro(usuario).subscribe((Respuesta) => {
      //   // if (data === 200) {
      //   //   this.#router.navigate(['/inicio']);
      //   // } else {
      //   //   console.log('Error:', data);
      //   // }
      //   console.log(Respuesta);
      // });

      this.#usuarioService.postRegistro(usuario).subscribe({
        // if (data === 200) {
        //   this.#router.navigate(['/inicio']);
        // } else {
        //   console.log('Error:', data);
        // }
        next: (Respuesta: {
          code: string;
          respuesta: Array<string>;
        } | {} ) => {
          if ('code' in Respuesta && Respuesta.code == '200'){
            console.log('Registro completado');
            this.#router.navigate(['/home']);
          }else {
            console.log('Error:', Respuesta);
          }
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });


    }




  }
}
