import { Component, OnInit } from '@angular/core';
import { Departamentos } from '../../models/departamentos';
import { DepartamentosService } from '../../services/departamentos.service';
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos$: Departamentos[] = [];
  _filterBy: string = "";
  filteredDepartaments$: Departamentos[] = [];

  constructor(private departamentServices: DepartamentosService) {
      this.getAll();

   }

  ngOnInit(): void {
  }

   set filter(value:string) {
     this._filterBy = value;

    this.filteredDepartaments$ = this.departamentos$.filter(departamento => departamento.nome.toLowerCase().indexOf(this._filterBy.toLowerCase())> -1)
   }

   get filter() {
     return this._filterBy;
   }

   getAll(): void {
      this.departamentServices.getDepartaments().subscribe({
            next: datas=> {
            this.departamentos$ = datas
            this.filteredDepartaments$ = this.departamentos$
          },
        error: err => console.log(err)
      })
   }

   delete(id: number) {
     this.departamentServices.deleteById(id).subscribe({
       next: () => {
         console.log("Deletado com sucesso")
         this.getAll();
       },
       error: err => console.log(err)
     })
   }


}
