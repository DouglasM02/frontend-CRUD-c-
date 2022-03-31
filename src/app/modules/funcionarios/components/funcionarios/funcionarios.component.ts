import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Funcionarios } from '../../model/funcionarios';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionarios[] = [];
  filteredFuncionarios: Funcionarios[] = [];
  departamentoId: number = 0;
  _filterBy: string = "";
  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService) {
    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))
    console.log(this.departamentoId)

    this.getAll();
  }

  ngOnInit(): void {
  }

  getAll() {
    this.funcionarioService.getFuncionarios(this.departamentoId).subscribe({
      next: datas => {
        this.funcionarios = datas
        this.filteredFuncionarios = this.funcionarios
      },
      error: err => console.log(err)
    })
  }

  delete(id:number) {
    this.funcionarioService.deleteFuncionario(this.departamentoId,id).subscribe({
      next: () => {console.log("Funcionário deletado com sucesso")
        this.getAll();
      },
      error: err => console.log(err)
    })
  }

  set filter(value: string) {
    this._filterBy = value;
    this.filteredFuncionarios = this.funcionarios.filter(funcionario=> funcionario.nome.toLowerCase().indexOf(this._filterBy.toLowerCase())> -1);
  }

  get filter() {
    return this._filterBy
  }

}
