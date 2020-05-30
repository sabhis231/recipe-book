import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as CovidActions from '../action/covid.actions'
import { switchMap, map, catchError } from 'rxjs/operators';
import { CovidStateDistrictWise } from '../../models/covid-state-district-wise.model';
import { CovidService } from '../../services/covid.service';



@Injectable()
export class CovidEffects {
    @Effect()
    fetchCovidMasterCategory= this.action$.pipe(
        ofType(CovidActions.GET_STATE_DISTRICT_WISE_DATA),
        switchMap(() => {
            return this.covidService.getCovidDataForStateDistrictWise()
        }),
        map(datas => {
            console.log(datas);
          return new CovidActions.SetStateDistrictWiseData(datas);
        }),
        catchError(errorRes=>{
          return errorRes;
        })
    )
    
    constructor(
        private action$: Actions,
        private http: HttpClient, 
        private covidService: CovidService
    ) {}

}