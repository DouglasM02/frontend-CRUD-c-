import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Departamentos } from '../../models/departamentos';
import { DepartamentosService } from '../../services/departamentos.service';
@Component({
  //selector: 'app-formulario-de-atualizacao',
  templateUrl: './formulario-de-atualizacao.component.html',
  styleUrls: ['./formulario-de-atualizacao.component.css']
})
export class FormularioDeAtualizacaoComponent implements OnInit {

  departamentoId: number;
  departamento: Departamentos = {id: 0,nome:"",sigla:""};
  formAtt: FormGroup = new FormGroup({});
  error: string = "";
  hasError: string = "";

  constructor(private activatedRoute: ActivatedRoute, private departamentServices: DepartamentosService, private formBuilder: FormBuilder) {
    this.departamentoId = (Number (this.activatedRoute.snapshot.paramMap.get("id")));

    this.formAtt = this.formBuilder.group({
          nomeDepartamento:[this.departamento.nome,Validators.required],
          siglaDepartamento:[this.departamento.sigla,Validators.required]
    })

    this.departamentServices.getDepartamentById(this.departamentoId).subscribe(
      {
        next: departament => {
          this.departamento = departament
          this.formAtt.controls['nomeDepartamento'].setValue(this.departamento.nome)
          this.formAtt.controls['siglaDepartamento'].setValue(this.departamento.sigla)
        },
        error: err => console.log(err)
      }
    )


  }

  ngOnInit(): void {
  }

  save() : void {
    this.departamentServices.SaveDepartamentAtt(this.departamento).subscribe(
      {
        next: departament => console.log(departament),
        error: err => console.log(err)
      }
    )
  }

  validacoes() {
 if (this.formAtt.valid) {

      this.departamento.nome = this.formAtt.value.nomeDepartamento
      this.departamento.sigla = this.formAtt.value.siglaDepartamento.toUpperCase()
      if(this.departamento.sigla.length < 3) {
        this.errorMessage("A Sigla deve conter 3 caracteres","sigla")
        return;
      }

      this.save()

      return;
    }
    console.log("Formulário inválido");
  }

  errorMessage(err: string, formName: string) {
    this.error = err
    this.hasError = formName;
  }

}
