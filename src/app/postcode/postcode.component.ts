import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatPaginator } from "@angular/material";
import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Meta, Title } from "@angular/platform-browser";
import { ApiService } from "../service/api.service";

@Component({
    selector: "app-postcode",
    templateUrl: "./postcode.component.html",
    styleUrls: ["./postcode.component.css"]
})
export class PostCodeComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ["address_id", "city", "country", "street", "housenumber", "postcode"];
    data: Array<any>;

    resultsLength = 0;
    isLoadingResults = true;
    pageSize = 50;
    postcode: string;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ApiService,
                private title: Title) {
    }

    ngOnInit() {
        this.postcode = this.route.snapshot.params.postcode;
        this.title.setTitle(`Whatshere.io – ${this.postcode}`);
    }

    ngAfterViewInit() {
        merge(this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.service.getPostCodeAddresses(this.postcode, this.paginator.pageIndex, this.pageSize);
                }),
                map(data => {
                    this.isLoadingResults = false;
                    this.resultsLength = data.total_count;
                    return data.items;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    return observableOf([]);
                })
            ).subscribe(data => this.data = data);
    }

    formatAddress(response: any): string {
        let addressComponents = []
        if (response.city != null) addressComponents.push(response.city.replace(new RegExp(" ", "g"), "-"));
        if (response.street != null) addressComponents.push(response.street.replace(new RegExp(" ", "g"), "-"));
        if (response.housenumber != null) addressComponents.push(response.housenumber.replace(new RegExp(" ", "g"), "-"));
        if (response.postcode != null) addressComponents.push(response.postcode.replace(new RegExp(" ", "g"), "-"));
        return addressComponents.join("-");
    }
}

