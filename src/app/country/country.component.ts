import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatPaginator } from "@angular/material";
import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Meta, Title } from "@angular/platform-browser";
import { ApiService } from "../service/api.service";

@Component({
    selector: "app-country",
    templateUrl: "./country.component.html",
    styleUrls: ["./country.component.css"]
})
export class CountryComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ["city"];
    data: Array<any>;

    resultsLength = 0;
    isLoadingResults = true;
    pageSize = 50;
    country: string;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ApiService,
                private title: Title) {
    }

    ngOnInit() {
        this.country = this.route.snapshot.params.country;
        this.title.setTitle(`Whatshere.io – ${this.country}`);
    }

    ngAfterViewInit() {
        merge(this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.service.getCountryCities(this.country, this.paginator.pageIndex, this.pageSize);
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
}
