import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

// PrimeNG Modules
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';

// Services
import { AuthService } from '../services/auth.service';
import { AlimentosService } from '../services/alimentos.service';
import { EjerciciosRealizadosService } from '../services/ejercicios.service';
import { PesoService } from '../services/peso.service';
import { UsuarioService } from '../services/usuario.service';

// Components
import { SpinnerMostrarComponent } from '../components/spinner-mostrar/spinner-mostrar.component';
import { FormProponerAlimentoNutrientesComponent } from '../components/form-proponer-comida-nutrientes/form-proponer-alimento-nutrientes.component';
import { FormProponerEjercicioComponent } from '../components/form-proponer-ejercicio/form-proponer-ejercicio.component';
import { FormRealizarEjercicioComponent, Enlace } from '../components/form-realizar-ejercicio/form-realizar-ejercicio.component';
import { FormAdministrarEjercicioPropuestoComponent } from '../components/form-administrar-ejercicio-propuesto/form-administrar-ejercicio-propuesto.component';
import { TablaEjerciciosComponent } from '../components/tabla-ejercicios/tabla-ejercicios.component';
import { SwitchProponerComidaComponent } from '../components/switch-proponer-comida/switch-proponer-comida.component';
import { AdministrarEjerciciosPropuestosComponent } from '../components/administrar-propuestas/administrar-propuestas.component';
import { FormEditarEnlaceEjercicioComponent } from '../components/form-editar-enlace-ejercicio/form-editar-enlace-ejercicio.component';
import { FormConsumirComponent } from '../components/form-consumir/form-consumir.component';
import { FormAdministrarRecetaPropuestaComponent } from '../components/form-administrar-receta-propuesta/form-administrar-receta-propuesta.component';
import { FormAdministrarAlimentoPropuestoComponent } from '../components/form-administrar-alimento-propuesto/form-administrar-alimento-propuesto.component';
import { TablaComidasComponent } from '../components/tabla-comidas/tabla-comidas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerMostrarComponent,
    FormProponerAlimentoNutrientesComponent,
    FormProponerEjercicioComponent,
    FormRealizarEjercicioComponent,
    FormAdministrarEjercicioPropuestoComponent,
    TablaEjerciciosComponent,
    SwitchProponerComidaComponent,
    AdministrarEjerciciosPropuestosComponent,
    FormEditarEnlaceEjercicioComponent,
    FormConsumirComponent,
    FormAdministrarRecetaPropuestaComponent,
    FormAdministrarAlimentoPropuestoComponent,
    TablaComidasComponent,

    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatDialogModule,

    // PrimeNG
    FloatLabelModule,
    ImageModule,
    InputNumberModule,
    AccordionModule,
    AutoCompleteModule,
  ],
  exports: [
    // Export Angular Material Modules
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatDialogModule,

    // Export PrimeNG Modules
    FloatLabelModule,
    ImageModule,
    InputNumberModule,
    AccordionModule,
    AutoCompleteModule,

    // Export Components
    SpinnerMostrarComponent,
    FormProponerAlimentoNutrientesComponent,
    FormProponerEjercicioComponent,
    FormRealizarEjercicioComponent,
    FormAdministrarEjercicioPropuestoComponent,
    TablaEjerciciosComponent,
    SwitchProponerComidaComponent,
    AdministrarEjerciciosPropuestosComponent,
    FormEditarEnlaceEjercicioComponent,
    FormConsumirComponent,
    FormAdministrarRecetaPropuestaComponent,
    FormAdministrarAlimentoPropuestoComponent,
    TablaComidasComponent
  ],
  providers: [
    AuthService,
    AlimentosService,
    EjerciciosRealizadosService,
    PesoService,
    UsuarioService
  ]
})
export class SharedModule { }
