import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioDeAtualizacaoDeFuncionarioComponent } from './components/formulario-de-atualizacao-de-funcionario/formulario-de-atualizacao-de-funcionario.component';
import { FormularioDeCadastroDeFuncionarioComponent } from './components/formulario-de-cadastro-de-funcionario/formulario-de-cadastro-de-funcionario.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';



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
