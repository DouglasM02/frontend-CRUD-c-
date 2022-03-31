import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "departamentos"},
  {path:"departamentos", loadChildren: () => import('./modules/departamentos/departamentos.module').then(m => m.DepartamentosModule)},
  {path:"funcionarios", loadChildren: () => import('./modules/funcionarios/funcionarios.module').then(m => m.FuncionariosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
