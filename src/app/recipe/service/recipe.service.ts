import { ShoppingListService } from './../../shopping-list/service/shopping-list.service';
import { ShoppingListSandbox } from './../../shopping-list/sandbox/shopping-list.sandbox';
import { Injectable } from '@angular/core';
import { Recipe } from './../model/recipe.model';
import { RecipeSandbox } from './../sandbox/recipe.sandbox';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private recipeSandbox: RecipeSandbox) {}

  loadRecipeState() {
    return this.recipeSandbox.loadRecipeState();
  }
  fetchRecipeData() {
    this.recipeSandbox.fetchRecipeData();
  }

  setRecipeInitial() {
    this.recipeSandbox.setRecipeInitial();
  }

  onStoreRecipe(recipe: Recipe) {
    this.recipeSandbox.saveRecipe(recipe);
  }
  onUpdateRecipe(recipe: Recipe, recipeId: string) {
    this.recipeSandbox.updateRecipe(recipe, recipeId);
  }
  deleteAllRecipe() {
    this.recipeSandbox.deleteAllRecipe();
  }
  setEditMode(index: number) {
    this.recipeSandbox.setEditMode(index);
  }
}
