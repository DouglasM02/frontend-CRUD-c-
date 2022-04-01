import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Departamentos } from '../../models/departamentos';
import { DepartamentosService } from '../../services/departamentos.service';
@Component({
  selector: 'app-formulario-de-criacao',
  templateUrl: './formulario-de-criacao.component.html',
  styleUrls: ['./formulario-de-criacao.component.css']
})
export class FormularioDeCriacaoComponent implements OnInit {

  departamento: Departamentos = {id:0,nome:"",sigla:""}

  formCadastro: FormGroup;

  hasError: string = "";
  error : string = "";

  constructor(private departamentServices: DepartamentosService, private formBuilder: FormBuilder ) {
      this.formCadastro = this.formBuilder.group({
        nomeDepartamento:['', Validators.required],
        siglaDepartamento:['', Validators.required]
      })
   }

  ngOnInit(): void {
  }

  post(departamento: Departamentos) {
    return this.departamentServices.CreateDepartament(departamento).subscribe({
      next: departament => console.log(departament),
      error: err => console.log(err)
    })
  }

  validacoes() {
    if (this.formCadastro.valid) {

      this.departamento.nome = this.formCadastro.value.nomeDepartamento
      this.departamento.sigla = this.formCadastro.value.siglaDepartamento.toUpperCase()

      if(this.departamento.sigla.length < 3) {
        this.errorMessage("A Sigla deve conter 3 caracteres","sigla")
        return;
      }

      this.post(this.departamento)

      return;
    }
    console.log("Formulário inválido");
  }

  errorMessage(err: string, formName: string) {
    this.error = err
    this.hasError = formName;
  }

}
