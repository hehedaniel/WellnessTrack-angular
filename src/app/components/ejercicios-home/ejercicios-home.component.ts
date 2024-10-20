import { Component, inject } from '@angular/core';
import { TablaComidasComponent } from "../tabla-comidas/tabla-comidas.component";
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, } from '@angular/material/dialog';
import { FormConsumirComponent } from '../form-consumir/form-consumir.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TablaEjerciciosComponent } from '../tabla-ejercicios/tabla-ejercicios.component';
import { FormRealizarEjercicioComponent } from '../form-realizar-ejercicio/form-realizar-ejercicio.component';
import { UsuarioService } from '../../services/usuario.service';
import { FormProponerEjercicioComponent } from '../form-proponer-ejercicio/form-proponer-ejercicio.component';

@Component({
  selector: 'app-ejercicios-home',
  standalone: true,
  imports: [
    TablaEjerciciosComponent,
    FormRealizarEjercicioComponent
  ],
  templateUrl: './ejercicios-home.component.html',
  styleUrl: './ejercicios-home.component.css',
})
export class EjerciciosHomeComponent {

  ruta = 'http://localhost:8000';
  #dialog: MatDialog = inject(MatDialog);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #usuarioService: UsuarioService = inject(UsuarioService);

  ngOnInit() {
    this.checkLogedIn();
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
    this.#dialog.open(FormRealizarEjercicioComponent, {
      width: '50%',
      height: 'auto',
      maxHeight: '90vh',  // Para evitar que el diálogo se expanda demasiado verticalmente
    });
  }

  openDialogProponer(){
    this.#dialog.open(FormProponerEjercicioComponent, {
      width: '50%',
      height: 'auto',
      maxHeight: '90vh',  // Para evitar que el diálogo se expanda demasiado verticalmente
    });
  }

}
