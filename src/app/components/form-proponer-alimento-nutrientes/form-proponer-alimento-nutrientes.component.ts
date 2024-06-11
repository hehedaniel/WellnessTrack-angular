import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from "@angular/material/form-field";
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlimentosService } from '../../services/alimentos.service';
import { AlimentoProponerModel } from '../../models/alimento.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-proponer-alimento-nutrientes',
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
  templateUrl: './form-proponer-alimento-nutrientes.component.html',
  styleUrl: './form-proponer-alimento-nutrientes.component.css'
})
export class FormProponerAlimentoNutrientesComponent {

  #router: Router = inject(Router);
  #alimentoService: AlimentosService = inject(AlimentosService);
  #snackBar: MatSnackBar = inject(MatSnackBar);

  formularioProponerAlimento: FormGroup = new FormGroup({
    calorias: new FormControl('', [Validators.required]),
    proteinas: new FormControl('', [Validators.required]),
    azucares: new FormControl('', [Validators.required]),
    grasas: new FormControl('', [Validators.required]),
    vitaminas: new FormControl('', [Validators.required]),
    carbohidratos: new FormControl('', [Validators.required]),
  });


  alimentoNombre: string = '';
  alimentoCantidad: number = 0;
  alimentoMarca: string = '';
  alimentoDescripcion: string = '';
  alimentoImagen: string = '';

  hide = true;

  ngOnInit() {
    this.alimentoNombre = localStorage.getItem('nombre') ?? '';
    this.alimentoCantidad = parseInt(localStorage.getItem('cantidad') ?? '0', 10);
    this.alimentoMarca = localStorage.getItem('marca') ?? '';
    this.alimentoDescripcion = localStorage.getItem('descripcion') ?? '';
    this.alimentoImagen = localStorage.getItem('imagen') ?? '';
  }

  proponer(){

    let alimentoCrear = new AlimentoProponerModel(
      this.alimentoNombre,
      this.alimentoCantidad,
      this.alimentoMarca,
      this.alimentoDescripcion,
      this.alimentoImagen,
      this.formularioProponerAlimento.value.calorias,
      this.formularioProponerAlimento.value.proteinas,
      this.formularioProponerAlimento.value.grasas,
      this.formularioProponerAlimento.value.carbohidratos,
      this.formularioProponerAlimento.value.azucares,
      this.formularioProponerAlimento.value.vitaminas,
      '2'
    );

    console.log(alimentoCrear);


    this.#alimentoService.postProponerAlimento(alimentoCrear).subscribe((res: any) => {
      console.log(res);
      //Si la respuesta es correcta, redirijo a la pantalla de alimentos
      if (res.respuesta === 'El alimento ya existe') {
        alert('El alimento ya existe');
        this.#snackBar.open('Este alimento ya existe', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }else if (res.code == 200){
        this.#router.navigate(['alimentos']);
      }
    });
  }

}
