import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Meta, Title } from "@angular/platform-browser";
import { ApiService } from "../service/api.service";
import { Address } from "./../model/address";
import { AddressDetailsResponse } from "../model/api-responses";

@Component({
    selector: "app-address-page",
    templateUrl: "./address-page.component.html",
})
export class AddressPageComponent implements OnInit {
    @ViewChild("componentDiv", { static: true }) componentDiv: ElementRef;

    isSearchForm: boolean;
    isMenu: boolean;
    formClass: string;
    mobileMenuClass: string;
    menuClass: string;
    activeLink: number;
    address: Address;
    overviewData: any;
    metainfoData: any;
    transportData: any;
    availabilityData: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ApiService,
                private title: Title,
                private meta: Meta) {
        this.isSearchForm = false;
        this.isMenu = false;
        this.formClass = "form header__form";
        this.mobileMenuClass = "mobile-menu-btn";
        this.menuClass = "menu";
        this.activeLink = 0;
    }

    @HostListener("window:scroll", []) onWindowScroll() {
        const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        const overviewPos = Math.round(window.scrollY + document.querySelector("#overview").getBoundingClientRect().top);
        const metaPos = Math.round(window.scrollY + document.querySelector("#metainfo").getBoundingClientRect().top);
        const transportPos = Math.round(window.scrollY + document.querySelector("#transport").getBoundingClientRect().top);
        const availabilityPos = Math.round(window.scrollY + document.querySelector("#availability").getBoundingClientRect().top);
        const housingPos = Math.round(window.scrollY + document.querySelector("#housing").getBoundingClientRect().top);
        const jobsPos = Math.round(window.scrollY + document.querySelector("#jobs").getBoundingClientRect().top);

        const metaHeight = document.getElementById("metainfo").offsetHeight;
        const transportHeight = document.getElementById("transport").offsetHeight;
        const availabilityHeight = document.getElementById("availability").offsetHeight;
        const housingHeight = document.getElementById("housing").offsetHeight;
        const jobsHeight = document.getElementById("jobs").offsetHeight;

        if (verticalOffset >= overviewPos - 150 && verticalOffset <= metaPos - overviewPos) {
            this.activeLink = 1;
        } else if (verticalOffset >= metaPos - 150 && verticalOffset <= metaPos + metaHeight) {
            this.activeLink = 2;
        } else if (verticalOffset >= transportPos - 150 && verticalOffset <= transportPos + transportHeight) {
            this.activeLink = 3;
        } else if (verticalOffset >= availabilityPos - 150 && verticalOffset <= availabilityPos + availabilityHeight) {
            this.activeLink = 4;
        } else if (verticalOffset >= housingPos - 150 && verticalOffset <= housingPos + housingHeight) {
            this.activeLink = 5;
        } else if (verticalOffset >= jobsPos - 150 && verticalOffset <= jobsPos + jobsHeight) {
            this.activeLink = 6;
        } else {
            this.activeLink = 0;
        }
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return this.service.getAddressDetails(params.get("id"));
            })
        ).subscribe((response: AddressDetailsResponse) => {

            this.address = Object.assign(new Address(), response);

            this.title.setTitle(`Whatshere.io – ${this.address.street}, ${this.address.housenumber}, ${this.address.postcode}, ${this.address.city}, ${this.address.country}`);
            this.meta.updateTag({
                name: "keywords",
                content: `whatshere.io, ${this.address.street}, ${this.address.housenumber}, ${this.address.postcode}, ${this.address.city}, ${this.address.country}`
            });
            this.meta.updateTag({ name: "geo.placename", content: `${this.address.city}` });
            this.meta.updateTag({ name: "geo.position", content: `${this.address.lng},${this.address.lat}` });

            this.transportData = {
                busDistance: Address.formatNumber(Math.round(this.address.bus_distance)),
                trainDistance: Address.formatNumber(Math.round(this.address.train_distance)),
                motorwayDistance: Address.formatNumber(Math.round(this.address.motorway_distance)),
            };

            this.overviewData = {
                street: this.address.street,
                housenumber: this.address.housenumber,
                city: this.address.city,
                country: this.address.country,
                postcode: this.address.postcode,
                totalDistance: this.address.getTotalDistance(),
                totalBuildings: this.address.getTotalBuildings(),
                totalShops: this.address.getTotalShops(),
                estimatePopulation: Math.round(this.address.estimate_population),
                greenArea: this.address.green_area,
                lng: this.address.lng,
                lat: this.address.lat,
                locationType: this.address.getLocationType(),
                nearestTransportDistance: Address.formatNumber(Math.round(this.address.getNearestPublicTransportDistance())),
                transportation_score: this.address.transportation_score,
                housing_score: this.address.housing_score,
                availability_score: this.address.availability_score,
                business_competition_score: this.address.business_competition_score,
                jobs_score: this.address.jobs_score,
                congestions_score: this.address.congestions_score,
                greeness_score: this.address.greeness_score,
                total_country_rank: this.address.total_country_rank,
                total_city_rank: this.address.total_city_rank
            };

            this.metainfoData = {
                address_id: this.address.address_id,
                green_area: this.address.green_area,
                water_area: this.address.water_area,
                buildings_area: this.address.buildings_area,
                streets_area: this.address.streets_area,
                lng: this.address.lng,
                lat: this.address.lat,
                totalBuildings: Address.formatNumber(this.address.getTotalBuildings()),
                estimatePopulation: Address.formatNumber(Math.round(this.address.estimate_population)),
                populationDensity: Address.formatNumber(Math.round(this.address.estimate_population / (Math.PI * 4))),
                best_food_living: this.address.best_food_living,
                best_travel: this.address.best_travel,
                best_leasure: this.address.best_leasure,
                best_art_culture: this.address.best_art_culture,
                best_sports: this.address.best_sports,
                best_shopping: this.address.best_shopping,
                best_families: this.address.best_families,
                best_teenagers: this.address.best_teenagers,
                best_students: this.address.best_students,
                best_professionals: this.address.best_professionals,
                best_bestagers: this.address.best_bestagers,
                best_elderly: this.address.best_elderly
            };

            this.availabilityData = {
                address_id: this.address.address_id,
                housenumber: this.address.housenumber,
                street: this.address.street,
                postcode: this.address.postcode,
                city: this.address.city,
                country: this.address.country,
                amenity_pub: this.address.amenity_pub,
                amenity_bar: this.address.amenity_bar,
                amenity_cafe: this.address.amenity_cafe,
                amenity_fast_food: this.address.amenity_fast_food,
                amenity_kindergarten: this.address.amenity_kindergarten,
                amenity_school: this.address.amenity_school,
                amenity_university: this.address.amenity_university,
                amenity_library: this.address.amenity_library,
                amenity_bus_station: this.address.amenity_bus_station,
                amenity_taxi: this.address.amenity_taxi,
                amenity_car_wash: this.address.amenity_car_wash,
                amenity_charging_station: this.address.amenity_charging_station,
                amenity_fuel: this.address.amenity_fuel,
                amenity_parking: this.address.amenity_parking,
                amenity_atm: this.address.amenity_atm,
                amenity_bank: this.address.amenity_bank,
                amenity_clinic: this.address.amenity_clinic,
                amenity_dentist: this.address.amenity_dentist,
                amenity_doctors: this.address.amenity_doctors,
                amenity_pharmacy: this.address.amenity_pharmacy,
                amenity_veterinary: this.address.amenity_veterinary,
                amenity_theatre: this.address.amenity_theatre,
                amenity_fire_station: this.address.amenity_fire_station,
                amenity_police: this.address.amenity_police,
                amenity_post_box: this.address.amenity_post_box,
                amenity_post_office: this.address.amenity_post_office,
                amenity_recycling: this.address.amenity_recycling,
                building_train_station: this.address.building_train_station,
                shop_bakery: this.address.shop_bakery,
                shop_beverages: this.address.shop_beverages,
                shop_butcher: this.address.shop_butcher,
                shop_confectionery: this.address.shop_confectionery,
                shop_convenience: this.address.shop_convenience,
                shop_deli: this.address.shop_deli,
                shop_supermarket: this.address.shop_supermarket,
                shop_department_store: this.address.shop_department_store,
                shop_kiosk: this.address.shop_kiosk,
                shop_mall: this.address.shop_mall,
                shop_laundry: this.address.shop_laundry,
                shop_books: this.address.shop_books,
                shop_car: this.address.shop_car,
                shop_electronics: this.address.shop_electronics,
                shop_computer: this.address.shop_computer,
                shop_florist: this.address.shop_florist,
                shop_boutique: this.address.shop_boutique,
                shop_clothes: this.address.shop_clothes,
                shop_jewelry: this.address.shop_jewelry,
                shop_shoes: this.address.shop_shoes,
                shop_beauty: this.address.shop_beauty,
                shop_cosmetics: this.address.shop_cosmetics,
                shop_hairdresser: this.address.shop_hairdresser,
                shop_optician: this.address.shop_optician,

                amenity_pub_city_rank: this.address.amenity_pub_city_rank,
                amenity_pub_worst_city_rank: this.address.amenity_pub_worst_city_rank,
                amenity_pub_city_rank_percentage: this.address.amenity_pub_city_rank_percentage,
                amenity_pub_country_rank: this.address.amenity_pub_country_rank,
                amenity_pub_worst_country_rank: this.address.amenity_pub_worst_country_rank,
                amenity_pub_country_rank_percentage: this.address.amenity_pub_country_rank_percentage,

                amenity_kindergarten_city_rank: this.address.amenity_kindergarten_city_rank,
                amenity_kindergarten_worst_city_rank: this.address.amenity_kindergarten_worst_city_rank,
                amenity_kindergarten_city_rank_percentage: this.address.amenity_kindergarten_city_rank_percentage,
                amenity_kindergarten_country_rank: this.address.amenity_kindergarten_country_rank,
                amenity_kindergarten_worst_country_rank: this.address.amenity_kindergarten_worst_country_rank,
                amenity_kindergarten_country_rank_percentage: this.address.amenity_kindergarten_country_rank_percentage,

                amenity_bus_station_city_rank: this.address.amenity_bus_station_city_rank,
                amenity_bus_station_worst_city_rank: this.address.amenity_bus_station_worst_city_rank,
                amenity_bus_station_city_rank_percentage: this.address.amenity_bus_station_city_rank_percentage,
                amenity_bus_station_country_rank: this.address.amenity_bus_station_country_rank,
                amenity_bus_station_worst_country_rank: this.address.amenity_bus_station_worst_country_rank,
                amenity_bus_station_country_rank_percentage: this.address.amenity_bus_station_country_rank_percentage,

                amenity_car_wash_city_rank: this.address.amenity_car_wash_city_rank,
                amenity_car_wash_worst_city_rank: this.address.amenity_car_wash_worst_city_rank,
                amenity_car_wash_city_rank_percentage: this.address.amenity_car_wash_city_rank_percentage,
                amenity_car_wash_country_rank: this.address.amenity_car_wash_country_rank,
                amenity_car_wash_worst_country_rank: this.address.amenity_car_wash_worst_country_rank,
                amenity_car_wash_country_rank_percentage: this.address.amenity_car_wash_country_rank_percentage,

                amenity_atm_city_rank: this.address.amenity_atm_city_rank,
                amenity_atm_worst_city_rank: this.address.amenity_atm_worst_city_rank,
                amenity_atm_city_rank_percentage: this.address.amenity_atm_city_rank_percentage,
                amenity_atm_country_rank: this.address.amenity_atm_country_rank,
                amenity_atm_worst_country_rank: this.address.amenity_atm_worst_country_rank,
                amenity_atm_country_rank_percentage: this.address.amenity_atm_country_rank_percentage,

                amenity_clinic_city_rank: this.address.amenity_clinic_city_rank,
                amenity_clinic_worst_city_rank: this.address.amenity_clinic_worst_city_rank,
                amenity_clinic_city_rank_percentage: this.address.amenity_clinic_city_rank_percentage,
                amenity_clinic_country_rank: this.address.amenity_clinic_country_rank,
                amenity_clinic_worst_country_rank: this.address.amenity_clinic_worst_country_rank,
                amenity_clinic_country_rank_percentage: this.address.amenity_clinic_country_rank_percentage,

                amenity_theatre_city_rank: this.address.amenity_theatre_city_rank,
                amenity_theatre_worst_city_rank: this.address.amenity_theatre_worst_city_rank,
                amenity_theatre_city_rank_percentage: this.address.amenity_theatre_city_rank_percentage,
                amenity_theatre_country_rank: this.address.amenity_theatre_country_rank,
                amenity_theatre_worst_country_rank: this.address.amenity_theatre_worst_country_rank,
                amenity_theatre_country_rank_percentage: this.address.amenity_theatre_country_rank_percentage,

                amenity_fire_station_city_rank: this.address.amenity_fire_station_city_rank,
                amenity_fire_station_worst_city_rank: this.address.amenity_fire_station_worst_city_rank,
                amenity_fire_station_city_rank_percentage: this.address.amenity_fire_station_city_rank_percentage,
                amenity_fire_station_country_rank: this.address.amenity_fire_station_country_rank,
                amenity_fire_station_worst_country_rank: this.address.amenity_fire_station_worst_country_rank,
                amenity_fire_station_country_rank_percentage: this.address.amenity_fire_station_country_rank_percentage,

                shop_bakery_city_rank: this.address.shop_bakery_city_rank,
                shop_bakery_worst_city_rank: this.address.shop_bakery_worst_city_rank,
                shop_bakery_city_rank_percentage: this.address.shop_bakery_city_rank_percentage,
                shop_bakery_country_rank: this.address.shop_bakery_country_rank,
                shop_bakery_worst_country_rank: this.address.shop_bakery_worst_country_rank,
                shop_bakery_country_rank_percentage: this.address.shop_bakery_country_rank_percentage,

                shop_supermarket_city_rank: this.address.shop_supermarket_city_rank,
                shop_supermarket_worst_city_rank: this.address.shop_supermarket_worst_city_rank,
                shop_supermarket_city_rank_percentage: this.address.shop_supermarket_city_rank_percentage,
                shop_supermarket_country_rank: this.address.shop_supermarket_country_rank,
                shop_supermarket_worst_country_rank: this.address.shop_supermarket_worst_country_rank,
                shop_supermarket_country_rank_percentage: this.address.shop_supermarket_country_rank_percentage,

                shop_boutique_city_rank: this.address.shop_boutique_city_rank,
                shop_boutique_worst_city_rank: this.address.shop_boutique_worst_city_rank,
                shop_boutique_city_rank_percentage: this.address.shop_boutique_city_rank_percentage,
                shop_boutique_country_rank: this.address.shop_boutique_country_rank,
                shop_boutique_worst_country_rank: this.address.shop_boutique_worst_country_rank,
                shop_boutique_country_rank_percentage: this.address.shop_boutique_country_rank_percentage,

                shop_beauty_city_rank: this.address.shop_beauty_city_rank,
                shop_beauty_worst_city_rank: this.address.shop_beauty_worst_city_rank,
                shop_beauty_city_rank_percentage: this.address.shop_beauty_city_rank_percentage,
                shop_beauty_country_rank: this.address.shop_beauty_country_rank,
                shop_beauty_worst_country_rank: this.address.shop_beauty_worst_country_rank,
                shop_beauty_country_rank_percentage: this.address.shop_beauty_country_rank_percentage
            };

        }, error => {

            this.overviewData = {
                error: error.message
            };

            this.metainfoData = {
                error: error.message
            };

            this.transportData = {
                error: error.message
            };

            this.availabilityData = {
                error: error.message
            };
        });
    }

    toggleMenu() {
        this.isMenu = !this.isMenu;
        if (this.isMenu) {
            this.menuClass = "menu menu_opened";
        } else {
            this.menuClass = "menu";
        }
    }

    toggleSearchForm() {
        this.isSearchForm = !this.isSearchForm;
        if (this.isSearchForm) {
            this.formClass = "form header__form header__form_opened";
            this.mobileMenuClass = "mobile-menu-btn mobile-menu-btn_s";
        } else {
            this.formClass = "form header__form";
            this.mobileMenuClass = "mobile-menu-btn";
        }
    }
}
