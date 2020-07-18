import { Recipe } from './../model/recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/reducers/app.reducer';
import * as fromRecipeAction from '../store/actions/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipeSandbox {
  constructor(private store: Store<fromAppState.AppState>) {}

  loadRecipeState() {
    return this.store.select('recipe');
  }

  setRecipeInitial() {
    this.store.dispatch(new fromRecipeAction.SetRecipeInitial());
  }

  fetchRecipeData() {
    this.store.dispatch(new fromRecipeAction.FetchRecipe());
  }

  saveRecipe(recipe: Recipe) {
    this.store.dispatch(new fromRecipeAction.RecipeAdd(recipe));
  }
  updateRecipe(recipe: Recipe, recipeId: string) {
    this.store.dispatch(
      new fromRecipeAction.RecipeUpdate({ recipe: recipe, recipeId: recipeId })
    );
  }
  deleteAllRecipe() {
    this.store.dispatch(new fromRecipeAction.DeleteAllRecipe());
  }
  setEditMode(index: number) {
    this.store.dispatch(new fromRecipeAction.SetEditMode(index));
  }
}
