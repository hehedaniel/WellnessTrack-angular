import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRealizarEjercicioComponent } from './form-realizar-ejercicio.component';

describe('FormRealizarEjercicioComponent', () => {
  let component: FormRealizarEjercicioComponent;
  let fixture: ComponentFixture<FormRealizarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRealizarEjercicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRealizarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
