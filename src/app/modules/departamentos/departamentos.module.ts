import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { FormularioDeAtualizacaoComponent } from './components/formulario-de-atualizacao/formulario-de-atualizacao.component';
import { FormularioDeCriacaoComponent } from './components/formulario-de-criacao/formulario-de-criacao.component';
import { DepartamentosRoutingModule } from './departamentos-routing.module';



@NgModule({
  declarations: [
    DepartamentosComponent,
    FormularioDeAtualizacaoComponent,
    FormularioDeCriacaoComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepartamentosModule { }
