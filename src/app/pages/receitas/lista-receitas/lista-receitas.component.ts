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

@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.sass']
})
export class ListaReceitasComponent implements OnInit {

  receitas: Receita[] = [];
  clientes: Cliente[] = [];
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

  constructor(private receitaService: ReceitaService,
    private sessaoService: SessaoService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder) {
    this.receitaTotal = new ReceitaTotal();
  }

  ngOnInit() {
    this.loadClientes();
    this.buildBuscaForm();
    this.submitBuscaForm();
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
    this.clienteService.getAll(1, 500).subscribe(pagedClientes => this.clientes = pagedClientes.Items);
  }

  Remova(receita: Receita) {
    this.receitaService.delete(receita.id).subscribe(
      () => this.receitas = this.receitas.filter(receitaAntigo => receitaAntigo != receita),
      () => "Erro ao excluir receita"
    );
  }

  submitBuscaForm() {
    let filtros: FiltrosReceita = this.mapearFiltroReceita();
    this.buscarTotais(filtros);
    this.buscarReceitas(filtros);
  }

  private mapearFiltroReceita() {
    let filtros: FiltrosReceita = Object.assign(new FiltrosReceita(), this.buscaForm.value);
    filtros.dataInicio = filtros.dataInicio.split("/").reverse().join("-");
    filtros.dataFim = filtros.dataFim.split("/").reverse().join("-");
    return filtros;
  }

  private buscarReceitas(filtros: FiltrosReceita) {
    this.receitaService.buscarReceitas(filtros).subscribe(
      (receitas) => this.receitas = receitas,
      () => "Erro ao buscar as receitas"
    );
  }

  private buscarTotais(filtros: FiltrosReceita) {
    this.receitaService.obterTotais(filtros).subscribe(receitaTotal =>
      this.receitaTotal = receitaTotal,
      error => alert("erro ao carregar totais"))
  }

  get situacoes() {
    return UtilOptions.getOptions(FiltrosReceita.situacoes);
  }

}
