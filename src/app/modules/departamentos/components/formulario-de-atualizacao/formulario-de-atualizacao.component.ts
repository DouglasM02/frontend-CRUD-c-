import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { catchError, first, Observable, of } from 'rxjs';
import { Departamentos } from '../../models/departamentos';
import { DepartamentosService } from '../../services/departamentos.service';
@Component({
  //selector: 'app-formulario-de-atualizacao',
  templateUrl: './formulario-de-atualizacao.component.html',
  styleUrls: ['./formulario-de-atualizacao.component.css']
})
export class FormularioDeAtualizacaoComponent implements OnInit {

  departamentoId: number;
  departamento$: Departamentos = {id: 0,nome:"",sigla:""};

  constructor(private activatedRoute: ActivatedRoute, private departamentServices: DepartamentosService) {
    this.departamentoId = (Number (this.activatedRoute.snapshot.paramMap.get("id")));

    this.departamentServices.getDepartamentById(this.departamentoId).subscribe(
      {
        next: departament => this.departamento$ = departament,
        error: err => console.log(err)
      }
    )
  }

  ngOnInit(): void {
  }

  save() : void {
    this.departamentServices.SaveDepartamentAtt(this.departamento$).subscribe(
      {
        next: departament => console.log(departament),
        error: err => console.log(err)
      }
    )
  }

}
