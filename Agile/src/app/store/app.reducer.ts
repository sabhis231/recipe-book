import * as fromCovidReducer from '../covid/store/reducer/covid.reducer'
import { ActionReducerMap } from '@ngrx/store'


export interface AppState {
    covid: fromCovidReducer.State;
    // auth: fromAuth.State;
    // recipes: fromRecipes.State;
  }
  
  export const appReducer: ActionReducerMap<AppState> = {
    covid: fromCovidReducer.covidReducer,
    // auth: fromAuth.authReducer,
    // recipes: fromRecipes.recipeReducer
  };