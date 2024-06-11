import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PesoService } from '../../services/peso.service';


@Component({
  selector: 'app-form-delete-peso',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatIcon,
    MatButton,
  ],
  templateUrl: './form-delete-peso.component.html',
  styleUrl: './form-delete-peso.component.css'
})
export class FormDeletePesoComponent {

  #dialog: MatDialog = inject(MatDialog);

  #pesoService: PesoService = inject(PesoService);

  formDeletePeso: FormGroup = new FormGroup({
    peso: new FormControl('', [Validators.required]),
  });

  peso: string = '';
  hora: string = '';
  fecha: string = '';

  ngOnInit() {
    this.peso = localStorage.getItem('peso') ?? '';
    this.hora = localStorage.getItem('hora') ?? '';
    this.fecha = localStorage.getItem('fecha') ?? '';
  }

  deletePeso() {
    // this.#pesoService.deletePeso('2', this.fecha, this.hora).subscribe((data: any) => {
    //   console.log(data);
    //   if (data.code === 200) {
    //     this.closeDialog();
    //     location.reload();
    //   }
    // })
    this.#pesoService.encontrarPeso('2', this.fecha, this.hora, this.peso).subscribe((data: any) => {
      console.log(data);
      if (data.code === 200) {
        this.#pesoService.deletePeso(data.respuesta.id).subscribe((data: any) => {
          console.log(data);
          if (data.code === 200) {
            this.closeDialog();
            // location.reload();
          }
        });
      };
    });
  }


  closeDialog() {
    this.#dialog.closeAll();
  }
}
