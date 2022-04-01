import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Departamentos } from '../models/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}

  private readonly baseURL = "https://localhost:7194/v1/departamentos"

  constructor(private httpClient: HttpClient) { }

  public getDepartaments(): Observable<Departamentos[]> {
    return this.httpClient.get<Departamentos[]>(this.baseURL, {
      headers: this.header
    })
  }

  public getDepartamentById(id:number): Observable<Departamentos> {
      return this.httpClient.get<Departamentos>(`${this.baseURL}/${id}`,{
      headers: this.header
    })
  }

  public deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/${id}`, {
      headers: this.header
    });
  }

  public SaveDepartamentAtt(departamento: Departamentos): Observable<Departamentos> {
    if(departamento.id) {
      return this.httpClient.put<Departamentos>(`${this.baseURL}/${departamento.id}`,departamento,{
      headers: this.header
    });
    }
    else {
      return of();
    }

  }

  public CreateDepartament(departamento:Departamentos): Observable<Departamentos> {
    return this.httpClient.post<Departamentos>(this.baseURL, departamento,{
      headers: this.header
    });
  }

}
