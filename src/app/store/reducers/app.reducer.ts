import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../../auth/store/reducers/auth.reducer';
import * as fromShoppingList from '../../shopping-list/store/reducers/shopping-list.reducer';
import * as fromRecipe from '../../recipe/store/reducers/recipe.reduce';

export interface AppState {
  auth: fromAuth.State;
  shoppingList: fromShoppingList.State;
  recipe: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
  recipe: fromRecipe.recipeReducer,
};
