import { ShoppingListSandbox } from './../sandbox/shopping-list.sandbox';
import { Injectable } from '@angular/core';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  constructor(private shoppingListSandbox: ShoppingListSandbox) {}

  fetchAllShoppingList() {
    return this.shoppingListSandbox.getShoppingListState();
  }

  fetchShoppingList() {
    this.shoppingListSandbox.fetchShoppingList();
  }

  storeShoppingList(shoppingListData: ShoppingList) {
    //console.log("storeShoppingList")
    return this.shoppingListSandbox.storeShoppingList(shoppingListData);
  }
  updateShoppingList(shoppingListData: ShoppingList) {
      //console.log("Updatedata")
    return this.shoppingListSandbox.updateShoppingList(shoppingListData);
  }

  startEditing(shoppingListData: ShoppingList, index:number) {
      return this.shoppingListSandbox.startEditing(shoppingListData, index);
  }
  deleteData(shoppingListData: ShoppingList, index:number) {
      return this.shoppingListSandbox.deleteData(shoppingListData, index);
  }

  getShoppingList() {
    return this.shoppingListSandbox.getShoppingList();
  }

  getIsLoading() {
    return this.shoppingListSandbox.getIsLoading();
  }
}
