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
import { TablaComidasComponent } from "../tabla-comidas/tabla-comidas.component";
import { TablaEjerciciosComponent } from "../tabla-ejercicios/tabla-ejercicios.component";

@Component({
    selector: 'app-tabs-comida-ejercicio',
    standalone: true,
    templateUrl: './tabs-comida-ejercicio.component.html',
    styleUrl: './tabs-comida-ejercicio.component.css',
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
        LoginComponent,
        TablaComidasComponent,
        TablaEjerciciosComponent
    ]
})
export class TabsComidaEjercicioComponent {

  activeTab: string = 'Iniciar sesión';

}
