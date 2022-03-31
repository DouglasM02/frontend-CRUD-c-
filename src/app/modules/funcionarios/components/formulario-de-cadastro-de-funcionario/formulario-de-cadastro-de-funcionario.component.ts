import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionarios } from '../../model/funcionarios';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-formulario-de-cadastro-de-funcionario',
  templateUrl: './formulario-de-cadastro-de-funcionario.component.html',
  styleUrls: ['./formulario-de-cadastro-de-funcionario.component.css']
})
export class FormularioDeCadastroDeFuncionarioComponent implements OnInit {

  departamentoId: number = 0;
  funcionario: Funcionarios;

  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService) {
    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))
    console.log(this.departamentoId)

    this.funcionario = {id:0,nome:"",foto: "",rg:0, departamentoId:this.departamentoId}
  }

  ngOnInit(): void {
  }

  post(funcionario: Funcionarios) {
    this.funcionarioService.createFuncionario(this.departamentoId,funcionario).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })
  }

}
