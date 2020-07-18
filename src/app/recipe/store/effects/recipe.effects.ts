import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from '../../model/recipe.model';
import * as recipeAction from '../actions/recipe.actions';
import { RecipeApiService } from './../../service/recipe.api.service';

@Injectable()
export class RecipeEffects {
  constructor(
    private action$: Actions,
    private recipeApiService: RecipeApiService
  ) {}

  @Effect()
  fetchAllRecipe = this.action$.pipe(
    ofType(recipeAction.FETCH_RECIPE),
    switchMap(() => {
      //console.log('daaaä');
      return this.recipeApiService.fetchAllRecipe().pipe(
        map((resData) => {
          //console.log(resData);
          if (resData) {
            let recipes = this.getAllRecipeListFromRecipeObject(resData);
            return new recipeAction.LoadRecipe(recipes);
          } else {
            return new recipeAction.LoadRecipeError('No Recipe Data');
          }
        }),
        catchError((error) => {
          return of(new recipeAction.LoadRecipeError('Error Occured in Fetch'));
        })
      );
    })
  );

  @Effect()
  storeRecipe = this.action$.pipe(
    ofType(recipeAction.RECIPE_ADD),
    switchMap((recipeData: recipeAction.RecipeAdd) => {
      //console.log('daaaä');
      return this.recipeApiService.storeRecipe(recipeData.payload).pipe(
        map((resData) => {
          //console.log(resData);
          if (resData) {
            //console.log(resData['name']);
            return new recipeAction.RecipeAddSuccess({
              id: resData['name'],
            });
          } else {
            return new recipeAction.RecipeAddError({
              message: 'Error on Adding!',
            });
          }
        }),
        catchError((error) => {
          return of(
            new recipeAction.RecipeAddError({
              message: 'Error on Adding!',
            })
          );
        })
      );
    })
  );

  @Effect()
  updateRecipe = this.action$.pipe(
    ofType(recipeAction.RECIPE_UPDATE),
    switchMap((recipeData: recipeAction.RecipeUpdate) => {
      return this.recipeApiService
        .updateRecipe(recipeData.payload.recipe, recipeData.payload.recipeId)
        .pipe(
          map((resData) => {
            return new recipeAction.EditSuccess(resData as Recipe);
          }),
          catchError((error) => {
            return of(
              new recipeAction.EditError({ error: 'Error in Saving!' })
            );
          })
        );
    })
  );

  @Effect()
  deleteRecipe = this.action$.pipe(
    ofType(recipeAction.DELETE_ALL_RECIPE),
    switchMap(() => {
      return this.recipeApiService.deleteAllRecipe().pipe(
        map((resData) => {
          return new recipeAction.DeleteAllRecipeSuccess();
        }),
        catchError((error) => {
          return of(
            new recipeAction.DeleteAllRecipeError({
              error: 'Error Occured while Delete All',
            })
          );
        })
      );
    })
  );

  private getAllRecipeListFromRecipeObject(recipeObject) {
    let recipe: Recipe[] = [];
    let objects = this.getAllObject(recipeObject);
    objects.forEach(function (id) {
      recipe.push({ ...recipeObject[id], id });
      //console.log(recipeObject[id]['name']);
      //   recipe.push(new Recipe(recipeObject[id]['name']));
    });
    //console.log(recipe);
    return recipe;
  }
  private getAllObject(object) {
    return Object.keys(object);
  }
}
