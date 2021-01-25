import { Component, OnInit } from '@angular/core';

import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.sass']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  quantidadeTotalDeItens: number;
  pageSize: number;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.obtenhaTodos(1);
  }

  public obtenhaTodos(page: number) {
    this.clienteService.getAll(page).subscribe(pagedClientes => {
      this.clientes = pagedClientes.Items;
      this.quantidadeTotalDeItens = pagedClientes.TotalItems;
      this.pageSize = pagedClientes.PageSize;
    },
      error => alert("erro ao carregar lista"));
  }

  Remova(cliente: Cliente) {
    this.clienteService.delete(cliente.id).subscribe(
      () => this.clientes = this.clientes.filter(clienteAntigo => clienteAntigo != cliente),
      () => "Erro ao excluir cliente"
    );
  }

}
