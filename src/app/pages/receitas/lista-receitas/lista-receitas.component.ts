import { Component, OnInit } from '@angular/core';

import { Receita } from '../shared/receita.model';
import { ReceitaService } from '../shared/receita.service';
import { SessaoService } from '../../sessoes/shared/sessao.service';
import { ClienteService } from '../../clientes/shared/cliente.service';
import { Cliente } from '../../clientes/shared/cliente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilOptions } from '../../../shared/util.options';
import { FiltrosReceita } from '../shared/filtros-receita.model';
import { ReceitaTotal } from '../shared/receita-total.model';

interface City {
  label: string,
  value: string
}

@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.scss']
})
export class ListaReceitasComponent implements OnInit {

  receitas: Receita[] = [];
  clientes: ClienteOption[] = [];
  buscaForm: FormGroup;
  receitaTotal: ReceitaTotal;

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

  quantidadeTotalDeItens: number = 0;
  pageSize: number = 0;
  situacoes: Array<any>;

  constructor(private receitaService: ReceitaService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder) {
    this.receitaTotal = new ReceitaTotal();
  }

  ngOnInit() {
    this.loadClientes();
    this.buildBuscaForm();
    this.submitBuscaForm(1);

    this.situacoes = UtilOptions.getOptions(FiltrosReceita.situacoes);
  }

  buildBuscaForm(): any {
    this.buscaForm = this.formBuilder.group({
      clienteId: ["00000000-0000-0000-0000-000000000000"],
      dataInicio: [this.obtenhaIncioDoMesCorrente(), [Validators.required]],
      dataFim: [this.obtenhaFimDoMesCorrente(), [Validators.required]],
      situacao: [0]
    });
  }

  private obtenhaFimDoMesCorrente() {
    let dateNow = new Date();
    let monthCurrent = dateNow.getMonth() + 1;
    let yearCurrent = dateNow.getFullYear();

    return `${new Date(yearCurrent, monthCurrent, 0).getDate()}/${monthCurrent}/${yearCurrent}`;
  }

  private obtenhaIncioDoMesCorrente() {
    let dateNow = new Date();

    return `01/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
  }

  private loadClientes(): any {
    this.clienteService.getAll(1, 500)
      .subscribe(pagedClientes => this.clientes = pagedClientes.Items.map(c => new ClienteOption(c.nome, c.id)));
  }

  Remova(receita: Receita) {
    this.receitaService.delete(receita.id).subscribe(
      () => this.receitas = this.receitas.filter(receitaAntigo => receitaAntigo != receita),
      () => "Erro ao excluir receita"
    );
  }

  submitBuscaForm(currentPagina: number) {
    let filtros: FiltrosReceita = this.mapearFiltroReceita(currentPagina);
    this.buscarTotais(filtros);
    this.buscarReceitas(filtros);
  }

  private mapearFiltroReceita(currentPagina: number) {
    let filtros: FiltrosReceita = Object.assign(new FiltrosReceita(), this.buscaForm.value);
    filtros.dataInicio = filtros.dataInicio.split("/").reverse().join("-");
    filtros.dataFim = filtros.dataFim.split("/").reverse().join("-");
    filtros.page = currentPagina;
    filtros.pageSize = 10;

    return filtros;
  }

  private buscarReceitas(filtros: FiltrosReceita) {
    this.receitaService.buscarReceitas(filtros).subscribe(
      pagedReceitas => {
        this.receitas = pagedReceitas.Items;
        this.quantidadeTotalDeItens = pagedReceitas.TotalItems;
        this.pageSize = pagedReceitas.PageSize;
      },
      () => "Erro ao buscar as receitas"
    );
  }

  private buscarTotais(filtros: FiltrosReceita) {
    this.receitaService.obterTotais(filtros).subscribe(receitaTotal =>
      this.receitaTotal = receitaTotal,
      error => alert("erro ao carregar totais"))
  }
}

export class ClienteOption {
  public label: string;
  public value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }

} 
