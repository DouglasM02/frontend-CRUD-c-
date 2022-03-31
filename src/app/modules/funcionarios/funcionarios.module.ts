import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { FormularioDeCadastroDeFuncionarioComponent } from './components/formulario-de-cadastro-de-funcionario/formulario-de-cadastro-de-funcionario.component';
import { FormularioDeAtualizacaoDeFuncionarioComponent } from './components/formulario-de-atualizacao-de-funcionario/formulario-de-atualizacao-de-funcionario.component';


@NgModule({
  declarations: [
    FuncionariosComponent,
    FormularioDeCadastroDeFuncionarioComponent,
    FormularioDeAtualizacaoDeFuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FuncionariosModule { }
