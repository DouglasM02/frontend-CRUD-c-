import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioDeAtualizacaoDeFuncionarioComponent } from './components/formulario-de-atualizacao-de-funcionario/formulario-de-atualizacao-de-funcionario.component';
import { FormularioDeCadastroDeFuncionarioComponent } from './components/formulario-de-cadastro-de-funcionario/formulario-de-cadastro-de-funcionario.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';

const routes: Routes = [
  {path: ":departamentoId", component: FuncionariosComponent},
  {path: ":departamentoId/criar", component: FormularioDeCadastroDeFuncionarioComponent},
  {path: ":departamentoId/atualiza/:id", component: FormularioDeAtualizacaoDeFuncionarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
