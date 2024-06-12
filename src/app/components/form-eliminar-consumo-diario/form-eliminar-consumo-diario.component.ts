import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlimentosService } from '../../services/alimentos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatFormFieldModule, MatLabel, MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-eliminar-consumo-diario',
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
  templateUrl: './form-eliminar-consumo-diario.component.html',
  styleUrl: './form-eliminar-consumo-diario.component.css'
})
export class FormEliminarConsumoDiarioComponent {

  #dialog: MatDialog = inject(MatDialog);

  #alimentoService: AlimentosService = inject(AlimentosService);

  formDeleteConsumoDiario: FormGroup = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    comida: new FormControl('', [Validators.required]),
    calorias: new FormControl('', [Validators.required]),
  });

  fecha: string = '';
  hora: string = '';
  comida: string = '';
  calorias: string = '';
  idUsuario: string = '';

  ngOnInit() {
    this.fecha = localStorage.getItem('fecha') ?? '';
    this.hora = localStorage.getItem('hora') ?? '';
    this.comida = localStorage.getItem('comida') ?? '';
    this.calorias = localStorage.getItem('calorias') ?? '';
    this.obtenerUsuario();
  }

  deleteConsumoDiario(){
    console.log("delete");

    const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';

    this.#alimentoService.deleteConsumoDiario(this.comida, this.fecha, this.hora, idUsuario).subscribe((data: any) => {
      console.log(data);
      if (data.code === 200) {
        this.closeDialog();
        location.reload();
      }
    });
  }

  closeDialog() {
    this.#dialog.closeAll();
  }

  obtenerUsuario(){
    this.idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
  }
}
