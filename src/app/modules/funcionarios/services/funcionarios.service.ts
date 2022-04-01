import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Funcionarios } from '../model/funcionarios';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}

  private readonly baseURL: string = "https://localhost:7194/v1/funcionarios"

  constructor(private httpClient: HttpClient) { }

  public getFuncionarios(departamentId: number): Observable<Funcionarios[]> {
    return this.httpClient.get<Funcionarios[]>(`${this.baseURL}/${departamentId}`, {
      headers: this.header
    });
  }

  public getFuncionarioById(departamentId: number, id: number):Observable<Funcionarios> {
    return this.httpClient.get<Funcionarios>(`${this.baseURL}/${departamentId}/funcionario/${id}`, {
      headers: this.header
    })
  }

  public getFuncionarioByRg(rg:number): Observable<Funcionarios> {
    return this.httpClient.get<Funcionarios>(`${this.baseURL}/rg/${rg}`, {
      headers: this.header
    })
  }

  public createFuncionario(departamentId: number, funcionario: Funcionarios): Observable<Funcionarios> {
    return this.httpClient.post<Funcionarios>(`${this.baseURL}/${departamentId}`,funcionario, {
      headers: this.header
    })
  }

  public saveFuncionarioAtt(departamentId: number, funcionario: Funcionarios): Observable<Funcionarios> {
    if(funcionario.id) {
      return this.httpClient.put<Funcionarios>(`${this.baseURL}/${departamentId}/funcionario/${funcionario.id}`, funcionario, {
      headers: this.header
    })
    }
    else {
      return of()
    }
  }

  public deleteFuncionario(departamentId: number, id:number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/${departamentId}/funcionario/${id}`, {
      headers: this.header
    });
  }

  public uploadImage(imgUrl: FormData) {
    return this.httpClient.post<FormData>(`${this.baseURL}/upload`,imgUrl)
  }

  public getImage(id: number) {
    return `${this.baseURL}/upload/${id}`
  }


}
