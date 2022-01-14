import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddressPageComponent } from "./address-page.component";

const addressRoutes: Routes = [
    // { path: "address/:lng/:lat", component: AddressPageComponent }
    // { path: ":id", component: AddressPageComponent },
    { path: "address/:id/:address", component: AddressPageComponent },
    // { path: "address/:id", component: AddressPageComponent },
    // { path: ":country/:id/:address", component: AddressPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(addressRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AddressPageRoutingModule {
}
