import { Action } from '@ngrx/store';
import { CovidMasterCategory } from '../../models/covid-master-category.model';
import { CovidStateDistrictWise } from '../../models/covid-state-district-wise.model';

export const GET_COVID_MASTER_CATEGORY = "[Covid] GET_COVID_MASTER_CATEGORY";
export const SET_COVID_MASTER_CATEGORY = "[Covid] SET_COVID_MASTER_CATEGORY";
export const GET_STATE_DISTRICT_WISE_DATA = "[Covid] GET_STATE_DISTRICT_WISE_DATA";
export const SET_STATE_DISTRICT_WISE_DATA = "[Covid] SET_STATE_DISTRICT_WISE_DATA"

export class GetCovidMasterCategory implements Action {
    readonly type = GET_COVID_MASTER_CATEGORY;
}

export class SetCovidMasterCategory implements Action {
    readonly type = SET_COVID_MASTER_CATEGORY;
    // constructor(public payload:CovidStateDistrictWise) {}
}

export class GetStateDistrictWiseData implements Action {
    readonly type = GET_STATE_DISTRICT_WISE_DATA;
}
export class SetStateDistrictWiseData implements Action {
    readonly type = SET_STATE_DISTRICT_WISE_DATA;

    constructor(public payload:CovidStateDistrictWise[]){}
}

export type CovidActions =
  | GetCovidMasterCategory
  | SetCovidMasterCategory
  | GetStateDistrictWiseData
  | SetStateDistrictWiseData
