import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departamentos } from 'src/app/modules/departamentos/models/departamentos';
import { DepartamentosService } from 'src/app/modules/departamentos/services/departamentos.service';
import { Funcionarios } from '../../model/funcionarios';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-formulario-de-atualizacao-de-funcionario',
  templateUrl: './formulario-de-atualizacao-de-funcionario.component.html',
  styleUrls: ['./formulario-de-atualizacao-de-funcionario.component.css']
})
export class FormularioDeAtualizacaoDeFuncionarioComponent implements OnInit {

  departamentoId: number = 0;
  funcionarioId: number = 0;
  funcionario: Funcionarios;
  departamentos: Departamentos[] = [];
  departaments: any

  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService, private departamentServices: DepartamentosService) {
    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))
    console.log(this.departamentoId)

    this.funcionarioId = (Number(this.activatedRoute.snapshot.paramMap.get("id")));

    this.funcionario = {id:0,nome:"",foto:"",rg:0, departamentoId:this.departamentoId}

    this.departaments = new FormGroup({
      depart: new FormControl()
    })

    this.getById();

    this.getDepartaments()


   }

  ngOnInit(): void {
  }

  getById() {
    return this.funcionarioService.getFuncionarioById(this.departamentoId,this.funcionarioId).subscribe({
      next: data => this.funcionario = data,
      error: err => console.log(err)
    })
  }

  getDepartaments() {
    this.departamentServices.getDepartaments().subscribe({
      next: datas => this.departamentos = datas,
      error: err => console.log(err)
    })
  }

  save(): void {
    this.funcionarioService.saveFuncionarioAtt(this.departamentoId,this.funcionario).subscribe({
      next: funcionario => console.log(funcionario),
      error: err => console.log(err)
    })

  }

}
