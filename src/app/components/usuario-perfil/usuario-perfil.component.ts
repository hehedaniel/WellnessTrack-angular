import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormActualizarDatosUsuarioComponent } from '../form-actualizar-datos-usuario/form-actualizar-datos-usuario.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './usuario-perfil.component.html',
  styleUrl: './usuario-perfil.component.css'
})
export class UsuarioPerfilComponent {

  #usuarioService: UsuarioService = inject(UsuarioService);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #dialog: MatDialog = inject(MatDialog);
  #snackBar: MatSnackBar = inject(MatSnackBar);

  userNombre: string = '';
  userApellidos: string = '';
  userEmail: string = '';
  correoVerificado: boolean = false;

  userAltura: number = 0;
  userObjetivo: string = '';
  userPesoObjetivo: number = 0;

  ngOnInit() {
    console.log('Pagina de perfil de usuario');
    this.checkLogedIn();
    console.log(this.userEmail);

    this.#authService.fbIsUserVerified().then((verified) => {
      this.correoVerificado = verified;
      console.log(verified);

    });
  }

  checkLogedIn() {
    this.#authService.fbUserEmail().then((email) => {
      if (email !== null) {
        console.log('Usuario logeado');
        this.userEmail = email;
        console.log(email);
        this.recogerDatosUsuario(email);

      } else {
        console.log('Usuario no logeado');
        this.#router.navigate(['/login']);
      }
    });
  }

  recogerDatosUsuario(email: string) {
    // Llamar al servicio de usuario para recoger los datos del usuario
    console.log('Recogiendo datos del usuario');
    console.log(email);

    this.#usuarioService.getUser(this.userEmail).subscribe((usuario: any) => {
      if (usuario) {
        console.log(usuario);
        this.userNombre = usuario.respuesta.nombre;
        this.userApellidos = usuario.respuesta.apellidos;
        this.userAltura = usuario.respuesta.altura;
        this.userObjetivo = usuario.respuesta.objetivo_opt;
        this.userPesoObjetivo = usuario.respuesta.objetivo_num;
        // this.correoVerificado = usuario.respuesta.correo_v;
        // console.log(usuario.respuesta.correo_v);

        // Guardo los datos del usuario en el local storage
        localStorage.setItem('nombre', this.userNombre);
        localStorage.setItem('apellidos', this.userApellidos);
        localStorage.setItem('altura', this.userAltura.toString());
        localStorage.setItem('objetivo', this.userObjetivo);
        localStorage.setItem('peso_objetivo', this.userPesoObjetivo.toString());

      } else {
        this.#router.navigate(['/login']);
      }
    });
  }

  editarValor(valorViejo: any, propiedad: string) {
    console.log('Editando propiedad: ' + valorViejo);

    localStorage.setItem('oldValue', valorViejo);
    localStorage.setItem('propiedad', propiedad);

    this.#dialog.open(FormActualizarDatosUsuarioComponent);
  }

  verificarEmail(valorViejo: any, propiedad: string) {
    this.#authService.fbSendVerificationEmail().then(() => {
      console.log('Email de verificación enviado');
      this.#snackBar.open('Email de verificación enviado', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    })
  };

  cerrarSesion() {
    this.#authService.fbLogout().then(() => {
      console.log('Cerrando sesión');
      localStorage.clear();
      location.reload();
    });
  }
}
