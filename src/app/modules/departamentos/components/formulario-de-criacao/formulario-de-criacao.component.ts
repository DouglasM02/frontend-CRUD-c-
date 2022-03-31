import { Component, OnInit } from '@angular/core';
import { Departamentos } from '../../models/departamentos';
import { DepartamentosService } from '../../services/departamentos.service';

@Component({
  selector: 'app-formulario-de-criacao',
  templateUrl: './formulario-de-criacao.component.html',
  styleUrls: ['./formulario-de-criacao.component.css']
})
export class FormularioDeCriacaoComponent implements OnInit {

  departamento$: Departamentos = {id:0,nome:"",sigla:""}

  constructor(private departamentServices: DepartamentosService ) { }

  ngOnInit(): void {
  }

  post(departamento: Departamentos) {
    return this.departamentServices.CreateDepartament(departamento).subscribe({
      next: departament => console.log(departament),
      error: err => console.log(err)
    })
  }

}
