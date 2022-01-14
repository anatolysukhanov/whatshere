import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs/index";
import { forkJoin } from "rxjs/index";
import * as shape from "d3-shape";
import { ApiService } from "../../service/api.service";
import { AreaCompositionChart, BestForInterestsChart } from "../../model/charts";
import { ChartDataSets, ChartType, RadialChartOptions } from "chart.js";
import { Label, Color } from "ng2-charts";

interface Params {
    error: string;
    lng: string;
    lat: string;
    address_id: number;
    green_area: number;
    water_area: number;
    buildings_area: number;
    streets_area: number;
    totalBuildings: string;
    estimatePopulation: string;
    populationDensity: number;
    best_food_living: number;
    best_travel: number;
    best_leasure: number;
    best_art_culture: number;
    best_sports: number;
    best_shopping: number;
    best_families: number;
    best_teenagers: number;
    best_students: number;
    best_professionals: number;
    best_bestagers: number;
    best_elderly: number;
}

@Component({
    selector: "app-address-metainfo",
    templateUrl: "./metainfo.component.html",
    styleUrls: ["./metainfo.component.css"]
})
export class MetainfoComponent implements OnInit {
    private _data = new BehaviorSubject<Params>({} as Params);

    @Input()
    set data(value) {
        this._data.next(value);
    }

    get data() {
        return this._data.getValue();
    }

    totalArea: string;
    density: string;
    bestForInterestsChart: BestForInterestsChart;
    bestForInterestsChartData: Array<any>;
    bestForInterestsChartCurve = shape.curveLinear;
    areaCompositionChart: AreaCompositionChart;
    areaCompositionChartData: Array<any>;
    areaCompositionChartColors: Array<any>;
    isLoadingResults = true;

    radarChartOptions: RadialChartOptions = {
        responsive: true
    };

    colorsOverride: Array<Color> = [{
        borderColor: "#3f98ff",
        backgroundColor: "rgba(255, 255, 255, 0)"
    }];

    radarChartType: ChartType = "radar";
    radarChartLabels: Label[] = ["Food & Dining", "Travel", "Leisure", "Arts & Culture", "Sports", "Shopping"];
    radarChartData: ChartDataSets[];

    get width(): any {
        return this.el.nativeElement.clientWidth / 1.3;
    }

    constructor(private el: ElementRef, private service: ApiService) {
        this.totalArea = "12,56";
    }

    ngOnInit() {
        this._data.subscribe(x => {

            if (this.data && !this.data.error) {

                this.isLoadingResults = false;

                this.areaCompositionChart = new AreaCompositionChart(this.data.green_area, this.data.water_area, this.data.streets_area + this.data.buildings_area);
                this.areaCompositionChartData = this.areaCompositionChart.data;
                this.areaCompositionChartColors = this.areaCompositionChart.colors;

                this.radarChartData = [
                    { data: [this.data.best_food_living, this.data.best_travel, this.data.best_leasure, this.data.best_art_culture, this.data.best_sports, this.data.best_shopping] },
                ];

                /*this.bestForInterestsChart = new BestForInterestsChart(this.data.best_food_living, this.data.best_travel, this.data.best_leasure, this.data.best_art_culture, this.data.best_sports,
                    this.data.best_shopping);
                this.bestForInterestsChartData = this.bestForInterestsChart.data;*/
            }
        });
    }
}
