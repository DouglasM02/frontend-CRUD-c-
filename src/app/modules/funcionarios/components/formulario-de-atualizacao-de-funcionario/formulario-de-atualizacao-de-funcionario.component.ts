import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departamentos } from 'src/app/modules/departamentos/models/departamentos';
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
  formAttFunc: FormGroup;
  imagemSelecionada: any = "";
  statusNome: boolean = false;
  statusRg: boolean = false;
  rgExists: boolean = false;
  message: string = "";

  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService, private formBuilder:FormBuilder) {
    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))
    console.log(this.departamentoId)

    this.funcionarioId = (Number(this.activatedRoute.snapshot.paramMap.get("id")));

    this.funcionario = {id:0,nome:"",foto:"",rg:0, departamentoId:this.departamentoId}


    this.formAttFunc = this.formBuilder.group({
      nome:[''],
      foto:[''],
      rg:['']
    })

    this.getById();

   }

  ngOnInit(): void {
  }

  getById() {
    return this.funcionarioService.getFuncionarioById(this.departamentoId,this.funcionarioId).subscribe({
      next: data => {

        this.funcionario = data

        this.formAttFunc.controls['nome'].setValue(this.funcionario.nome)
        this.formAttFunc.controls['rg'].setValue(this.funcionario.rg)
      },
      error: err => console.log(err)
    })
  }

  findByRg(rg:number) {
    return this.funcionarioService.getFuncionarioByRg(rg).subscribe({
      next: data => {
         this.rgExists = true;
         this.message = "Rg já existe";
        console.log(data)

      },
      error: err => {
        console.log(err)
        this.rgExists = false;
        this.funcionario.nome = this.formAttFunc.controls['nome'].value
        this.funcionario.rg = this.formAttFunc.controls['rg'].value
        const fd = new FormData()
        fd.append("files", this.imagemSelecionada, this.imagemSelecionada.name)
        this.imageInsert(fd);
      }
    });
  }

  validacao() {

    if(this.formAttFunc.controls['nome'].value.match("[a-zA-Z]+")) {
      console.log("Nome ok");
      this.statusNome = true;
    }

    if(this.formAttFunc.controls['rg'].value.toString().length == 9 && this.formAttFunc.controls['rg'].value.toString().match("[0-9]+")){
      console.log("Rg ok")
      this.statusRg = true;
    }

    if(this.statusNome && this.statusRg) {
      console.log("ok")
      this.funcionario.nome = this.formAttFunc.controls['nome'].value
      this.funcionario.rg = this.formAttFunc.controls['rg'].value
      this.findByRg(this.funcionario.rg)

    }


  }

  onChange(event: any) {
    this.imagemSelecionada = <File>event.target.files[0];

  }

  imageInsert(file: FormData) {
    this.funcionarioService.uploadImage(file).subscribe({
      next: data => {
        console.log(data)
      },
      error: err =>  {
        this.funcionario.foto = err.error.text
        this.save()
      }

    })
  }
  save() {
    this.funcionarioService.saveFuncionarioAtt(this.departamentoId, this.funcionario).subscribe({
      next: funcionario => console.log(funcionario),
      error: err => console.log(err)
    })

  }

}
