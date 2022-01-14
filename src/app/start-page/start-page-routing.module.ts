import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StartPageComponent } from "./start-page.component";

const searchRoutes: Routes = [
    { path: "search", component: StartPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(searchRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class StartPageRoutingModule {
}
