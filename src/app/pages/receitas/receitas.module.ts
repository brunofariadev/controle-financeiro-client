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
import { SharedModule } from 'src/app/shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ListaReceitasComponent, FormReceitasComponent, BrazilianCurrencyPipe],
  imports: [
    CommonModule,
    ReceitasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    CalendarModule,
    SharedModule,
    AutoCompleteModule,
    ScrollingModule,
    DropdownModule
    // IMaskModule
  ]
})
export class ReceitasModule { }
