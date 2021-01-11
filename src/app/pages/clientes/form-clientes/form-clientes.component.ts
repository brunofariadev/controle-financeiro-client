import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';
import { Util } from '../../../shared/util.constantes';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { UtilOptions } from 'src/app/shared/util.options';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.sass']
})
export class FormClientesComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  clienteForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  cliente: Cliente = new Cliente();
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
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  setPageTitle(): any {
    if (this.currentAction == Util.pathNovo) {
      this.pageTitle = "Cadastro de novo cliente";
    } else {
      let clienteNome = this.cliente.nome || "";
      this.pageTitle = "Editando cliente " + clienteNome;
    }
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildClienteForm();
    this.loadCliente();
  }

  setCurrentAction(): any {
    if (this.route.snapshot.url[0].path == Util.pathNovo) {
      this.currentAction = Util.pathNovo;
    }
    else {
      this.currentAction = Util.pathEdite;
    }
  }

  buildClienteForm(): any {
    this.clienteForm = this.formBuilder.group({
      id: ["00000000-0000-0000-0000-000000000000"],
      nome: [null, [Validators.required, Validators.maxLength(100)]],
      idade: [null, [Validators.required]],
      dataDeNascimento: [null, [Validators.required]],
      estadoCivil: [0],
      sexo: [0],
      rg: [null],
      cpf: [null],
      escolaridade: [0],
      profissao: [null],
      telefone: [null],
      valorSessao: [null, [Validators.required]],
      email: [null],
      endereco: this.formBuilder.group({
        cep: [null],
        logradouro: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        estado: [null]
      }),
      observacao: [null, [Validators.maxLength(1000)]],
    });
  }

  loadCliente(): any {
    if (this.currentAction == Util.pathEdite) {
      this.route.paramMap.pipe(
        switchMap(params => this.clienteService.getById(params.get("id")))
      ).subscribe(cliente => {
        this.cliente = cliente;
        this.cliente.dataDeNascimento = cliente.dataDeNascimento.substring(0, cliente.dataDeNascimento.lastIndexOf("T")).split("-").reverse().join("/");
        this.clienteForm.patchValue(this.cliente);
      }, error => alert("Ocorreu um erro no servidor, por favor tente mais tarde."))
    }
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == Util.pathNovo) {
      this.createCliente();
    } else {
      this.updateCliente();
    }
  }

  createCliente(): any {
    let cliente: Cliente = this.MapearCliente();

    this.clienteService.create(cliente).subscribe(
      cliente => this.actionFormSuccess(cliente),
      error => this.actionsFormError(error)
    )
  }

  private MapearCliente() {
    let cliente: Cliente = Object.assign(new Cliente(), this.clienteForm.value);

    cliente.dataDeNascimento = cliente.dataDeNascimento.split("/").reverse().join("-");
    cliente.sexo = parseInt(cliente.sexo.toString());
    cliente.escolaridade = parseInt(cliente.escolaridade.toString());
    cliente.estadoCivil = parseInt(cliente.estadoCivil.toString());

    return cliente;
  }

  actionFormSuccess(cliente: Cliente): any {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl("clientes", { skipLocationChange: true }).then(
      () => this.router.navigate(["clientes", cliente.id, Util.pathEdite])
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

  updateCliente(): any {
    let cliente: Cliente = this.MapearCliente();

    this.clienteService.update(cliente).subscribe(
      cliente => this.actionFormSuccess(cliente),
      error => this.actionsFormError(error)
    )
  }

  get sexos(): Array<any> {
    return UtilOptions.getOptions(Cliente.sexoEnum);
  }

  get estadosCivis(): Array<any> {
    return UtilOptions.getOptions(Cliente.estadoCivilEnum);
  }

  get escolaridades(): Array<any> {
    return UtilOptions.getOptions(Cliente.escolaridadeEnum);
  }
}
