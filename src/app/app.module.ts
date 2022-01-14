import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { PageModule } from "./shared/page.module";
import { StartPageModule } from "./start-page/start-page.module";
import { AddressPageModule } from "./address-page/address-page.module";

import { CityComponent } from "./city/city.component";
import { PostCodeComponent } from "./postcode/postcode.component";
import { CountryComponent } from "./country/country.component";

import { MatPaginatorModule, MatProgressSpinnerModule, MatTableModule } from "@angular/material";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
        PageModule,
        StartPageModule,
        AddressPageModule,
        AppRoutingModule
    ],
    declarations: [
        CityComponent,
        PostCodeComponent,
        CountryComponent,
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
