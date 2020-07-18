import { DeleteAllRecipe } from './../store/actions/recipe.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as staticLink from '../../../assets/static.link';
import { Recipe } from '../model/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  constructor(private http: HttpClient) {}

  fetchAllRecipe() {
    return this.http.get<Recipe[]>(staticLink.recipeAPIBaseUrl + '.json');
  }

  storeRecipe(recipe: Recipe) {
    return this.http.post(staticLink.recipeAPIBaseUrl + '.json', recipe);
  }
  updateRecipe(recipe: Recipe, recipeId: string) {
    return this.http.patch(
      staticLink.recipeAPIBaseUrl + '/' + recipeId + '.json',
      recipe
    );
  }

  deleteAllRecipe() {
    return this.http.delete(staticLink.recipeAPIBaseUrl + '.json');
  }
}
