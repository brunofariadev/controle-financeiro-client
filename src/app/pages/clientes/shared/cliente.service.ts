import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Cliente } from './cliente.model';
import { environment } from 'src/environments/environment';
import { PagedList } from 'src/app/shared/models/paged-list.model';
import { FiltrosCliente } from './filtros-cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiPath: string = 'api/clientes';

  constructor(private http: HttpClient) {
    this.apiPath = environment.API_URL + this.apiPath;
  }

  getAll(page: number = 1, pageSize: number = 3): Observable<PagedList<Cliente>> {
    let url = `${this.apiPath}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToClientes)
    );
  }

  buscarClientes(filtros: FiltrosCliente): Observable<PagedList<Cliente>> {
    let url = `${this.apiPath}/buscar`;
    return this.http.get(url, { params: this.getParams(filtros) }).pipe(
      catchError(this.handleError),
      map(this.jsonDataToClientes)
    );
  }

  getById(id: string): Observable<Cliente> {
    let url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCliente)
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.apiPath, cliente).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCliente)
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    let url = `${this.apiPath}/${cliente.id}`;

    return this.http.put(url, cliente).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCliente)
    );
  }

  delete(id: string): Observable<any> {
    let url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  jsonDataToCliente(jsonDataToCliente: any): Cliente {
    return jsonDataToCliente as Cliente;
  }

  jsonDataToClientes(jsonDataToClientes: any): PagedList<Cliente> {
    let clientes: Cliente[] = [];
    let pagedList: PagedList<Cliente> = new PagedList<Cliente>();

    jsonDataToClientes.items.forEach(e => clientes.push(e as Cliente));
    pagedList.Items = clientes;
    pagedList.TotalItems = jsonDataToClientes.totalItems;
    pagedList.PageSize = jsonDataToClientes.pageSize;

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
