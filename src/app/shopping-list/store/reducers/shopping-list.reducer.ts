import * as shoppingListAction from '../actions/shopping-list.action';
import { ShoppingList } from './../../../shared/model/shopping-list.model';

export interface State {
  shoppingList: ShoppingList[];
  isLoading: boolean;
  shoppingListError: boolean;
  errorMessage: string;
  newItemLoading: boolean;
  isSaveOrUpdatePending: boolean;
  isEditing: boolean;
  editShoppingData: ShoppingList;
}

const initialState: State = {
  shoppingList: [],
  isLoading: false,
  shoppingListError: false,
  errorMessage: null,
  newItemLoading: false,
  isSaveOrUpdatePending: false,
  isEditing: false,
  editShoppingData: null,
};

export function ShoppingListReducer(
  state = initialState,
  action: shoppingListAction.ShoppingListActionType
) {
  switch (action.type) {
    case shoppingListAction.FETCH_SHOPPING_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case shoppingListAction.LOAD_SHOPPING_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        shoppingListError: true,
        errorMessage: action.payload,
      };
    case shoppingListAction.LOAD_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [...action.payload],
        isLoading: false,
        shoppingListError: false,
        errorMessage: null,
      };
    case shoppingListAction.SAVE_SHOPPING_LIST:
      return {
        ...state,
        // shoppingList: [...state.shoppingList, action.payload],
        shoppingListError: false,
        errorMessage: null,
        isSaveOrUpdatePending: true,
        newItemLoading: true,
      };
    case shoppingListAction.SAVE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        shoppingList: [...state.shoppingList, action.payload.shoppingData],
        shoppingListError: false,
        errorMessage: null,
        isSaveOrUpdatePending: false,
        newItemLoading: false,
      };
    case shoppingListAction.START_EDITING_SHOPPING_LISTS:
      return {
        ...state,
        isEditing: true,
        editShoppingData: action.payload,
      };
    case shoppingListAction.STOP_EDITING_SHOPPING_LISTS:
      return {
        ...state,
        isEditing: false,
        editShoppingData: action.payload,
        shoppingList: [...state.shoppingList, action.payload],
      };
    case shoppingListAction.SAVE_SHOPPING_LIST_ERROR:
      return {
        ...state,
        shoppingListError: true,
        errorMessage: action.payload,
        isSaveOrUpdatePending: false,
        newItemLoading: false,
      };
    default:
      return state;
  }
}
