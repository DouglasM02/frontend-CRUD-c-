import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  formCadastroFunc: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService, private formBuilder: FormBuilder) {

    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))
    console.log(this.departamentoId)

    this.funcionario = {id:0,nome:"",foto: "",rg:0, departamentoId:this.departamentoId}

    this.formCadastroFunc = this.formBuilder.group({
      nome: ['', Validators.required],
      foto: [''],
      rg:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  post(funcionario: Funcionarios) {
    this.funcionarioService.createFuncionario(this.departamentoId,funcionario).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })
  }

  onChange(event: any) {
    console.log(event)

  }

  validacao() {

    let statusNome = false;
    let statusRg = false;

    if(this.formCadastroFunc.controls['nome'].value.match("[a-zA-Z]+") ) {
      //console.log("Nome ok")
      statusNome = true
    }

    if(this.formCadastroFunc.controls['rg'].value.length  == 9 && this.formCadastroFunc.controls['rg'].value.match("[0-9]+")) {
      //console.log("rg ok")
      statusRg = true
    }

    if(statusNome && statusRg){
      //console.log("tudo ok")
      this.funcionario = this.formCadastroFunc.value
      this.post(this.funcionario)
    }


    //if(this.funcionario.nome.match("[a-zA-Z]+") && this.funcionario.rg)

    //console.log(this.funcionario)
  }

}
