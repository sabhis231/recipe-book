import * as CovidActions from '../action/covid.actions';
import { CovidMasterCategory } from '../../models/covid-master-category.model';
import { CovidStateDistrictWise } from '../../models/covid-state-district-wise.model';

export interface State {
    covidStateDistrictWise:CovidStateDistrictWise[];
}
const initialStore: State = {
    covidStateDistrictWise: []
}

export function covidReducer (
    state=initialStore, 
    action:CovidActions.CovidActions
    ) {
    switch(action.type) {
        case CovidActions.SET_STATE_DISTRICT_WISE_DATA:
            return {
                ...state,
                covidStateDistrictWise: action.payload
            }
        default :
            return state;
    }
}
