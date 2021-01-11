import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { Util } from '../../shared/util.constantes';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: Util.pathNovo, component: FormClientesComponent },
  { path: `:id/${Util.pathEdite}`, component: FormClientesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
