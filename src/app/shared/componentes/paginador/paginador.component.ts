import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PagerService } from '../../services/pager.service';
import { Pagina } from './pagina.model';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent implements OnChanges {

  @Input() totalDeItens: number;
  @Input() pageSize: number;

  @Output() aoMudarDePagina = new EventEmitter();

  pagina: Pagina
  pagerService: PagerService = new PagerService()

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagina = this.pagerService.getPager(this.totalDeItens, 1, this.pageSize);
  }

  setPage(page: number, desabilitado: boolean) {
    if (desabilitado) { return; }

    this.aoMudarDePagina.emit(page)
    this.pagina = this.pagerService.getPager(this.totalDeItens, page, this.pageSize);
  }

}
