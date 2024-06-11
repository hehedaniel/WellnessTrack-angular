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
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-form-actualizar-datos-usuario',
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
  templateUrl: './form-actualizar-datos-usuario.component.html',
  styleUrl: './form-actualizar-datos-usuario.component.css'
})
export class FormActualizarDatosUsuarioComponent {

  #dialog: MatDialog = inject(MatDialog);
  #router: Router = inject(Router);
  #usuarioService: UsuarioService = inject(UsuarioService);

  formActualizarDato: FormGroup = new FormGroup({
    newValue : new FormControl('', [Validators.required]),
  });

  oldValue: string = '';
  propiedad: string = '';

  ngOnInit() {
    this.oldValue = localStorage.getItem('oldValue') ?? '';
    this.propiedad = localStorage.getItem('propiedad') ?? '';
  }

  actualizar(propiedadCambiar: string){
    console.log(this.formActualizarDato.value);
    if (this.formActualizarDato.valid){
      let idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
      let nombre = '';
      let apellidos = '';
      let altura = 0;
      let objetivo_opt = '';
      let objetivo_num = 0;
      // let correo = '';

      if (propiedadCambiar == "nombre"){
        nombre = this.formActualizarDato.value.newValue;
      }else {
        nombre = localStorage.getItem('nombre') ?? '';
      }

      if (propiedadCambiar == "apellidos"){
        apellidos = this.formActualizarDato.value.newValue;
      }else {
        apellidos = localStorage.getItem('apellidos') ?? '';
      }

      if (propiedadCambiar == "altura"){
        altura = this.formActualizarDato.value.newValue;
      }else {
        altura = parseFloat(localStorage.getItem('altura') ?? '0');

      }

      if (propiedadCambiar == "objetivo_opt"){
        objetivo_opt = this.formActualizarDato.value.newValue;
      }else {
        objetivo_opt = localStorage.getItem('objetivo') ?? '';

      }

      if (propiedadCambiar == "objetivo_num"){
        objetivo_num = this.formActualizarDato.value.newValue;
      }else {
        objetivo_num = parseFloat(localStorage.getItem('peso_objetivo') ?? '0');
      }
      // else if (propiedadCambiar == "correo"){
      //   localStorage.getItem('correo');
      // }

      this.#usuarioService.putEditarUsuario(idUsuario, nombre, apellidos, altura, objetivo_opt, objetivo_num)
        .subscribe((data: any) => {
          console.log(data);
          if (data.code === 200) {
            this.closeDialog();
            location.reload();
          }
        });

    }
  }

  closeDialog() {
    this.#dialog.closeAll();
  }


}
