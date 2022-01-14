import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";

import { AddressResponse } from "../model/api-responses";

import { ApiService } from "../service/api.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {
    @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
    @Input() page: string;
    @Input() formClass: string;
    lng = 0;
    lat = 0;

    constructor(private service: ApiService,
                private router: Router) {
    }

    ngOnInit() {
    }

    formatAddress(response: any): string {
        const addressComponents = []
        if (response.city != null) {
            addressComponents.push(response.city.replace(new RegExp(" ", "g"), "-"));
        }
        if (response.street != null) {
            addressComponents.push(response.street.replace(new RegExp(" ", "g"), "-"));
        }
        if (response.housenumber != null) {
            addressComponents.push(response.housenumber.replace(new RegExp(" ", "g"), "-"));
        }
        if (response.postcode != null) {
            addressComponents.push(response.postcode.replace(new RegExp(" ", "g"), "-"));
        }
        return addressComponents.join("-");
    }

    public handleAddressChange(address: Address) {
        this.lng = address.geometry.location.lng();
        this.lat = address.geometry.location.lat();
        this.service.getAddress(this.lng.toFixed(6), this.lat.toFixed(6)).subscribe((response: AddressResponse) => {
            const formattedAddress = this.formatAddress(response);
            this.router.navigate([`/address/${response.address_id}/${formattedAddress}`]);
        });
    }

    findMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lng = position.coords.longitude;
                this.lat = position.coords.latitude;
                this.service.getAddress(this.lng.toFixed(6), this.lat.toFixed(6)).subscribe((response: AddressResponse) => {
                    const address = this.formatAddress(response);
                    this.router.navigate([`/address/${response.address_id}/${address}`]);
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
}
