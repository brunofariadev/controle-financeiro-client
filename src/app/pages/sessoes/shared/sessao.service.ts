import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Sessao } from './sessao.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private apiPath: string = 'api/sessoes';

  constructor(private http: HttpClient) { 
    this.apiPath = environment.API_URL + this.apiPath;
  }

  getAll(): Observable<Sessao[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToSessaos)
    );
  }

  getById(id: string): Observable<Sessao> {
    let url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToSessao)
    );
  }

  create(sessao: Sessao): Observable<Sessao> {
    return this.http.post(this.apiPath, sessao).pipe(
      catchError(this.handleError),
      map(this.jsonDataToSessao)
    );
  }

  update(sessao: Sessao): Observable<Sessao> {
    let url = `${this.apiPath}/${sessao.id}`;

    return this.http.put(url, sessao).pipe(
      catchError(this.handleError),
      map(this.jsonDataToSessao)
    );
  }

  delete(id: string): Observable<any> {
    let url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  jsonDataToSessao(jsonDataToSessao: any): Sessao {
    return Object.assign(new Sessao(), jsonDataToSessao);
  }

  jsonDataToSessaos(jsonDataToSessaos: any[]): Sessao[] {
    let sessoes: Sessao[] = [];

    jsonDataToSessaos.forEach(e => sessoes.push(Object.assign(new Sessao(), e)));

    return sessoes;
  }

  handleError(erro: any): Observable<any> {
    console.log("Erro na requisicao => ", erro)
    return throwError(erro);
  }

}
