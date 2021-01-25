import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginadorComponent } from "./componentes/paginador/paginador.component";
import { PagerService } from "./services/pager.service";

@NgModule({
    declarations: [PaginadorComponent],
    imports: [CommonModule],
    exports: [CommonModule, PaginadorComponent],
    providers: [PagerService]
})
export class SharedModule { }
