import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaReceitasComponent } from './lista-receitas/lista-receitas.component';
import { FormReceitasComponent } from './form-receitas/form-receitas.component';
import { Util } from '../../shared/util.constantes';

const routes: Routes = [
  { path: '', component: ListaReceitasComponent },
  { path: Util.pathNovo, component: FormReceitasComponent },
  { path: `:id/${Util.pathEdite}`, component: FormReceitasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceitasRoutingModule { }
