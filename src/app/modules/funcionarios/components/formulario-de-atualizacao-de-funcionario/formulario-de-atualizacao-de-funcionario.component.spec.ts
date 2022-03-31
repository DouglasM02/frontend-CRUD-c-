import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeAtualizacaoDeFuncionarioComponent } from './formulario-de-atualizacao-de-funcionario.component';

describe('FormularioDeAtualizacaoDeFuncionarioComponent', () => {
  let component: FormularioDeAtualizacaoDeFuncionarioComponent;
  let fixture: ComponentFixture<FormularioDeAtualizacaoDeFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDeAtualizacaoDeFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDeAtualizacaoDeFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
