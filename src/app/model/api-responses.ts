interface AddressResponse {
    address_id: string;
    housenumber: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
}

interface AddressDetailsResponse {
    address_id: number;
    amenity_parking: number;
    amenity_bench: number;
    amenity_retaurant: number;
    amenity_place_of_worship: number;
    amenity_school: number;
    amenity_waste_basket: number;
    amenity_post_box: number;
    amenity_recycling: number;
    amenity_cafe: number;
    amenity_bycycle_parking: number;
    amenity_fuel: number;
    amenity_parking_space: number;
    amenity_fast_food: number;
    amenity_shelter: number;
    amenity_pharmacy: number;
    amenity_bank: number;
    amenity_drinking_water: number;
    amenity_hunting_stand: number;
    amenity_pub: number;
    amenity_kindergarten: number;
    amenity_vending_machine: number;
    amenity_bar: number;
    amenity_toilets: number;
    amenity_atm: number;
    amenity_post_office: number;
    amenity_telephone: number;
    amenity_fountain: number;
    amenity_townhall: number;
    amenity_doctors: number;
    amenity_fire_station: number;
    amenity_waste_disposal: number;
    amenity_grave_yary: number;
    amenity_community_centre: number;
    amenity_public_building: number;
    amenity_car_wash: number;
    amenity_police: number;
    amenity_library: number;
    amenity_parking_entrance: number;
    amenity_hospital: number;
    amenity_social_facility: number;
    amenity_dentist: number;
    amenity_clinic: number;
    amenity_university: number;
    amenity_charging_station: number;
    amenity_taxi: number;
    amenity_bicycle_rental: number;
    amenity_marketplace: number;
    amenity_theatre: number;
    amenity_veterinary: number;
    amenity_bus_station: number;
    building_yes: number;
    building_house: number;
    building_residential: number;
    building_garage: number;
    building_apartments: number;
    building_industrial: number;
    building_shed: number;
    building_roof: number;
    building_hut: number;
    building_detached: number;
    building_garages: number;
    building_terrace: number;
    building_greenhouse: number;
    building_barn: number;
    building_farm_auxiliary: number;
    building_commercial: number;
    building_school: number;
    building_church: number;
    building_retail: number;
    building_construction: number;
    building_service: number;
    building_cabin: number;
    building_civic: number;
    building_farm: number;
    building_warehouse: number;
    building_manufacture: number;
    building_semidetached_house: number;
    building_static_caravan: number;
    building_office: number;
    building_chapel: number;
    building_public: number;
    building_bungalow: number;
    building_ruins: number;
    building_hospital: number;
    building_hotel: number;
    building_hangar: number;
    building_university: number;
    building_kindergarten: number;
    building_semi: number;
    building_collapsed: number;
    building_transportation: number;
    building_stable: number;
    building_transformer_tower: number;
    building_train_station: number;
    building_houseboat: number;
    building_trullo: number;
    building_bunker: number;
    building_entrance: number;
    building_storage_tank: number;
    building_dormitory: number;
    shop_convenience: number;
    shop_supermarket: number;
    shop_clothes: number;
    shop_hairdresser: number;
    shop_bakery: number;
    shop_car_repair: number;
    shop_car: number;
    shop_yes: number;
    shop_kiosk: number;
    shop_butcher: number;
    shop_florist: number;
    shop_shoes: number;
    shop_beauty: number;
    shop_furniture: number;
    shop_doityourself: number;
    shop_optician: number;
    shop_jewelry: number;
    shop_bicycle: number;
    shop_electronics: number;
    shop_alcohol: number;
    shop_mobil_phone: number;
    shop_books: number;
    shop_hardware: number;
    shop_gift: number;
    shop_chemist: number;
    shop_greengrocer: number;
    shop_mall: number;
    shop_travel_agency: number;
    shop_newsagent: number;
    shop_car_parts: number;
    shop_sports: number;
    shop_garden_centre: number;
    shop_vacant: number;
    shop_computer: number;
    shop_pet: number;
    shop_confectionery: number;
    shop_variety_store: number;
    shop_stationery: number;
    shop_beverages: number;
    shop_toys: number;
    shop_department_store: number;
    shop_laundry: number;
    shop_tobacco: number;
    shop_interior_decoration: number;
    shop_dry_cleaning: number;
    shop_farm: number;
    shop_cosmetics: number;
    shop_deli: number;
    shop_funeral_directors: number;
    shop_boutique: number;
    water_area: number;
    green_area: number;
    buildings_area: number;
    streets_area: number;
    bus_distance: number;
    train_distance: number;
    motorway_distance: number;
    airport_distance: number;
    housenumber: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
    lng: string;
    lat: string;
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

interface ScoreResponse {
    score: number;
}

interface BestForInterestsResponse {
    food_living: number;
    travel: number;
    leasure: number;
    art_culture: number;
    sportsshopping: number;
}

interface BestForPeopleResponse {
    families: number;
    teenagers: number;
    students: number;
    professionals: number;
    bestagers: number;
    elderly: number;
}

interface AddressRankResponse {
    object: string;
    address_id: number;
    country: string;
    country_rank: number;
    worst_country_rank: number;
    city: string;
    city_rank: number;
    worst_city_rank: number;
    city_percentage: number;
    country_percentage: number;
}

interface Address {
    address_id: number;
    city: string;
    country: string;
    housenumber: string;
    postcode: string;
    street: string;
}

interface CityResponse {
    items: Address[];
    total_count: number;
}

interface PostCodeResponse {
    items: Address[];
    total_count: number;
}

interface CountryResponse {
    items: Address[];
    total_count: number;
}

interface CountryCitiesResponse {
    items: Array<string>;
    total_count: number;
}

export {
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
};
