import { Component, inject } from '@angular/core';
import { TablaComidasComponent } from "../tabla-comidas/tabla-comidas.component";
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, } from '@angular/material/dialog';
import { FormConsumirComponent } from '../form-consumir/form-consumir.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-comidas-home',
    standalone: true,
    templateUrl: './comidas-home.component.html',
    styleUrl: './comidas-home.component.css',
    imports: [FormConsumirComponent, TablaComidasComponent]
})
export class ComidasHomeComponent {

    #dialog: MatDialog = inject(MatDialog);
    #authService: AuthService = inject(AuthService);
    #router: Router = inject(Router);

    ngOnInit() {
        this.checkLogedIn();
    }

    openDialog() {
        this.#dialog.open(FormConsumirComponent);
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
}
