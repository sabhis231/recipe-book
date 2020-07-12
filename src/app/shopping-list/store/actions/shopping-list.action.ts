import { ShoppingList } from './../../../shared/model/shopping-list.model';
import { Action } from '@ngrx/store';

export const FETCH_SHOPPING_LIST = 'FETCH_SHOPPING_LIST';
export const LOAD_SHOPPING_LIST = 'LOAD_SHOPPING_LIST';
export const LOAD_SHOPPING_LIST_ERROR = 'LOAD_SHOPPING_LIST_ERROR';
export const SAVE_SHOPPING_LIST = 'SAVE_SHOPPING_LIST';
export const SAVE_SHOPPING_LIST_SUCCESS = 'SAVE_SHOPPING_LIST_SUCCESS';
export const SAVE_SHOPPING_LIST_ERROR = 'SAVE_SHOPPING_LIST_Error';
export const SAVE_SHOPPING_LISTS = 'SAVE_SHOPPING_LISTS';
export const UPDATE_SHOPPING_LISTS = 'UPDATE_SHOPPING_LISTS';
export const START_EDITING_SHOPPING_LISTS = 'START_EDITING_SHOPPING_LISTS';
export const STOP_EDITING_SHOPPING_LISTS = 'STOP_EDITING_SHOPPING_LISTS';
export const DELETE_SHOPPING_LIST_DATA = 'DELETE_SHOPPING_LIST_DATA';
export const DELETE_SHOPPING_LIST_DATA_SUCCESS =
  'DELETE_SHOPPING_LIST_DATA_SUCCESS';

export class FetchShoppingList implements Action {
  readonly type = FETCH_SHOPPING_LIST;
}
export class LoadShoppingListError implements Action {
  readonly type = LOAD_SHOPPING_LIST_ERROR;
  constructor(public payload: string) {}
}

export class LoadShoppingList implements Action {
  readonly type = LOAD_SHOPPING_LIST;
  constructor(public payload: ShoppingList[]) {}
}

export class SaveShoppingList implements Action {
  readonly type = SAVE_SHOPPING_LIST;
  constructor(public payload: ShoppingList) {}
}
export class SaveShoppingListSuccess implements Action {
  readonly type = SAVE_SHOPPING_LIST_SUCCESS;
  constructor(
    public payload: { message: string; id: string; shoppingData: ShoppingList }
  ) {}
}
export class SaveShoppingListError implements Action {
  readonly type = SAVE_SHOPPING_LIST_ERROR;
  constructor(public payload: string) {}
}

export class SaveShoppingLists implements Action {
  readonly type = SAVE_SHOPPING_LISTS;
  constructor(public payload: ShoppingList[]) {}
}

export class UpdateShoppingList implements Action {
  readonly type = UPDATE_SHOPPING_LISTS;
  constructor(public payload: ShoppingList) {}
}

export class StartEditingShoppingLists implements Action {
  readonly type = START_EDITING_SHOPPING_LISTS;
  constructor(
    public payload: { shoppingListData: ShoppingList; index: number }
  ) {}
}

export class StopEditingShoppingLists implements Action {
  readonly type = STOP_EDITING_SHOPPING_LISTS;
  constructor(public payload: ShoppingList) {}
}

export class DeleteShoppingListData implements Action {
  readonly type = DELETE_SHOPPING_LIST_DATA;
  constructor(
    public payload: { shoppingListData: ShoppingList; index: number }
  ) {}
}

export class DeleteShoppingListDataSuccess implements Action {
  readonly type = DELETE_SHOPPING_LIST_DATA_SUCCESS;
  constructor(public payload: ShoppingList) {}
}

export type ShoppingListActionType =
  | LoadShoppingList
  | SaveShoppingList
  | SaveShoppingLists
  | FetchShoppingList
  | SaveShoppingListSuccess
  | SaveShoppingListError
  | StartEditingShoppingLists
  | StopEditingShoppingLists
  | UpdateShoppingList
  | LoadShoppingListError
  | DeleteShoppingListData
  | DeleteShoppingListDataSuccess;
