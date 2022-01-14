import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { StartPageComponent } from "./../start-page/start-page.component";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";

const searchRoutes: Routes = [
    { path: "search", component: StartPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(searchRoutes)
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    exports: [
        RouterModule,
        HeaderComponent,
        FooterComponent
    ]
})
export class PageModule {
}
