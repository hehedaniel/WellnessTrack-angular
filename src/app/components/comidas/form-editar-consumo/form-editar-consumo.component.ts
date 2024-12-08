import { Component, inject, Inject, OnInit } from '@angular/core';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlimentosService } from '../../../services/alimentos.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

export interface AlimentoRecibido {
   nombre: string;
   tipo: string;
}

@Component({
   selector: 'app-form-editar-consumo',
   standalone: true,
   imports: [
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      MatButtonModule,
      FloatLabelModule,
      ImageModule,
      InputNumberModule,
      AutoCompleteModule,
      SpinnerMostrarComponent,
   ],
   providers: [provideNativeDateAdapter()],
   templateUrl: './form-editar-consumo.component.html',
   styleUrls: ['./form-editar-consumo.component.css'],
})
export class FormEditarConsumoComponent implements OnInit {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

   #dialog: MatDialog = inject(MatDialog);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #dialogRef: DialogRef = inject(DialogRef);

   #alimentoService: AlimentosService = inject(AlimentosService);

   myControl = new FormControl('');
   options: string[] = ['Escriba el nombre del alimento'];
   //Array con los alimentos que se han encontrado
   opcionesAlimentos: AlimentoRecibido[] = [];
   opcionesAlimentosNombre: any;

   // Campos del formulario
   descripcion: string = '';
   instrucciones: string = '';
   imagen: string = '';
   marca: string = '';
   cantidad: string = '';
   calorias: string = '';
   proteinas: string = '';
   grasas: string = '';
   carbohidratos: string = '';
   azucares: string = '';
   // vitaminas: string = '';
   cantidadAlimento: string = '';

   //Para saber si se modificado
   cantidadInicial: string = '';
   nombreInicial: string = '';

   receta: boolean = false;

   comidaSeleccionada: string = '';
   base64Image: string = './assets/icons/noImgBlack36.svg';
   imgPreview: boolean = false;

   //Datos recibidos por el componenet padre
   fecha: string = '';
   hora: string = '';
   nombreAlimento: string = '';

   // Para saber cuando se esta realizando la peticion
   guardandoConsumo: boolean = false;

   cantidadDisable: boolean = true;
   dataNutrientes: any;

   recetaInfoDisponible: boolean = false;

   ngOnInit(): void {
      //Recojo los datos mediante data mandados desde el componente padre
      // console.log(this.data);
      this.nombreAlimento = this.data.nombre;
      this.nombreInicial = this.data.nombre;
      this.hora = this.data.hora;
      this.fecha = this.data.fecha;

      //Comrpuebo que sean correctos
      if (this.nombreAlimento == '' || this.hora == '' || this.nombreAlimento == undefined || this.hora == undefined) {
         console.log('Error al recibir los datos');
         this.#dialogRef.close();
         this.#snackBar.open('Error al recibir los datos', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }

      this.fetchData();
   }

   fetchData() {
      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         this.#dialogRef.close();
         console.log('No se ha podido obtener el id del usuario');
         this.#snackBar.open('No ha sido posible realizar esta acción', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
         });
         return;
      }

      //Hago la peticion para saber la informacion del consumo y del alimento
      this.#alimentoService.postConsumoDiarioEspecifico(idUsuario, this.fecha, this.hora).subscribe((data: any) => {
         if (data.respuesta === 'No se encontró dicho consumo.') {
            console.log('No se ha encontrado el consumo');
            this.#dialogRef.close();
            this.#snackBar.open('No se ha encontrado el consumo', '', {
               duration: 3000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
               panelClass: ['error-snackbar'],
            });
            return;
         } else {
            console.log(data.respuesta);
            this.cantidad = data.respuesta[0].cantidad;
            this.cantidadInicial = data.respuesta[0].cantidad;
            this.descripcion = data.respuesta[0].descripcion;
            this.imagen = data.respuesta[0].imagen;
            this.imgPreview = true;

            this.calorias = data.respuesta[0].nutrientes.calorias;
            this.proteinas = data.respuesta[0].nutrientes.proteinas;
            this.grasas = data.respuesta[0].nutrientes.grasas;
            this.carbohidratos = data.respuesta[0].nutrientes.carbohidratos;
            this.azucares = data.respuesta[0].nutrientes.azucares;

            if (data.respuesta[0].marca == undefined) {
               this.receta = true;
               this.instrucciones = data.respuesta[0].instrucciones;
            } else {
               this.receta = false;
               this.marca = data.respuesta[0].marca;
            }

            this.recetaInfoDisponible = true;
         }
      });

      if (this.receta) {
         this.#alimentoService.getBusquedaReceta(this.nombreAlimento).subscribe((data: any) => {
            this.cantidadAlimento = data.respuesta[0].cantidadFinal
         });
      } else {
         this.#alimentoService.getBusquedaNombre(this.nombreAlimento).subscribe((data: any) => {
            this.cantidadAlimento = data.respuesta[0].cantidad
         });
      }
   }

   guardarConsumo() {
      if (this.cantidad == this.cantidadInicial && this.nombreAlimento == this.nombreInicial) {
         console.log('No se ha modificado la cantidad');
         this.#snackBar.open('No se han realizado modificaciones', '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else {
         this.#alimentoService
            .editarConsumoDiario(
               this.nombreAlimento,
               this.nombreInicial,
               this.fecha,
               this.hora,
               localStorage.getItem('idUsuarioLogeado') || '',
               this.cantidad + ''
            )
            .subscribe((data: any) => {
               if (data.code == 200) {
                  console.log('Consumo editado correctamente');
                  location.reload();
                  this.#dialogRef.close();
                  this.#snackBar.open('Consumo ediado correctamente', '', {
                     duration: 3000,
                     horizontalPosition: 'center',
                     verticalPosition: 'top',
                     panelClass: ['success-snackbar'],
                  });
               } else {
                  console.log('Error al editar el consumo');
                  this.#snackBar.open('Fallo al guardar, revise los datos y vuela a intentarlo', '', {
                     duration: 4000,
                     horizontalPosition: 'center',
                     verticalPosition: 'top',
                     panelClass: ['error-snackbar'],
                  });
               }
            });
      }
   }

   onInputChange(event: string): void {
      this.#alimentoService.getBusquedaNombre(event).subscribe((data: any) => {
         console.log(data.respuesta);
         let alimentosRecibidos: AlimentoRecibido[] = [];
         let alimentosRecibidosNombre = [];
         if (data.respuesta === 'No se ha encontrado el alimento') {
            alimentosRecibidos.push({ nombre: 'No se encontraron resultados, propón el tuyo!', tipo: 'no-encontrado' });
         } else {
            for (const alimento of data.respuesta) {
               // alimentosRecibidos.push(alimento.nombre);
               // Distingo entre alimentos y recetas segun si tienen marca o no
               if (alimento.marca == undefined) {
                  //Guardo el nombre y el tipo
                  console.log(alimento.nombre);
                  console.log(alimento.marca);

                  alimentosRecibidos.push({ nombre: alimento.nombre, tipo: 'receta' });
                  alimentosRecibidosNombre.push(alimento.nombre);
               } else {
                  alimentosRecibidos.push({ nombre: alimento.nombre, tipo: 'alimento' });
                  alimentosRecibidosNombre.push(alimento.nombre);
               }
            }
         }
         this.opcionesAlimentos = alimentosRecibidos;
         this.opcionesAlimentosNombre = alimentosRecibidosNombre;
      });
   }

   mostrar(opcion: any) {
      // console.log(opcion);

      // Busco en el array de alimentos recibidos el alimento seleccionado
      opcion = this.opcionesAlimentos.find((alimento) => alimento.nombre === opcion);
      // Esta funcion muestra la informacion del alimento seleccionado
      if (opcion == undefined) {
      } else {
         // Compruebo si es una receta o un alimento
         if (opcion.tipo == 'receta') {
            this.#alimentoService.getBusquedaReceta(opcion.nombre).subscribe((data: any) => {
               this.receta = true;
               this.imgPreview = true;
               this.descripcion = data.respuesta[0].descripcion;
               this.comidaSeleccionada = data.respuesta[0].nombre;
               this.base64Image = data.respuesta[0].imagen;
               this.instrucciones = data.respuesta[0].instrucciones;
               this.calorias = data.respuesta[0].calorias;
               this.proteinas = data.respuesta[0].proteinas;
               this.grasas = data.respuesta[0].grasas;
               this.carbohidratos = data.respuesta[0].carbohidratos;
               this.azucares = data.respuesta[0].azucares;

               //me guardo el data para usarlo al itrnoducir una cantidad
               this.dataNutrientes = data.respuesta[0];
            });
         } else {
            this.#alimentoService.getBusquedaNombre(opcion.nombre).subscribe((data: any) => {
               this.imgPreview = true;
               this.receta = false;
               this.descripcion = data.respuesta[0].descripcion;
               this.comidaSeleccionada = data.respuesta[0].nombre;
               this.base64Image = data.respuesta[0].imagen;
               this.marca = data.respuesta[0].marca;
               this.calorias = data.respuesta[0].calorias;
               this.proteinas = data.respuesta[0].proteinas;
               this.grasas = data.respuesta[0].grasas;
               this.carbohidratos = data.respuesta[0].carbohidratos;
               this.azucares = data.respuesta[0].azucares;

               //me guardo el data para usarlo al itrnoducir una cantidad
               this.dataNutrientes = data.respuesta[0];
            });
         }
      }
   }

   calcularDatos(cantidad: string){
      
      if (cantidad === '' || parseInt(cantidad) < 1) {
         this.#snackBar.open('Cantidad introducida no válida', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      } else {
         console.log(this.dataNutrientes);

         if (this.receta) {
            const cantidadNum_Receta = parseFloat(cantidad) / parseFloat(this.cantidadAlimento);
            
            this.proteinas = Math.round(parseFloat(this.dataNutrientes.proteinas) * cantidadNum_Receta * 100) / 100 + '';
            this.grasas = Math.round(parseFloat(this.dataNutrientes.grasas) * cantidadNum_Receta * 100) / 100 + '';
            this.carbohidratos = Math.round(parseFloat(this.dataNutrientes.carbohidratos) * cantidadNum_Receta * 100) / 100 + '';
            this.azucares = Math.round(parseFloat(this.dataNutrientes.azucares) * cantidadNum_Receta * 100) / 100 + '';
            this.calorias = Math.round(parseFloat(this.calorias) * cantidadNum_Receta * 100) / 100 + '';

         } else {
            const cantidadNum_Alimento = parseFloat(cantidad) / parseFloat(this.cantidadAlimento);
            this.proteinas = Math.round(parseFloat(this.proteinas) * cantidadNum_Alimento * 100) / 100 + '';
            this.grasas = Math.round(parseFloat(this.grasas) * cantidadNum_Alimento * 100) / 100 + '';
            this.carbohidratos = Math.round(parseFloat(this.carbohidratos) * cantidadNum_Alimento * 100) / 100 + '';
            this.azucares = Math.round(parseFloat(this.azucares) * cantidadNum_Alimento * 100) / 100 + '';
            this.calorias = Math.round(parseFloat(this.calorias) * cantidadNum_Alimento * 100) / 100 + '';
         }
      }
   }

   closeDialog() {
      this.#dialogRef.close();
   }

   obtenerFecha(): string {
      const date = new Date();
      return date.toISOString().split('T')[0];
   }
}
