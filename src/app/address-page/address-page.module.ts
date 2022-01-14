import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartsModule } from "ng2-charts";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";

import { AddressPageRoutingModule } from "./address-page-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { PageModule } from "./../shared/page.module";

import { AddressPageComponent } from "./address-page.component";
import { OverviewComponent } from "./overview/overview.component";
import { TransportComponent } from "./transport/transport.component";
import { AvailabilityComponent } from "./availability/availability.component";
import { MetainfoComponent } from "./metainfo/metainfo.component";
import { JobsComponent } from "./jobs/jobs.component";
import { HousingComponent } from "./housing/housing.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxChartsModule,
        ChartsModule,
        MatProgressSpinnerModule,
        ScrollToModule.forRoot(),
        SharedModule,
        PageModule,
        AddressPageRoutingModule,
    ],
    declarations: [
        AddressPageComponent,
        OverviewComponent,
        TransportComponent,
        AvailabilityComponent,
        MetainfoComponent,
        JobsComponent,
        HousingComponent,
    ]
})
export class AddressPageModule {
}
