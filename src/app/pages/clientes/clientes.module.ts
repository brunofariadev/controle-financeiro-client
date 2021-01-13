import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListaClientesComponent, FormClientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    CurrencyMaskModule,
    SharedModule
  ]
})
export class ClientesModule { }
