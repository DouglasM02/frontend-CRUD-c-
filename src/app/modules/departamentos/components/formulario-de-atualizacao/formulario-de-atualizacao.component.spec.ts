import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeAtualizacaoComponent } from './formulario-de-atualizacao.component';

describe('FormularioDeAtualizacaoComponent', () => {
  let component: FormularioDeAtualizacaoComponent;
  let fixture: ComponentFixture<FormularioDeAtualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDeAtualizacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDeAtualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
