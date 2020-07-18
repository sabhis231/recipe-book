import { Recipe } from './../../model/recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPE_INITIAL = 'SET_RECIPE_INITIAL';
export const RECIPE_ADD = 'RECIPE_ADD';
export const RECIPE_ADD_SUCCESS = 'RECIPE_ADD_SUCCESS';
export const RECIPE_ADD_ERROR = 'RECIPE_ADD_ERROR';
export const FETCH_RECIPE = 'FETCH_RECIPE';
export const LOAD_RECIPE = 'LOAD_RECIPE';
export const LOAD_RECIPE_ERROR = 'LOAD_RECIPE_ERROR';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_ERROR = 'EDIT_ERROR';
export const RECIPE_UPDATE = 'RECIPE_UPDATE';
export const DELETE_ALL_RECIPE = 'DELETE_ALL_RECIPE';
export const DELETE_ALL_RECIPE_SUCCESS = 'DELETE_ALL_RECIPE_SUCCESS';
export const DELETE_ALL_RECIPE_ERROR = 'DELETE_ALL_RECIPE_ERROR';

export class SetRecipeInitial implements Action {
  readonly type = SET_RECIPE_INITIAL;
  //   constructor(public payload: Recipe) {}
}
export class RecipeAdd implements Action {
  readonly type = RECIPE_ADD;
  constructor(public payload: Recipe) {}
}
export class RecipeAddSuccess implements Action {
  readonly type = RECIPE_ADD_SUCCESS;
  constructor(public payload: { id: string }) {}
}
export class RecipeAddError implements Action {
  readonly type = RECIPE_ADD_ERROR;
  constructor(public payload: { message: string }) {}
}
export class LoadRecipe implements Action {
  readonly type = LOAD_RECIPE;
  constructor(public payload: Recipe[]) {}
}
export class LoadRecipeError implements Action {
  readonly type = LOAD_RECIPE_ERROR;
  constructor(public payload: string) {}
}
export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
  //   constructor(public payload: Recipe) {}
}
export class SetEditMode implements Action {
  readonly type = SET_EDIT_MODE;
  constructor(public payload: number) {}
}
export class RecipeUpdate implements Action {
  readonly type = RECIPE_UPDATE;
  constructor(public payload: { recipe: Recipe; recipeId: string }) {}
}
export class EditSuccess implements Action {
  readonly type = EDIT_SUCCESS;
  constructor(public payload: Recipe) {}
}
export class EditError implements Action {
  readonly type = EDIT_ERROR;
  constructor(public payload: { error: string }) {}
}
export class DeleteAllRecipe implements Action {
  readonly type = DELETE_ALL_RECIPE;
  // constructor(public payload: { error: string }) {}
}
export class DeleteAllRecipeSuccess implements Action {
  readonly type = DELETE_ALL_RECIPE_SUCCESS;
  // constructor(public payload: { error: string }) {}
}
export class DeleteAllRecipeError implements Action {
  readonly type = DELETE_ALL_RECIPE_ERROR;
  constructor(public payload: { error: string }) {}
}

export type RecipeActionType =
  | RecipeAdd
  | LoadRecipe
  | LoadRecipeError
  | RecipeAddSuccess
  | RecipeAddError
  | SetEditMode
  | EditSuccess
  | EditError
  | SetRecipeInitial
  | RecipeUpdate
  | DeleteAllRecipe
  | DeleteAllRecipeError
  | DeleteAllRecipeSuccess;
