import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PesoService } from '../../services/peso.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
   selector: 'app-form-anadir-peso',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatFormField, MatInput, MatButton],
   providers: [provideNativeDateAdapter()],
   templateUrl: './form-anadir-peso.component.html',
   styleUrl: './form-anadir-peso.component.css',
})
export class FormAnadirPesoComponent {
   #dialog: MatDialog = inject(MatDialog);

   #pesoService: PesoService = inject(PesoService);

   formEditarPeso: FormGroup = new FormGroup({
      peso: new FormControl('', [Validators.required]),
   });

   hora: string = '';
   fecha: string = '';
   idUsuario: string = '';

   ngOnInit() {
      this.hora = new Date().toISOString().split('T')[1].split('.')[0];
      this.fecha = new Date().toISOString().split('T')[0];
      this.obtenerUsuario();
   }

   anadirPeso() {
      console.log(this.formEditarPeso.value);
      if (this.formEditarPeso.valid) {
         this.#pesoService.postAnadirPeso(this.idUsuario, this.fecha, this.hora, this.formEditarPeso.value.peso).subscribe((data: any) => {
            console.log(data);
            if (data.code === 201) {
               this.closeDialog();
               location.reload();
            }
         });
      }
   }

   closeDialog() {
      this.#dialog.closeAll();
   }

   obtenerUsuario() {
      this.idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
   }
}
