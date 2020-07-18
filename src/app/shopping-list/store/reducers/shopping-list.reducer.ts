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
  editingIndex: number;
  isSuccess: string;
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
  editingIndex: -1,
  isSuccess: null,
};

export function shoppingListReducer(
  state = initialState,
  action: shoppingListAction.ShoppingListActionType
) {
  switch (action.type) {
    case shoppingListAction.FETCH_SHOPPING_LIST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        isSuccess: null,
        isEditing: false,
      };
    case shoppingListAction.LOAD_SHOPPING_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        shoppingListError: true,
        errorMessage: action.payload,
        isSuccess: null,
        isEditing: false,
      };
    case shoppingListAction.LOAD_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [...action.payload],
        isLoading: false,
        shoppingListError: false,
        errorMessage: null,
        isSuccess: 'Fetch Done!',
      };
    case shoppingListAction.SAVE_SHOPPING_LIST:
      return {
        ...state,
        // shoppingList: [...state.shoppingList, action.payload],
        shoppingListError: false,
        errorMessage: null,
        isSaveOrUpdatePending: true,
        newItemLoading: true,
        isSuccess: null,
      };
    case shoppingListAction.SAVE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        shoppingList: [...state.shoppingList, action.payload.shoppingData],
        shoppingListError: false,
        errorMessage: null,
        isSaveOrUpdatePending: false,
        newItemLoading: false,
        isSuccess: 'Save Done!',
      };
    case shoppingListAction.START_EDITING_SHOPPING_LISTS:
      return {
        ...state,
        isEditing: true,
        editingIndex: +action.payload.index,
        editShoppingData: action.payload.shoppingListData,
        isSuccess: null,
        errorMessage: null,
      };
    case shoppingListAction.STOP_EDITING_SHOPPING_LISTS:
      let newData = action.payload;
      let updatedDatas = [...state.shoppingList];
      updatedDatas[state.editingIndex] = newData;

      return {
        ...state,
        isEditing: false,
        editShoppingData: action.payload,
        editingIndex: -1,
        shoppingList: updatedDatas,
        errorMessage: null,
        isSuccess: 'Edit Done!',
      };
    case shoppingListAction.SAVE_SHOPPING_LIST_ERROR:
      return {
        ...state,
        shoppingListError: true,
        errorMessage: action.payload,
        isSaveOrUpdatePending: false,
        newItemLoading: false,
        isSuccess: null,
      };
    case shoppingListAction.DELETE_SHOPPING_LIST_DATA:
      return {
        ...state,
        isEditing: false,
        editingIndex: +action.payload.index,
        editShoppingData: action.payload.shoppingListData,
        // shoppingList: state.shoppingList.filter((shoppingListData, index) => {
        //   return index != action.payload.index;
        // }),
        isSuccess: null,
      };
    case shoppingListAction.DELETE_SHOPPING_LIST_DATA_SUCCESS:
      return {
        ...state,
        isEditing: false,
        shoppingList: state.shoppingList.filter((shoppingListData, index) => {
          return index != +state.editingIndex;
        }),
        errorMessage: null,
        isSuccess: 'Delete Done!',
      };
    default:
      return state;
  }
}
