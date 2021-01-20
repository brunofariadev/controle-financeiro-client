import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sessao } from '../shared/sessao.model';
import { SessaoService } from '../shared/sessao.service';
import { Util } from '../../../shared/util.constantes';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { ClienteService } from '../../clientes/shared/cliente.service';
import { Cliente } from '../../clientes/shared/cliente.model';

@Component({
  selector: 'app-form-sessoes',
  templateUrl: './form-sessoes.component.html',
  styleUrls: ['./form-sessoes.component.sass']
})
export class FormSessoesComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  sessaoForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  sessao: Sessao = new Sessao();
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

  constructor(
    private sessaoService: SessaoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  setPageTitle(): any {
    if (this.currentAction == Util.pathNovo) {
      this.pageTitle = "Cadastro de novo sessao";
    } else {
      // let sessaoNome = this.sessao.nome || "";
      // this.pageTitle = "Editando sessao " + sessaoNome;
    }
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildSessaoForm();
    this.loadSessao();
    this.loadClientes();
  }

  loadClientes(): any {
    this.clienteService.getAll(1, 500).subscribe(pagedClientes => this.clientes = pagedClientes.Items.map(c => new ClienteOption(c.nome, c.id)));
  }

  setCurrentAction(): any {
    if (this.route.snapshot.url[0].path == Util.pathNovo) {
      this.currentAction = Util.pathNovo;
    }
    else {
      this.currentAction = Util.pathEdite;
    }
  }

  buildSessaoForm(): any {
    this.sessaoForm = this.formBuilder.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      clienteId: [0, [Validators.required]],
      dataDaSessao: [null, [Validators.required]],
    });
  }

  loadSessao(): any {
    if (this.currentAction == Util.pathEdite) {
      this.route.paramMap.pipe(
        switchMap(params => this.sessaoService.getById(params.get("id")))
      ).subscribe(sessao => {
        this.sessao = sessao;
        this.sessao.dataDaSessao = sessao.dataDaSessao.substring(0, sessao.dataDaSessao.lastIndexOf("T")).split("-").reverse().join("/");
        this.sessaoForm.patchValue(sessao);
      }, error => alert("Ocorreu um erro no servidor, por favor tente mais tarde."))
    }
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == Util.pathNovo) {
      this.createSessao();
    } else {
      this.updateSessao();
    }
  }

  createSessao(): any {
    let sessao: Sessao = Object.assign(new Sessao(), this.sessaoForm.value);
    sessao.dataDaSessao = sessao.dataDaSessao.split("/").reverse().join("-");

    this.sessaoService.create(sessao).subscribe(
      sessao => this.actionFormSuccess(sessao),
      error => this.actionsFormError(error)
    )
  }

  actionFormSuccess(sessao: Sessao): any {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl("sessoes", { skipLocationChange: true }).then(
      () => this.router.navigate(["sessoes", sessao.id, Util.pathEdite])
    );
  }

  actionsFormError(error: any): any {
    toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    if (error.status === 222) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor, por favor tente mais tarde!"]
    }
  }

  updateSessao(): any {
    let sessao: Sessao = Object.assign(new Sessao(), this.sessaoForm.value);
    sessao.dataDaSessao = sessao.dataDaSessao.split("/").reverse().join("-");

    this.sessaoService.update(sessao).subscribe(
      sessao => this.actionFormSuccess(sessao),
      error => this.actionsFormError(error)
    )
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