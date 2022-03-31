import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeCriacaoComponent } from './formulario-de-criacao.component';

describe('FormularioDeCriacaoComponent', () => {
  let component: FormularioDeCriacaoComponent;
  let fixture: ComponentFixture<FormularioDeCriacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDeCriacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDeCriacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
