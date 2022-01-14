import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { StartPageRoutingModule } from "./start-page-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { PageModule } from "./../shared/page.module";

import { StartPageComponent } from "./start-page.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GooglePlaceModule,
        StartPageRoutingModule,
        SharedModule,
        PageModule,
    ],
    declarations: [
        StartPageComponent,
    ]
})
export class StartPageModule {
}
