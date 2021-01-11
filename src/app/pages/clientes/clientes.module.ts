import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PaginadorComponent } from 'src/app/shared/componentes/paginador/paginador.component';

@NgModule({
  declarations: [ListaClientesComponent, FormClientesComponent, PaginadorComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    CurrencyMaskModule
  ]
})
export class ClientesModule { }
