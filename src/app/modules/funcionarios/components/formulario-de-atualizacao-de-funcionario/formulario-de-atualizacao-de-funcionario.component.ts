import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  formAttFunc: FormGroup;
  imagemSelecionada: any = "";
  //formGetDepartamentos: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private funcionarioService: FuncionariosService, private departamentServices: DepartamentosService, private formBuilder:FormBuilder) {
    this.departamentoId = (Number(this.activatedRoute.snapshot.paramMap.get("departamentoId")))
    console.log(this.departamentoId)

    this.funcionarioId = (Number(this.activatedRoute.snapshot.paramMap.get("id")));

    this.funcionario = {id:0,nome:"",foto:"",rg:0, departamentoId:this.departamentoId}


    this.formAttFunc = this.formBuilder.group({
      nome:[''],
      foto:[''],
      rg:['']
    })

    // this.formGetDepartamentos = this.formBuilder.group({
    //   getDepartamentos:[this.funcionarioId]
    // })

    this.getById();

    //this.getDepartaments()


   }

  ngOnInit(): void {
  }

  getById() {
    return this.funcionarioService.getFuncionarioById(this.departamentoId,this.funcionarioId).subscribe({
      next: data => {

        this.funcionario = data

        this.formAttFunc.controls['nome'].setValue(this.funcionario.nome)
        //this.formAttFunc.controls['foto'].setValue(this.funcionario.foto)
        this.formAttFunc.controls['rg'].setValue(this.funcionario.rg)
      },
      error: err => console.log(err)
    })
  }

  // getDepartaments() {
  //   this.departamentServices.getDepartaments().subscribe({
  //     next: datas => this.departamentos = datas,
  //     error: err => console.log(err)
  //   })
  // }

  validacao() {
    let statusNome = false;
    let statusRg = false;

    //console.log(this.formAttFunc.value)

    if(this.formAttFunc.controls['nome'].value.match("[a-zA-Z]+")) {
      console.log("Nome ok");
      statusNome = true;
      //console.log(this.formGetDepartamentos.controls['getDepartamentos'].value)
    }

    if(this.formAttFunc.controls['rg'].value.length == 9 && this.formAttFunc.controls['rg'].value.match("[0-9]+")){
      console.log("Rg ok")
      statusRg = true;
    }

    if(statusNome && statusRg) {
      this.funcionario.nome = this.formAttFunc.controls['nome'].value
      this.funcionario.rg = this.formAttFunc.controls['rg'].value
      const fd = new FormData()
      fd.append("files", this.imagemSelecionada, this.imagemSelecionada.name)
      this.imageInsert(fd);
      //console.log("tudo Ok")
      //this.save()
    }


  }

  onChange(event: any) {
    this.imagemSelecionada = <File>event.target.files[0];

  }

  imageInsert(file: FormData) {
    this.funcionarioService.uploadImage(file).subscribe({
      next: data => console.log(data),
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
