import { Component, OnInit } from '@angular/core';

import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';
import { FiltrosCliente } from '../shared/filtros-cliente.model';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  quantidadeTotalDeItens: number;
  pageSize: number;
  filtros: FiltrosCliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.obtenhaTodos(1);
    this.submitBuscaForm(1);
  }

  submitBuscaForm(currentPagina: number) {
    this.filtros = this.mapearFiltro(currentPagina);
    this.buscarClientes(this.filtros);
  }

  buscarClientes(filtros: FiltrosCliente) {
    this.clienteService.buscarClientes(filtros).subscribe(
      pagedClientes => {
        this.clientes = pagedClientes.Items;
        this.quantidadeTotalDeItens = pagedClientes.TotalItems;
        this.pageSize = pagedClientes.PageSize;
      },
      () => "Erro ao buscar os clientes"
    );
  }

  mapearFiltro(currentPagina: number): FiltrosCliente {
    let filtros: FiltrosCliente = new FiltrosCliente();
    filtros.page = currentPagina;
    filtros.pageSize = 3;

    return filtros;
  }

  public obtenhaTodos(page: number) {
    this.clienteService.getAll(page).subscribe(pagedClientes => {
      this.clientes = pagedClientes.Items;
      this.quantidadeTotalDeItens = pagedClientes.TotalItems;
      this.pageSize = pagedClientes.PageSize;
    },
      error => alert("erro ao carregar lista"));
  }

  public buscar(nomeCliente: string) {
    this.filtros.nomeCliente = nomeCliente;
    this.buscarClientes(this.filtros);
  }

  Remova(cliente: Cliente) {
    this.clienteService.delete(cliente.id).subscribe(
      () => this.clientes = this.clientes.filter(clienteAntigo => clienteAntigo != cliente),
      () => "Erro ao excluir cliente"
    );
  }

}
