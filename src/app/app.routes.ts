import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
import { RegistrodatosComponent } from './components/usuario/registrodatos/registrodatos.component';
import { FormularioTabsComponent } from './components/formulario-tabs/formulario-tabs.component';
import { ResumenAlimentosComponent } from './components/comidas/resumen-alimentos/resumen-alimentos.component';
import { TablaComidasComponent } from './components/comidas/tabla-comidas/tabla-comidas.component';
import { ComidasHomeComponent } from './components/comidas/comidas-home/comidas-home.component';
import { FormProponerAlimentoComponent } from './components/comidas/form-proponer-alimento/form-proponer-alimento.component';
import { FormProponerAlimentoNutrientesComponent } from './components/comidas/form-proponer-comida-nutrientes/form-proponer-alimento-nutrientes.component';
import { PesoGraficaComponent } from './components/pesos/peso-grafica/peso-grafica.component';
import { TablaPesosComponent } from './components/pesos/tabla-pesos/tabla-pesos.component';
import { PesosHomeComponent } from './components/pesos/pesos-home/pesos-home.component';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil/usuario-perfil.component';
import { VistaAlimentoComponent } from './components/comidas/vista-alimento/vista-alimento.component';
import { EjerciciosHomeComponent } from './components/ejercicios/ejercicios-home/ejercicios-home.component';
import { AdministrarEjerciciosPropuestosComponent } from './components/administrar-propuestas/administrar-propuestas.component';
import { PaginaErrorComponent } from './components/pesos/pagina-error/pagina-error.component';

export const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'registrodatos', component: RegistrodatosComponent },
   { path: 'alimentos', component: ResumenAlimentosComponent },
   { path: 'comidas', component: ComidasHomeComponent },
   { path: 'peso', component: PesosHomeComponent },
   { path: 'login', component: FormularioTabsComponent },
   { path: 'perfil', component: UsuarioPerfilComponent },
   { path: 'pesos', component: TablaPesosComponent },
   { path: 'alimento/:id', component: VistaAlimentoComponent },
   { path: 'ejercicios', component: EjerciciosHomeComponent },
   { path: 'administrar-propuestas', component: AdministrarEjerciciosPropuestosComponent },
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: '**', component: PaginaErrorComponent },
];

// { path: 'proponer-alimento', component: FormProponerAlimentoComponent },
// { path: 'proponer-alimento-nutrientes', component: FormProponerAlimentoNutrientesComponent },
// { path: 'login', component: LoginComponent },
