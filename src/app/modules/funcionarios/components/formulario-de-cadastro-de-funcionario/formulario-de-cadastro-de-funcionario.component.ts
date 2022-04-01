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
  imagemSelecionada: any = null;


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
    this.imagemSelecionada = <File>event.target.files[0];

  }

  imageInsert(file: FormData) {
    this.funcionarioService.uploadImage(file).subscribe({
      next: data => console.log(data),
      error: err =>  {
        this.funcionario.foto = err.error.text
        this.post(this.funcionario)
      }

    })
  }

  validacao() {

    let statusNome = false;
    let statusRg = false;

    if(this.formCadastroFunc.controls['nome'].value.match("[a-zA-Z]+") ) {
      statusNome = true
    }

    if(this.formCadastroFunc.controls['rg'].value.length  == 9 && this.formCadastroFunc.controls['rg'].value.match("[0-9]+")) {
      statusRg = true
    }

    if(statusNome && statusRg){
      this.funcionario = this.formCadastroFunc.value
      const fd = new FormData()
      fd.append("files", this.imagemSelecionada, this.imagemSelecionada.name)
      this.imageInsert(fd);
    }
  }

}
