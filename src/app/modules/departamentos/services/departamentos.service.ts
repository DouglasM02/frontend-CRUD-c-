import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { first, Observable, of, tap } from 'rxjs';
import { Departamentos } from '../models/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private readonly baseURL = "https://localhost:7194/v1/departamentos"

  constructor(private httpClient: HttpClient) { }

  public getDepartaments(): Observable<Departamentos[]> {
    return this.httpClient.get<Departamentos[]>(this.baseURL)
  }

  public getDepartamentById(id:number): Observable<Departamentos> {
      return this.httpClient.get<Departamentos>(`${this.baseURL}/${id}`)
  }

  public deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/${id}`);
  }

  public SaveDepartamentAtt(departamento: Departamentos): Observable<Departamentos> {
    if(departamento.id) {
      return this.httpClient.put<Departamentos>(`${this.baseURL}/${departamento.id}`,departamento);
    }
    else {
      return of();
    }

  }

  public CreateDepartament(departamento:Departamentos): Observable<Departamentos> {
    return this.httpClient.post<Departamentos>(this.baseURL, departamento);
  }

}
