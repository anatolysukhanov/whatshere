import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StartPageComponent } from "./start-page/start-page.component";

import { CityComponent } from "./city/city.component";
import { CountryComponent } from "./country/country.component";
import { PostCodeComponent } from "./postcode/postcode.component";

const appRoutes: Routes = [
    /*{
        path: "search", component: SearchComponent
    },*/
    /*{
        path: "address/:lng/:lat", component: AddressComponent,
    },*/
    {
        path: "", component: StartPageComponent
    },
    {
        path: "city/:city", component: CityComponent
    },
    {
        path: "postcode/:postcode", component: PostCodeComponent
    },
    {
        path: "country/:country", component: CountryComponent
    },
    {
        path: "**", component: StartPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, { scrollPositionRestoration: "enabled", anchorScrolling: "enabled" }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
