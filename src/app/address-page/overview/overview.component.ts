import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { forkJoin } from "rxjs/index";
import { Meta } from "@angular/platform-browser";
import { environment } from "./../../../environments/environment";
import { ApiService } from "../../service/api.service";
import { LivabilityScoreChart } from "../../model/charts";

interface Params {
    error: string;
    street: string;
    housenumber: string;
    city: string;
    country: string;
    postcode: string;
    totalDistance: number;
    totalBuildings: number;
    totalShops: number;
    estimatePopulation: number;
    greenArea: number;
    lng: number;
    lat: number;
    locationType: string;
    nearestTransportDistance: string;
    transportation_score: number;
    housing_score: number;
    availability_score: number;
    business_competition_score: number;
    jobs_score: number;
    congestions_score: number;
    greeness_score: number;
    total_country_rank: number;
    total_city_rank: number;
}

@Component({
    selector: "app-address-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
    private _data = new BehaviorSubject<Params>({} as Params);

    @Input()
    set data(value) {
        this._data.next(value);
    }

    get data() {
        return this._data.getValue();
    }

    key: string;
    chart: LivabilityScoreChart;
    chartData: Array<any>;
    chartColors: Array<any>;
    totalScore: number;
    isLoadingResults = true;

    get width(): any {
        return this.el.nativeElement.clientWidth / 1.2;
    }

    get height(): any {
        return this.el.nativeElement.clientWidth / 2;
    }

    constructor(private el: ElementRef,
                private service: ApiService,
                private meta: Meta) {
        this.key = environment.googleMapsApiKey;
    }

    ngOnInit() {
        this._data.subscribe(x => {
            if (this.data && !this.data.error) {
                this.isLoadingResults = false;

                this.chart = new LivabilityScoreChart(this.data.transportation_score, this.data.housing_score, this.data.availability_score, this.data.business_competition_score, this.data.jobs_score,
                    this.data.congestions_score, this.data.greeness_score);

                this.meta.updateTag({
                    name: "description",
                    content: `The livability score of ${this.data.street}, ${this.data.housenumber}, ${this.data.city} is ${this.chart.total}. See all statistics about this address.`
                });

                this.totalScore = this.chart.total;
                this.chartData = this.chart.data;
                this.chartColors = this.chart.colors;
            }
        });
    }
}
