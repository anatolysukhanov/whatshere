import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { SearchComponent } from "./search.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GooglePlaceModule
    ],
    declarations: [
        SearchComponent,
    ],
    exports: [
        SearchComponent,
    ]
})
export class SharedModule {
}
