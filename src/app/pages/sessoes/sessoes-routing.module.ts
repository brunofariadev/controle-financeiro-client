import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaSessoesComponent } from './lista-sessoes/lista-sessoes.component';
import { FormSessoesComponent } from './form-sessoes/form-sessoes.component';
import { Util } from '../../shared/util.constantes';

const routes: Routes = [
  { path: '', component: ListaSessoesComponent },
  { path: Util.pathNovo, component: FormSessoesComponent },
  { path: `:id/${Util.pathEdite}`, component: FormSessoesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessoesRoutingModule { }
