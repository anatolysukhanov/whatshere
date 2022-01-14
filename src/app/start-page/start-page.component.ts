import { Component, ViewEncapsulation, OnInit } from "@angular/core";

import * as AOS from "aos";

@Component({
    selector: "app-start-page",
    templateUrl: "./start-page.component.html",
})
export class StartPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        AOS.init({
            duration: 1000,
            delay: 0,
            once: true
        });
    }

}
