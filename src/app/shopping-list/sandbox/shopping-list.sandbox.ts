import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/reducers/app.reducer';
import { map } from 'rxjs/operators';
import * as shoppingListAction from '../store/actions/shopping-list.action';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListSandbox {
  constructor(private store: Store<fromAppState.AppState>) {}

  getShoppingListState() {
    return this.store.select('shoppingList');
  }

  fetchShoppingList() {
    this.store.dispatch(new shoppingListAction.FetchShoppingList());
  }

  getShoppingList() {
    return this.getShoppingListState().pipe(
      map((shoppingListState) => {
        return shoppingListState.shoppingList;
      })
    );
  }

  getIsLoading() {
    return this.getShoppingListState().pipe(
      map((shoppingListState) => {
        return shoppingListState.isLoading;
      })
    );
  }
  getShoopingListError() {
    return this.getShoppingListState().pipe(
      map((shoppingListState) => {
        return shoppingListState.shoppingListError;
      })
    );
  }
  startEditing(shoppingListData: ShoppingList, index: number) {
    this.store.dispatch(
      new shoppingListAction.StartEditingShoppingLists({
        shoppingListData: shoppingListData,
        index: index,
      })
    );
  }
  deleteData(shoppingListData: ShoppingList, index: number) {
    this.store.dispatch(
      new shoppingListAction.DeleteShoppingListData({
        shoppingListData: shoppingListData,
        index: index,
      })
    );
  }

  storeShoppingList(shoppingListData: ShoppingList) {
    //console.log(shoppingListData);
    return this.store.dispatch(
      new shoppingListAction.SaveShoppingList(shoppingListData)
    );
  }
  updateShoppingList(shoppingListData: ShoppingList) {
    //console.log(shoppingListData);
    return this.store.dispatch(
      new shoppingListAction.UpdateShoppingList(shoppingListData)
    );
  }
}
