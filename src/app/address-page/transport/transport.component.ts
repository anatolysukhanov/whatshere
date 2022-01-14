import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs/index";

interface Params {
    error: string;
    busDistance: string;
    trainDistance: string;
    motorwayDistance: string;
}

@Component({
    selector: "app-address-transport",
    templateUrl: "./transport.component.html",
    styleUrls: [ "./transport.component.css" ]
})
export class TransportComponent implements OnInit {
    private _data = new BehaviorSubject<Params>({} as Params);

    @Input()
    set data(value) {
        this._data.next(value);
    }

    get data() {
        return this._data.getValue();
    }

    isLoadingResults = true;

    constructor() {
    }

    ngOnInit() {
        this._data.subscribe(x => {
            if (this.data && !this.data.error) {
                this.isLoadingResults = false;
            }
        });
    }

}
