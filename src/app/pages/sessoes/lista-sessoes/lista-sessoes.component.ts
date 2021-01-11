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

  constructor(private sessaoService: SessaoService) { }

  ngOnInit() {
    this.sessaoService.getAll().subscribe(sessoes => {
      this.sessoes = sessoes;
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
