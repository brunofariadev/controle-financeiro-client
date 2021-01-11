import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ListaReceitasComponent } from './lista-receitas/lista-receitas.component';
import { FormReceitasComponent } from './form-receitas/form-receitas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { IMaskModule } from 'angular-imask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CalendarModule } from 'primeng/calendar';
import { BrazilianCurrencyPipe } from '../../shared/pipes/brazilian-currency.pipe';


@NgModule({
  declarations: [ListaReceitasComponent, FormReceitasComponent, BrazilianCurrencyPipe],
  imports: [
    CommonModule,
    ReceitasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    CalendarModule,
    // IMaskModule
  ]
})
export class ReceitasModule { }
