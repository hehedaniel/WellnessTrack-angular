import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistrodatosComponent } from './components/registrodatos/registrodatos.component';
import { FormularioTabsComponent } from './components/formulario-tabs/formulario-tabs.component';
import { ResumenAlimentosComponent } from './components/resumen-alimentos/resumen-alimentos.component';
import { TablaComidasComponent } from './components/tabla-comidas/tabla-comidas.component';
import { ComidasHomeComponent } from './components/comidas-home/comidas-home.component';
import { FormProponerAlimentoComponent } from './components/form-proponer-alimento/form-proponer-alimento.component';
import { FormProponerAlimentoNutrientesComponent } from './components/form-proponer-comida-nutrientes/form-proponer-alimento-nutrientes.component';
import { PesoGraficaComponent } from './components/peso-grafica/peso-grafica.component';
import { TablaPesosComponent } from './components/tabla-pesos/tabla-pesos.component';
import { PesosHomeComponent } from './components/pesos-home/pesos-home.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { VistaAlimentoComponent } from './components/vista-alimento/vista-alimento.component';
import { EjerciciosHomeComponent } from './components/ejercicios-home/ejercicios-home.component';
import { AdministrarEjerciciosPropuestosComponent } from './components/administrar-propuestas/administrar-propuestas.component';
import { PaginaErrorComponent } from './components/pagina-error/pagina-error.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'registrodatos', component: RegistrodatosComponent },
    { path: 'alimentos', component: ResumenAlimentosComponent },
    { path: 'comidas', component: ComidasHomeComponent },
    { path: 'peso', component: PesosHomeComponent },
    { path: 'login', component: FormularioTabsComponent },
    { path: 'perfil', component: UsuarioPerfilComponent },
    // { path: 'proponer-alimento', component: FormProponerAlimentoComponent },
    // { path: 'proponer-alimento-nutrientes', component: FormProponerAlimentoNutrientesComponent },
    { path: 'pesos', component: TablaPesosComponent },
    { path: 'alimento/:id', component: VistaAlimentoComponent },
    { path: 'ejercicios', component: EjerciciosHomeComponent },
    { path: 'administrar-propuestas', component: AdministrarEjerciciosPropuestosComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PaginaErrorComponent},
];
