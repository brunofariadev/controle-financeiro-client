import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "primeng/api";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./lista-dashboard/dashboard.component";

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
    ]
})
export class DashboardModule { }