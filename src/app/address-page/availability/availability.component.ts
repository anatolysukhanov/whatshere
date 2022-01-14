import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs/index";

import { ApiService } from "../../service/api.service";

interface Params {
    error: string;
    address_id: number;
    housenumber: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
    amenity_pub: number;
    amenity_bar: number;
    amenity_cafe: number;
    amenity_fast_food: number;
    amenity_kindergarten: number;
    amenity_school: number;
    amenity_university: number;
    amenity_library: number;
    amenity_bus_station: number;
    amenity_taxi: number;
    amenity_car_wash: number;
    amenity_charging_station: number;
    amenity_fuel: number;
    amenity_parking: number;
    amenity_atm: number;
    amenity_bank: number;
    amenity_clinic: number;
    amenity_dentist: number;
    amenity_doctors: number;
    amenity_pharmacy: number;
    amenity_veterinary: number;
    amenity_theatre: number;
    amenity_fire_station: number;
    amenity_police: number;
    amenity_post_box: number;
    amenity_post_office: number;
    amenity_recycling: number;
    building_train_station: number;
    shop_bakery: number;
    shop_beverages: number;
    shop_butcher: number;
    shop_confectionery: number;
    shop_convenience: number;
    shop_deli: number;
    shop_supermarket: number;
    shop_department_store: number;
    shop_kiosk: number;
    shop_mall: number;
    shop_laundry: number;
    shop_books: number;
    shop_car: number;
    shop_electronics: number;
    shop_computer: number;
    shop_florist: number;
    shop_boutique: number;
    shop_clothes: number;
    shop_jewelry: number;
    shop_shoes: number;
    shop_beauty: number;
    shop_cosmetics: number;
    shop_hairdresser: number;
    shop_optician: number;
    amenity_pub_city_rank: number;
    amenity_pub_city_rank_percentage: number;
    amenity_pub_country_rank: number;
    amenity_pub_country_rank_percentage: number;
    amenity_kindergarten_city_rank: number;
    amenity_kindergarten_city_rank_percentage: number;
    amenity_kindergarten_country_rank: number;
    amenity_kindergarten_country_rank_percentage: number;
    amenity_bus_station_city_rank: number;
    amenity_bus_station_city_rank_percentage: number;
    amenity_bus_station_country_rank: number;
    amenity_bus_station_country_rank_percentage: number;
    amenity_car_wash_city_rank: number;
    amenity_car_wash_city_rank_percentage: number;
    amenity_car_wash_country_rank: number;
    amenity_car_wash_country_rank_percentage: number;
    amenity_atm_city_rank: number;
    amenity_atm_city_rank_percentage: number;
    amenity_atm_country_rank: number;
    amenity_atm_country_rank_percentage: number;
    amenity_clinic_city_rank: number;
    amenity_clinic_city_rank_percentage: number;
    amenity_clinic_country_rank: number;
    amenity_clinic_country_rank_percentage: number;
    amenity_theatre_city_rank: number;
    amenity_theatre_city_rank_percentage: number;
    amenity_theatre_country_rank: number;
    amenity_theatre_country_rank_percentage: number;
    amenity_fire_station_city_rank: number;
    amenity_fire_station_city_rank_percentage: number;
    amenity_fire_station_country_rank: number;
    amenity_fire_station_country_rank_percentage: number;
    shop_bakery_city_rank: number;
    shop_bakery_city_rank_percentage: number;
    shop_bakery_country_rank: number;
    shop_bakery_country_rank_percentage: number;
    shop_supermarket_city_rank: number;
    shop_supermarket_city_rank_percentage: number;
    shop_supermarket_country_rank: number;
    shop_supermarket_country_rank_percentage: number;
    shop_boutique_city_rank: number;
    shop_boutique_city_rank_percentage: number;
    shop_boutique_country_rank: number;
    shop_boutique_country_rank_percentage: number;
    shop_beauty_city_rank: number;
    shop_beauty_city_rank_percentage: number;
    shop_beauty_country_rank: number;
    shop_beauty_country_rank_percentage: number;
}

@Component({
    selector: "app-address-availability",
    templateUrl: "./availability.component.html",
    styleUrls: ["./availability.component.css"]
})
export class AvailabilityComponent implements OnInit {
    private _data = new BehaviorSubject<Params>({} as Params);

    @Input()
    set data(value) {
        this._data.next(value);
    }

    get data() {
        return this._data.getValue();
    }

    activeTabIndex: number;
    categories: Array<any>;
    isLoadingResults = true;
    query = "";

    constructor(private service: ApiService) {
        this.categories = [
            {
                name: "Eating & Drinking",
                image: "eating.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Pubs",
                        field: "amenity_pub",
                        tag: "pub"
                    },
                    {
                        name: "Bars",
                        field: "amenity_bar",
                        tag: "bar"
                    },
                    {
                        name: "Cafes",
                        field: "amenity_cafe",
                        tag: "cafe"
                    },
                    {
                        name: "Fast Food",
                        field: "amenity_fast_food",
                        tag: "fast+food"
                    }
                ]
            },
            {
                name: "Shopping",
                image: "eating.svg",
                subcategories: [
                    {
                        activeTabIndex: 0,
                        isLoadingResults: false,
                        name: "Food, beverages",
                        tabs: [
                            {
                                name: "Bakeries",
                                field: "shop_bakery",
                                tag: "bakery"
                            },
                            {
                                name: "Beverages",
                                field: "shop_beverages",
                                tag: "beverage"
                            },
                            {
                                name: "Butchers",
                                field: "shop_butcher",
                                tag: "butcher"
                            },
                            {
                                name: "Confectioneries",
                                field: "shop_confectionery",
                                tag: "confectionery"
                            },
                            {
                                name: "Convenience",
                                field: "shop_convenience",
                                tag: "convenience"
                            },
                            {
                                name: "Deli",
                                field: "shop_deli",
                                tag: "deli"
                            }
                        ]
                    },
                    {
                        activeTabIndex: 0,
                        isLoadingResults: false,
                        name: "Supplies and general stores",
                        tabs: [
                            {
                                name: "Supermarkets",
                                field: "shop_supermarket",
                                tag: "supermarket"
                            },
                            {
                                name: "Department stores",
                                field: "shop_department_store",
                                tag: "department+store"
                            },
                            {
                                name: "Kiosks",
                                field: "shop_kiosk",
                                tag: "kiosk"
                            },
                            {
                                name: "Malls",
                                field: "shop_mall",
                                tag: "mall"
                            },
                            {
                                name: "Laundries",
                                field: "shop_laundry",
                                tag: "laundry"
                            },
                            {
                                name: "Book stores",
                                field: "shop_books",
                                tag: "book+store"
                            },
                            {
                                name: "Cars",
                                field: "shop_car",
                                tag: "car"
                            },
                            {
                                name: "Electronics",
                                field: "shop_electronics",
                                tag: "electronics"
                            },
                            {
                                name: "Computers",
                                field: "shop_computer",
                                tag: "computers"
                            },
                            {
                                name: "Florists",
                                field: "shop_florist",
                                tag: "florist"
                            }
                        ]
                    },
                    {
                        activeTabIndex: 0,
                        isLoadingResults: false,
                        name: "Clothing, shoes and accessories",
                        tabs: [
                            {
                                name: "Boutique",
                                field: "shop_boutique",
                                tag: "boutique"
                            },
                            {
                                name: "Clothes",
                                field: "shop_clothes",
                                tag: "clothes"
                            },
                            {
                                name: "Jewelry",
                                field: "shop_jewelry",
                                tag: "jewelry"
                            },
                            {
                                name: "Shoes",
                                field: "shop_shoes",
                                tag: "shoes"
                            }
                        ]
                    },
                    {
                        activeTabIndex: 0,
                        isLoadingResults: false,
                        name: "Health and beauty",
                        tabs: [
                            {
                                name: "Beauty",
                                field: "shop_beauty",
                                tag: "beauty"
                            },
                            {
                                name: "Cosmetics",
                                field: "shop_cosmetics",
                                tag: "cosmetics"
                            },
                            {
                                name: "Hairdresser",
                                field: "shop_hairdresser",
                                tag: "hairdresser"
                            },
                            {
                                name: "Optician",
                                field: "shop_optician",
                                tag: "optician"
                            }

                        ]
                    }
                ]
            },
            {
                name: "Education",
                image: "education.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Kindergarten",
                        field: "amenity_kindergarten",
                        tag: "kindergarten"
                    },
                    {
                        name: "Schools",
                        field: "amenity_school",
                        tag: "school"
                    },
                    {
                        name: "Universities",
                        field: "amenity_university",
                        tag: "university"
                    },
                    {
                        name: "Libraries",
                        field: "amenity_library",
                        tag: "library"
                    }
                ]
            },
            {
                name: "Public Transport",
                image: "transport.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Bus stations",
                        field: "amenity_bus_station",
                        tag: "bus+station"
                    },
                    {
                        name: "Railway stations",
                        field: "building_train_station",
                        tag: "train+station"
                    },
                    {
                        name: "Taxi stations",
                        field: "amenity_taxi",
                        tag: "taxi"
                    }
                ]
            },
            {
                name: "Mobility",
                image: "mobility.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Car wash",
                        field: "amenity_car_wash",
                        tag: "car+wash"
                    },
                    {
                        name: "Charging stations",
                        field: "amenity_charging_station",
                        tag: "charging+station"
                    },
                    {
                        name: "Fuel stations",
                        field: "amenity_fuel",
                        tag: "fuel+station"
                    },
                    {
                        name: "Parking",
                        field: "amenity_parking",
                        tag: "parking"
                    }
                ]
            },
            {
                name: "Financial",
                image: "financial.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "ATMs",
                        field: "amenity_atm",
                        tag: "atm"
                    },
                    {
                        name: "Banks",
                        field: "amenity_bank",
                        tag: "bank"
                    }
                ]
            },
            {
                name: "Healthcare",
                image: "healthcare.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Clinics",
                        field: "amenity_clinic",
                        tag: "clinic"
                    },
                    {
                        name: "Dentists",
                        field: "amenity_dentist",
                        tag: "dentist"
                    },
                    {
                        name: "Doctors",
                        field: "amenity_doctors",
                        tag: "doctor"
                    },
                    {
                        name: "Pharmacies",
                        field: "amenity_pharmacy",
                        tag: "pharmacy"
                    },
                    {
                        name: "Veterinaries",
                        field: "amenity_veterinary",
                        tag: "veterinary"
                    }
                ]
            },
            {
                name: "Entertainment, Arts & Culture",
                image: "entertainment.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Theatres",
                        field: "amenity_theatre",
                        tag: "theatre"
                    }
                ]
            },
            {
                name: "Authorities",
                image: "authorities.svg",
                activeTabIndex: 0,
                isLoadingResults: false,
                tabs: [
                    {
                        name: "Fire stations",
                        field: "amenity_fire_station",
                        tag: "fire+station"
                    },
                    {
                        name: "Police stations",
                        field: "amenity_police",
                        tag: "police+station"
                    },
                    {
                        name: "Post boxes",
                        field: "amenity_post_box",
                        tag: "post+box"
                    },
                    {
                        name: "Post offices",
                        field: "amenity_post_office",
                        tag: "post+office"
                    },
                    {
                        name: "Recycling stations",
                        field: "amenity_recycling",
                        tag: "recycling+station"
                    }
                ]
            }
        ];
    }

    ngOnInit() {
        this._data.subscribe(x => {

            if (this.data && !this.data.error) {

                this.isLoadingResults = false;

                this.query = encodeURIComponent(this.data.street + " " + this.data.housenumber + " " + this.data.city + " " + this.data.postcode);

                for (const category of this.categories) {
                    if (category.subcategories) {
                        for (const subcategory of category.subcategories) {
                            subcategory.city = this.data.city
                            subcategory.cityRank = this.data[subcategory.tabs[subcategory.activeTabIndex].field + "_city_rank"];
                            subcategory.worstCityRank = this.data[subcategory.tabs[subcategory.activeTabIndex].field + "_worst_city_rank"];
                            subcategory.cityCompetitiveIndex = this.data[subcategory.tabs[subcategory.activeTabIndex].field + "_city_rank_percentage"]
                            subcategory.cityCompetitiveIndexStyle = subcategory.cityCompetitiveIndex + "%";
                            subcategory.country = this.data.country
                            subcategory.countryRank = this.data[subcategory.tabs[subcategory.activeTabIndex].field + "_country_rank"];
                            subcategory.worstCountryRank = this.data[subcategory.tabs[subcategory.activeTabIndex].field + "_worst_country_rank"];
                            subcategory.countryCompetitiveIndex = this.data[subcategory.tabs[subcategory.activeTabIndex].field + "_country_rank_percentage"]
                            subcategory.countryCompetitiveIndexStyle = subcategory.countryCompetitiveIndex + "%";
                        }
                    } else {
                        category.city = this.data.city
                        category.cityRank = this.data[category.tabs[category.activeTabIndex].field + "_city_rank"];
                        category.worstCityRank = this.data[category.tabs[category.activeTabIndex].field + "_worst_city_rank"];
                        category.cityCompetitiveIndex = this.data[category.tabs[category.activeTabIndex].field + "_city_rank_percentage"]
                        category.cityCompetitiveIndexStyle = category.cityCompetitiveIndex + "%";
                        category.country = this.data.country
                        category.countryRank = this.data[category.tabs[category.activeTabIndex].field + "_country_rank"];
                        category.worstCountryRank = this.data[category.tabs[category.activeTabIndex].field + "_worst_country_rank"];
                        category.countryCompetitiveIndex = this.data[category.tabs[category.activeTabIndex].field + "_country_rank_percentage"]
                        category.countryCompetitiveIndexStyle = category.countryCompetitiveIndex + "%";
                    }
                }
            }
        });
    }

    getSubcategoryTabQty(i, j, z) {
        return this.data[this.categories[i].subcategories[j].tabs[z].field] ? this.data[this.categories[i].subcategories[j].tabs[z].field] : 0;
    }

    getCategoryTabQty(i, j) {
        return this.data[this.categories[i].tabs[j].field] ? this.data[this.categories[i].tabs[j].field] : 0;
    }

    selectSubcategoryTab(i, j, z) {
        this.categories[i].subcategories[j].activeTabIndex = z;
        this.categories[i].subcategories[j].isLoadingResults = true;
        this.getSubcategoryRanks(this.categories[i].subcategories[j], this.categories[i].subcategories[j].tabs[z].field);
    }

    selectCategoryTab(i, j) {
        this.categories[i].activeTabIndex = j;
        this.categories[i].isLoadingResults = true;
        this.getCategoryRanks(this.categories[i], this.categories[i].tabs[j].field);
    }

    getSubcategoryRanks(subcategory, attribute) {
        this.service.getAddressRank(this.data.address_id, attribute).subscribe(r => {
            subcategory.city = this.data.city
            subcategory.cityRank = r.city_rank;
            subcategory.worstCityRank = r.worst_city_rank;
            subcategory.cityCompetitiveIndex = Math.round(r.city_percentage);
            subcategory.cityCompetitiveIndexStyle = Math.round(r.city_percentage) + "%";
            subcategory.country = this.data.country
            subcategory.countryRank = r.country_rank;
            subcategory.worstCountryRank = r.worst_country_rank;
            subcategory.countryCompetitiveIndex = Math.round(r.country_percentage);
            subcategory.countryCompetitiveIndexStyle = Math.round(r.country_percentage) + "%";
            subcategory.isLoadingResults = false;
        });
    }

    getCategoryRanks(category, attribute) {
        this.service.getAddressRank(this.data.address_id, attribute).subscribe(r => {
            category.city = this.data.city
            category.cityRank = r.city_rank;
            category.worstCityRank = r.worst_city_rank;
            category.cityCompetitiveIndex = Math.round(r.city_percentage);
            category.cityCompetitiveIndexStyle = Math.round(r.city_percentage) + "%";
            category.country = this.data.country
            category.countryRank = r.country_rank;
            category.worstCountryRank = r.worst_country_rank;
            category.countryCompetitiveIndex = Math.round(r.country_percentage);
            category.countryCompetitiveIndexStyle = Math.round(r.country_percentage) + "%";
            category.isLoadingResults = false;
        });
    }
}
