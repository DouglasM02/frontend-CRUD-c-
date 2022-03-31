import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Funcionarios} from '../model/funcionarios'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private readonly baseURL: string = "https://localhost:7194/v1/funcionarios"

  constructor(private httpClient: HttpClient) { }

  public getFuncionarios(departamentId: number): Observable<Funcionarios[]> {
    return this.httpClient.get<Funcionarios[]>(`${this.baseURL}/${departamentId}`);
  }

  public getFuncionarioById(departamentId: number, id: number):Observable<Funcionarios> {
    return this.httpClient.get<Funcionarios>(`${this.baseURL}/${departamentId}/funcionario/${id}`)
  }

  public createFuncionario(departamentId: number, funcionario: Funcionarios): Observable<Funcionarios> {
    return this.httpClient.post<Funcionarios>(`${this.baseURL}/${departamentId}`,funcionario)
  }

  public saveFuncionarioAtt(departamentId: number, funcionario: Funcionarios): Observable<Funcionarios> {
    if(funcionario.id) {
      return this.httpClient.put<Funcionarios>(`${this.baseURL}/${departamentId}/funcionario/${funcionario.id}`, funcionario)
    }
    else {
      return of()
    }
  }

  public deleteFuncionario(departamentId: number, id:number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/${departamentId}/funcionario/${id}`);
  }

}
