import { Component, OnInit } from '@angular/core';

import { Sessao } from '../shared/sessao.model';
import { SessaoService } from '../shared/sessao.service';

@Component({
  selector: 'app-lista-sessoes',
  templateUrl: './lista-sessoes.component.html',
  styleUrls: ['./lista-sessoes.component.sass']
})
export class ListaSessoesComponent implements OnInit {

  sessoes: Sessao[] = [];
  quantidadeTotalDeItens: number;
  pageSize: number;

  constructor(private sessaoService: SessaoService) { }

  ngOnInit() {
    this.obtenhaTodas(1);
  }

  public obtenhaTodas(currentPage: number) {
    this.sessaoService.getAll(currentPage).subscribe(pagedSessoes => {
      this.sessoes = pagedSessoes.Items;
      this.quantidadeTotalDeItens = pagedSessoes.TotalItems;
      this.pageSize = pagedSessoes.PageSize;
    },
      error => alert("erro ao carregar lista"));
  }

  Remova(sessao: Sessao) {
    this.sessaoService.delete(sessao.id).subscribe(
      () => this.sessoes = this.sessoes.filter(sessaoAntigo => sessaoAntigo != sessao),
      () => "Erro ao excluir sessao"
    );
  }

}
