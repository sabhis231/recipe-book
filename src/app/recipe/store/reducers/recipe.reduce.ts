import * as fromRecipeActions from '../actions/recipe.actions';
import { Recipe } from './../../model/recipe.model';
export interface State {
  recipe: Recipe[];
  isRecipeLoading: boolean;
  isRecipeError: boolean;
  isSaveLoading: boolean;
  isSavingError: boolean;
  isSavingSucess: boolean;
  isEditMode: boolean;
  index: number;
  selectedRecipe: Recipe;
  isEditSuccess: boolean;
  isEditError: boolean;
  editErrorMessage: string;
  isAllDeleted: boolean;
  allDeletedError: string;
}
const initialState: State = {
  recipe: [],
  isRecipeLoading: true,
  isRecipeError: false,
  isSaveLoading: false,
  isSavingError: false,
  isSavingSucess: false,
  isEditMode: false,
  index: -1,
  selectedRecipe: null,
  isEditSuccess: false,
  isEditError: false,
  editErrorMessage: null,
  isAllDeleted: false,
  allDeletedError: null,
};

export function recipeReducer(
  state = initialState,
  action: fromRecipeActions.RecipeActionType
) {
  switch (action.type) {
    case fromRecipeActions.SET_RECIPE_INITIAL:
      return {
        ...state,
        isRecipeLoading: true,
        isRecipeError: false,
        isSaveLoading: false,
        isSavingError: false,
        isSavingSucess: false,
        isEditMode: false,
        index: -1,
        selectedRecipe: null,
        isEditSuccess: false,
        isEditError: false,
        editErrorMessage: null,
      };
    case fromRecipeActions.LOAD_RECIPE:
      const tempRec = [...action.payload];
      let selectedRecipe = null;
      if (state.index != -1) {
        selectedRecipe = { ...tempRec[state.index] };
      }
      return {
        ...state,
        isRecipeError: false,
        recipe: tempRec,
        isRecipeLoading: false,
        selectedRecipe: selectedRecipe,
        isAllDeleted: false,
        allDeletedError: null,
      };
    case fromRecipeActions.LOAD_RECIPE_ERROR:
      return {
        ...state,
        isRecipeError: true,
        isRecipeLoading: true,
      };
    case fromRecipeActions.RECIPE_ADD:
      return {
        ...state,
        isSaveLoading: true,
        isSavingError: false,
        isSavingSucess: false,
        recipe: [...state.recipe, action.payload],
      };
    case fromRecipeActions.RECIPE_ADD_SUCCESS:
      let recipeIndex = state.recipe.length - 1;
      let updatedRecipe = { ...state.recipe[recipeIndex] };
      updatedRecipe.id = action.payload.id;
      let updatedRecipes = [...state.recipe];
      updatedRecipes[recipeIndex] = updatedRecipe;
      return {
        ...state,
        isSaveLoading: false,
        recipe: updatedRecipes,
        isSavingError: false,
        isSavingSucess: true,
      };
    case fromRecipeActions.RECIPE_ADD_ERROR:
      let recipeIndexs = state.recipe.length - 1;
      let recipes = [...state.recipe];
      let updatedRecipess = recipes.splice(recipeIndexs, 1);
      return {
        ...state,
        isSaveLoading: false,
        recipe: updatedRecipess,
        isSavingError: true,
        isSavingSucess: false,
      };
    case fromRecipeActions.SET_EDIT_MODE:
      return {
        ...state,
        isEditMode: true,
        index: action.payload,
        selectedRecipe: { ...state.recipe[action.payload] },
        isEditSuccess: false,
        isEditError: false,
        editErrorMessage: null,
        isSaveLoading: false,
        isSavingError: false,
        isSavingSucess: false,
      };
    // case fromRecipeActions.RECIPE_UPDATE:
    //   return {
    //     ...state,
    //     isEditMode: true,
    //     // index: action.payload,
    //     // selectedRecipe: { ...state.recipe[action.payload] },
    //     isEditSuccess: false,
    //     isEditError: false,
    //     editErrorMessage: null,
    //   };
    case fromRecipeActions.EDIT_SUCCESS:
      let allRecipe = [...state.recipe];
      allRecipe[state.index] = action.payload;
      return {
        ...state,
        isEditMode: false,
        index: -1,
        selectedRecipe: null,
        isEditSuccess: true,
        isEditError: false,
        editErrorMessage: null,
        recipe: allRecipe,
      };
    case fromRecipeActions.EDIT_ERROR:
      return {
        ...state,
        isEditSuccess: false,
        isEditError: true,
        editErrorMessage: action.payload.error,
      };
    case fromRecipeActions.DELETE_ALL_RECIPE_SUCCESS:
      return {
        ...state,
        isAllDeleted: true,
        recipe: [],
        allDeletedError: null,
      };
    case fromRecipeActions.DELETE_ALL_RECIPE_ERROR:
      return {
        ...state,
        isAllDeleted: false,
        allDeletedError: action.payload.error,
      };
    default:
      return state;
  }
}
