import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../clientes/shared/cliente.service';
import { FiltrosSessao } from '../shared/filtros-sessao.model';

import { Sessao } from '../shared/sessao.model';
import { SessaoService } from '../shared/sessao.service';

export class ClienteOption {
  public label: string;
  public value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

@Component({
  selector: 'app-lista-sessoes',
  templateUrl: './lista-sessoes.component.html',
  styleUrls: ['./lista-sessoes.component.scss']
})
export class ListaSessoesComponent implements OnInit {

  sessoes: Sessao[] = [];
  quantidadeTotalDeItens: number;
  pageSize: number;
  buscaForm: FormGroup;
  clientes: ClienteOption[] = [];

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(private sessaoService: SessaoService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.obtenhaTodas(1);
    this.loadClientes();
    this.buildBuscaForm();
    this.submitBuscaForm(1);
  }
  private loadClientes(): any {
    this.clienteService.getAll(1, 500)
      .subscribe(pagedClientes => this.clientes = pagedClientes.Items.map(c => new ClienteOption(c.nome, c.id)));
  }

  submitBuscaForm(currentPagina: number) {
    let filtros: FiltrosSessao = this.mapearFiltro(currentPagina);
    this.buscarSessoes(filtros);
  }

  buscarSessoes(filtros: FiltrosSessao) {
    this.sessaoService.buscarSessoes(filtros).subscribe(
      pagedSessoes => {
        this.sessoes = pagedSessoes.Items;
        this.quantidadeTotalDeItens = pagedSessoes.TotalItems;
        this.pageSize = pagedSessoes.PageSize;
      },
      () => "Erro ao buscar as sessões"
    );
  }

  mapearFiltro(currentPagina: number): FiltrosSessao {
    let filtros: FiltrosSessao = Object.assign(new FiltrosSessao(), this.buscaForm.value);
    filtros.dataInicio = filtros.dataInicio.split("/").reverse().join("-");
    filtros.dataFim = filtros.dataFim.split("/").reverse().join("-");
    filtros.page = currentPagina;
    filtros.pageSize = 3;

    return filtros;
  }

  public obtenhaTodas(currentPage: number) {
    this.sessaoService.getAll(currentPage).subscribe(pagedSessoes => {
      this.sessoes = pagedSessoes.Items;
      this.quantidadeTotalDeItens = pagedSessoes.TotalItems;
      this.pageSize = pagedSessoes.PageSize;
    },
      error => alert("erro ao carregar lista"));
  }

  buildBuscaForm(): any {
    this.buscaForm = this.formBuilder.group({
      clienteId: ["00000000-0000-0000-0000-000000000000"],
      dataInicio: [this.obtenhaIncioDoMesCorrente(), [Validators.required]],
      dataFim: [this.obtenhaFimDoMesCorrente(), [Validators.required]],
    });
  }

  private obtenhaIncioDoMesCorrente() {
    let dateNow = new Date();

    return `01/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
  }

  private obtenhaFimDoMesCorrente() {
    let dateNow = new Date();
    let monthCurrent = dateNow.getMonth() + 1;
    let yearCurrent = dateNow.getFullYear();

    return `${new Date(yearCurrent, monthCurrent, 0).getDate()}/${monthCurrent}/${yearCurrent}`;
  }

  Remova(sessao: Sessao) {
    this.sessaoService.delete(sessao.id).subscribe(
      () => this.sessoes = this.sessoes.filter(sessaoAntigo => sessaoAntigo != sessao),
      () => "Erro ao excluir sessao"
    );
  }

}
