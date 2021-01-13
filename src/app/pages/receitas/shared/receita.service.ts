import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Receita } from './receita.model';
import { environment } from 'src/environments/environment';
import { ReceitaTotal } from './receita-total.model';
import { FiltrosReceita } from './filtros-receita.model';
import { PagedList } from 'src/app/shared/models/paged-list.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private apiPath: string = 'api/receitas';

  constructor(private http: HttpClient) {
    this.apiPath = environment.API_URL + this.apiPath;
  }

  // getAll(): Observable<Receita[]> {
  //   return this.http.get(this.apiPath).pipe(
  //     catchError(this.handleError),
  //     map(this.jsonDataToReceitas)
  //   );
  // }

  getById(id: string): Observable<Receita> {
    let url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToReceita)
    );
  }

  buscarReceitas(filtros: FiltrosReceita): Observable<PagedList<Receita>> {
    let url = `${this.apiPath}/buscar`;
    return this.http.get(url, { params: this.getParams(filtros) }).pipe(
      catchError(this.handleError),
      map(this.jsonDataToReceitas)
    );
  }

  obterTotais(filtros: FiltrosReceita): Observable<ReceitaTotal> {
    let url = `${this.apiPath}/totais`;
    return this.http.get(url, { params: this.getParams(filtros) }).pipe(
      catchError(this.handleError),
      map(this.jsonDataToReceitaTotal)
    );
  }

  private jsonDataToReceitaTotal(jsonDataToReceitaTotal: any): ReceitaTotal {
    return Object.assign(new ReceitaTotal(), jsonDataToReceitaTotal);
  }

  create(receita: Receita): Observable<Receita> {
    return this.http.post(this.apiPath, receita).pipe(
      catchError(this.handleError),
      map(this.jsonDataToReceita)
    );
  }

  update(receita: Receita): Observable<Receita> {
    let url = `${this.apiPath}/${receita.id}`;

    return this.http.put(url, receita).pipe(
      catchError(this.handleError),
      map(this.jsonDataToReceita)
    );
  }

  delete(id: string): Observable<any> {
    let url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  jsonDataToReceita(jsonDataToReceita: any): Receita {
    return Object.assign(new Receita(), jsonDataToReceita);
  }

  jsonDataToReceitas(jsonDataToReceitas: any): PagedList<Receita> {
    let receitas: Receita[] = [];
    let pagedList: PagedList<Receita> = new PagedList<Receita>();

    jsonDataToReceitas.items.forEach(e => receitas.push(Object.assign(new Receita(), e)));
    pagedList.Items = receitas;
    pagedList.TotalItems = jsonDataToReceitas.totalItems;
    pagedList.PageSize = jsonDataToReceitas.pageSize;

    return pagedList;
  }

  handleError(erro: any): Observable<any> {
    console.log("Erro na requisicao => ", erro)
    return throwError(erro);
  }

  getParams(objeto: any): HttpParams {
    let params = new HttpParams();
    Object.keys(objeto).forEach((key) => {
      if (objeto[key]) {
        if (objeto[key] instanceof Array) {
          objeto[key].forEach((element) => {
            params = params.append(key.toString(), element);
          });
        } else if (typeof objeto[key] === 'object') {
          Object.keys(objeto[key]).forEach((k) => {
            params = params.append(key.toString() + '.' + k.toString(), objeto[key][k]);
          });
        } else {
          params = params.set(key.toString(), objeto[key].toString());
        }
      }
    });
    return params;
  }

}
