import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Receita } from '../shared/receita.model';
import { ReceitaService } from '../shared/receita.service';
import { Util } from '../../../shared/util.constantes';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { SessaoService } from '../../sessoes/shared/sessao.service';
import { Sessao } from '../../sessoes/shared/sessao.model';
import { UtilOptions } from '../../../shared/util.options';

@Component({
  selector: 'app-form-receitas',
  templateUrl: './form-receitas.component.html',
  styleUrls: ['./form-receitas.component.sass']
})
export class FormReceitasComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  receitaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  receita: Receita = new Receita();
  sessoes: SessaoOption[] = [];
  selectedTipo: string;

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
  // imaskConfigValor = {
  //   mask: Number,
  //   scale: 2,
  //   thousandsSeparator: '',
  //   padFractionalZeros: true,
  //   normalizeZeros: true,
  //   radix: ","
  // }

  tipos: Array<any>;
  formasDePagamento: Array<any>;

  constructor(
    private receitaService: ReceitaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private sessaoService: SessaoService
  ) { }

  ngAfterContentChecked(): void {

    this.setPageTitle();
  }

  setPageTitle(): any {
    if (this.currentAction == Util.pathNovo) {
      this.pageTitle = "Cadastro de novo receita";
    } else {
      // let receitaNome = this.receita.nome || "";
      // this.pageTitle = "Editando receita " + receitaNome;
    }
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildReceitaForm();
    this.loadReceita();
    this.loadSessoes();

    this.tipos = UtilOptions.getOptions(Receita.tipos);
    this.formasDePagamento = UtilOptions.getOptions(Receita.formasDePagamento);
  }

  loadSessoes(): any {
    this.sessaoService.getAll(1, 500).subscribe(pagedSessoes => this.sessoes = pagedSessoes.Items.map(s => new SessaoOption(s.DescricaoCompleta, s.id)));
  }

  setCurrentAction(): any {
    if (this.route.snapshot.url[0].path == Util.pathNovo) {
      this.currentAction = Util.pathNovo;
    }
    else {
      this.currentAction = Util.pathEdite;
    }
  }

  buildReceitaForm(): any {
    this.receitaForm = this.formBuilder.group({
      id: ["00000000-0000-0000-0000-000000000000"],
      tipoDaReceita: [0, [Validators.required]],
      sessaoId: ['00000000-0000-0000-0000-000000000000'],
      descricao: [null, [Validators.maxLength(100)]],
      formaDePagamento: [null],
      valorAReceber: [null, [Validators.required]],
      foiPago: [false, [Validators.required]],
      dataDoPagamento: [null],
      dataDoVencimento: [null],
      observacao: [null, [Validators.maxLength(1000)]],
    });
  }

  loadReceita(): any {
    if (this.currentAction == Util.pathEdite) {
      this.route.paramMap.pipe(
        switchMap(params => this.receitaService.getById(params.get("id")))
      ).subscribe(receita => {
        this.receita = receita;

        if (receita.dataDoVencimento) {
          receita.dataDoVencimento =
            receita.dataDoVencimento.substring(0, receita.dataDoVencimento.lastIndexOf("T")).split("-").reverse().join("/");
        }

        if (receita.dataDoPagamento) {
          receita.dataDoPagamento =
            receita.dataDoPagamento.substring(0, receita.dataDoPagamento.lastIndexOf("T")).split("-").reverse().join("/");
        }

        this.receitaForm.patchValue(receita);
      }, error => alert("Ocorreu um erro no servidor, por favor tente mais tarde."))
    }
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == Util.pathNovo) {
      this.createReceita();
    } else {
      this.updateReceita();
    }
  }

  createReceita(): any {
    let receita: Receita = this.mapearReceita();

    this.receitaService.create(receita).subscribe(
      receita => this.actionFormSuccess(receita),
      error => this.actionsFormError(error)
    )
  }

  private mapearReceita(): Receita {
    let receita: Receita = Object.assign(new Receita(), this.receitaForm.value);
    receita.tipoDaReceita = parseInt(receita.tipoDaReceita.toString());

    if (receita.formaDePagamento != null)
      receita.formaDePagamento = parseInt(receita.formaDePagamento.toString());
    if (receita.dataDoPagamento != null)
      receita.dataDoPagamento = receita.dataDoPagamento.split("/").reverse().join("-");
    if (receita.dataDoVencimento != null)
      receita.dataDoVencimento = receita.dataDoVencimento.split("/").reverse().join("-");

    return receita;
  }

  actionFormSuccess(receita: Receita): any {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl("receitas", { skipLocationChange: true }).then(
      () => this.router.navigate(["receitas", receita.id, Util.pathEdite])
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

  updateReceita(): any {
    let receita: Receita = this.mapearReceita();

    this.receitaService.update(receita).subscribe(
      receita => this.actionFormSuccess(receita),
      error => this.actionsFormError(error)
    )
  }

  changeInputValue(valor: string) {
    this.receitaForm.get("valorAReceber").setValue(valor.replace('.', '').replace(',', '.'));
  }
}

export class SessaoOption {
  public label: string;
  public value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }

}
