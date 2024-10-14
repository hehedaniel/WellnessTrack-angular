import { Component, inject } from '@angular/core';
import { TablaComidasComponent } from "../tabla-comidas/tabla-comidas.component";
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, } from '@angular/material/dialog';
import { FormConsumirComponent } from '../form-consumir/form-consumir.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TablaEjerciciosComponent } from '../tabla-ejercicios/tabla-ejercicios.component';
import { FormRealizarEjercicioComponent } from '../form-realizar-ejercicio/form-realizar-ejercicio.component';

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

  #dialog: MatDialog = inject(MatDialog);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);

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
    this.#dialog.open(FormRealizarEjercicioComponent);
  }

}
