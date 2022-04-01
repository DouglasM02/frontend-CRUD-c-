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
  statusNome: boolean = false;
  statusRg: boolean = false;
  rgExists: boolean = false;
  message: string = "";

  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService, private formBuilder: FormBuilder) {

    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))

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
      next: data => {
        console.log(data)
        //this.funcionario.foto = data.toString()
      },
      error: err =>  {
        console.log(err)
        this.funcionario.foto = err.error.text
        this.post(this.funcionario)
      }

    })
  }

  findByRg(rg:number) {
    return this.funcionarioService.getFuncionarioByRg(rg).subscribe({
      next: data => {
         this.rgExists = true;
         this.message = "Rg já existe";
        console.log(data)
        //console.log("Rg já existe")
      },
      error: err => {
        console.log(err)
        this.rgExists = false;
        this.funcionario = this.formCadastroFunc.value
        const fd = new FormData()
        fd.append("files", this.imagemSelecionada, this.imagemSelecionada.name)
        this.imageInsert(fd);
        console.log("Ok")
      }
    });
  }

  validacao() {

    if(this.formCadastroFunc.controls['nome'].value.match("[a-zA-Z]+") ) {
      this.statusNome = true
    }

    if(this.formCadastroFunc.controls['rg'].value.length  == 9 && this.formCadastroFunc.controls['rg'].value.match("[0-9]+")) {
      this.statusRg = true
    }

    if(this.statusNome && this.statusRg){
      this.findByRg(this.formCadastroFunc.controls['rg'].value)

        //this.funcionario = this.formCadastroFunc.value
        //console.log("Ok")
        // const fd = new FormData()
        // fd.append("files", this.imagemSelecionada, this.imagemSelecionada.name)
        // this.imageInsert(fd);


    }
  }

}
