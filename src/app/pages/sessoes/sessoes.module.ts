import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessoesRoutingModule } from './sessoes-routing.module';
import { ListaSessoesComponent } from './lista-sessoes/lista-sessoes.component';
import { FormSessoesComponent } from './form-sessoes/form-sessoes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { IMaskModule } from 'angular-imask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListaSessoesComponent, FormSessoesComponent],
  imports: [
    CommonModule,
    SessoesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    CalendarModule,
    SharedModule
    // IMaskModule
  ]
})
export class SessoesModule { }
