import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

import {
    AddressResponse,
    AddressDetailsResponse,
    ScoreResponse,
    BestForInterestsResponse,
    BestForPeopleResponse,
    AddressRankResponse,
    CityResponse,
    PostCodeResponse,
    CountryResponse,
    CountryCitiesResponse
} from "./../model/api-responses";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    url: string;

    constructor(private httpClient: HttpClient) {
        this.url = environment.apiUrl;
    }

    getAddress(lng: string, lat: string): Observable<AddressResponse> {
        return this.httpClient.get<AddressResponse>(this.url + `/address?lat=${lat}&lng=${lng}`);
    }

    getAddressDetails(id: string): Observable<AddressDetailsResponse> {
        return this.httpClient.get<AddressDetailsResponse>(this.url + `/address_details?id=${id}`);
    }

    /*getCityRank(addressID: number, city: string, country: string, attribute: string): Observable<RankResponse> {
        return this.httpClient.get<RankResponse>(this.url + `/address_rank?address_id=${addressID}&country=${country}&city=${city}&attribute=${attribute}`);
    }

    getCountryRank(addressID: number, country: string, attribute: string): Observable<RankResponse> {
        return this.httpClient.get<RankResponse>(this.url + `/address_rank?address_id=${addressID}&country=${country}&attribute=${attribute}`);
    }*/

    getAddressRank(addressID: number, attribute: string): Observable<AddressRankResponse> {
        return this.httpClient.get<AddressRankResponse>(this.url + `/address_rank?address_id=${addressID}&attribute=${attribute}`);
    }

    getCityAddresses(city: string, page: number, pageSize: number): Observable<CityResponse> {
        return this.httpClient.get<CityResponse>(this.url + `/addressesof_city?city=${city}&page=${page + 1}&amount=${pageSize}`);
    }

    getPostCodeAddresses(postcode: string, page: number, pageSize: number): Observable<PostCodeResponse> {
        return this.httpClient.get<PostCodeResponse>(this.url + `/addressesof_postcode?postcode=${postcode}&page=${page + 1}&amount=${pageSize}`);
    }

    getCountryAddresses(country: string, page: number, pageSize: number): Observable<CountryResponse> {
        return this.httpClient.get<CountryResponse>(this.url + `/addressesof_country?country=${country}&page=${page + 1}&amount=${pageSize}`);
    }

    getCountryCities(country: string, page: number, pageSize: number): Observable<CountryCitiesResponse> {
        return this.httpClient.get<CountryCitiesResponse>(this.url + `/allcitiesfrom_country?country=${country}&page=${page + 1}&amount=${pageSize}`);
    }
}
