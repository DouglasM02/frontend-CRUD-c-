import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeCadastroDeFuncionarioComponent } from './formulario-de-cadastro-de-funcionario.component';

describe('FormularioDeCadastroDeFuncionarioComponent', () => {
  let component: FormularioDeCadastroDeFuncionarioComponent;
  let fixture: ComponentFixture<FormularioDeCadastroDeFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDeCadastroDeFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDeCadastroDeFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
