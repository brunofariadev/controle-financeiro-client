import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  declarations: [ListaClientesComponent, FormClientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    CurrencyMaskModule,
    SharedModule,
    ScrollingModule,
    DropdownModule
  ]
})
export class ClientesModule { }
