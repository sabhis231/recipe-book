import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../../auth/store/reducers/auth.reducer';
import * as fromShoppingList from '../../shopping-list/store/reducers/shopping-list.reducer';

export interface AppState {
  auth: fromAuth.State;
  shoppingList: fromShoppingList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  shoppingList: fromShoppingList.ShoppingListReducer
};
