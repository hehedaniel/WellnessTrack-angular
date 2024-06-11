import { Component, inject } from '@angular/core';

// Import para la grafica
import { ChartModule } from 'primeng/chart';
import { AlimentosService } from '../../services/alimentos.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-resumen-alimentos',
  standalone: true,
  imports: [
    ChartModule,
    NgxChartsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './resumen-alimentos.component.html',
  styleUrl: './resumen-alimentos.component.css'
})
export class ResumenAlimentosComponent {

  options: any;

  $fecha: string = '';

  #alimentoService: AlimentosService = inject(AlimentosService);

  view: [number, number] = [450, 220];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  single: any[] = [];

  datos: boolean = false;

  fecha: string = new Date().toISOString().split('T')[0];
  // fecha : string = '2024-06-08'; // Para pruebas

  ngOnInit() {

    if (this.checkLogin() && localStorage.getItem('idUsuarioLogeado') !== null) {
      this.fetchData();
      Object.assign(this, this.single);
    } else {
      // Object.assign(this, this.single);
    }

  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  checkLogin(): boolean {
    // Se comprueba que exista en localStorage el valor del id del usuario
    if (localStorage.getItem('idUsuarioLogeado') === null) {
      console.log('Sin logearse');
      return false;
    } else {
      console.log('Logeado');
      return true;
    }
  }

  fetchData(): any {
    const newData = [
      { name: 'Azúcares', value: 0 },
      { name: 'Carbohidratos', value: 0 },
      { name: 'Grasas', value: 0 },
      { name: 'Calorías', value: 0 },
      { name: 'Proteínas', value: 0 },
      { name: 'Vitaminas', value: 0 }
    ];

    this.#alimentoService.getConsumoDiario(localStorage.getItem('idUsuarioLogeado'), this.fecha, this.fecha)
      .subscribe((data: any) => {
        if (data.respuesta === "No se encontraron entradas en las fechas indicadas.") {
          this.datos = false;
          console.log('No se encontraron entradas en las fechas indicadas.');
        } else {
          this.datos = true;
          data.respuesta.forEach((respuesta: any) => {
            // console.log(typeof newData[0].value);
            newData[0].value = parseFloat((newData[0].value + parseFloat(respuesta.nutrientes.azucares)).toFixed(2));
            newData[1].value = parseFloat((newData[1].value + parseFloat(respuesta.nutrientes.carbohidratos)).toFixed(2));
            newData[2].value = parseFloat((newData[2].value + parseFloat(respuesta.nutrientes.grasas)).toFixed(2));
            newData[3].value = parseFloat((newData[3].value + parseFloat(respuesta.nutrientes.calorias)).toFixed(2));
            newData[4].value = parseFloat((newData[4].value + parseFloat(respuesta.nutrientes.proteinas)).toFixed(2));
            newData[5].value = parseFloat((newData[5].value + parseFloat(respuesta.nutrientes.vitaminas)).toFixed(2));
          });

          this.single = newData;
        }
      });
  }

}
