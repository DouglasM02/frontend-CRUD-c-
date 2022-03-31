import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { FormularioDeAtualizacaoComponent } from './components/formulario-de-atualizacao/formulario-de-atualizacao.component';
import { FormularioDeCriacaoComponent } from './components/formulario-de-criacao/formulario-de-criacao.component';

const routes: Routes = [
  {path: "", component:DepartamentosComponent},
  {path:"atualiza/:id", component:FormularioDeAtualizacaoComponent},
  {path:"criar", component: FormularioDeCriacaoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
