import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CovidStateDistrictWise } from '../models/covid-state-district-wise.model';


@Injectable({ providedIn: 'root' })
export class CovidService {
    constructor(private http: HttpClient) {}

    public getCovidDataForStateDistrictWise() {
        
        return this.http.get<CovidStateDistrictWise[]>(
            'https://api.covid19india.org/state_district_wise.json'
        );
    }

}