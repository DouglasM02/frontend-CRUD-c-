import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { FormularioDeAtualizacaoComponent } from './components/formulario-de-atualizacao/formulario-de-atualizacao.component';
import { FormularioDeCriacaoComponent } from './components/formulario-de-criacao/formulario-de-criacao.component';


@NgModule({
  declarations: [
    DepartamentosComponent,
    FormularioDeAtualizacaoComponent,
    FormularioDeCriacaoComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    FormsModule
  ]
})
export class DepartamentosModule { }
