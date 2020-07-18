import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as environment from '../../../environments/environment';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';
import * as staticLink from '../../../assets/static.link';

@Injectable({ providedIn: 'root' })
export class ShoppingListAPIService {
  constructor(private http: HttpClient) {}
  authKey: string = environment.environment.authKey;

  saveShoppingList(shoppingListData: ShoppingList) {
    return this.http.post(
      staticLink.shoppingListAPIBaseUrl + '.json',
      shoppingListData
    );
  }

  updateShoppingList(shoppingListData: ShoppingList) {
    return this.http.patch(
      staticLink.shoppingListAPIBaseUrl + '/' + shoppingListData.id + '.json',
      shoppingListData
    );
  }
  deleteShoppingListData(shoppingListData: ShoppingList) {
    return this.http.delete(
      staticLink.shoppingListAPIBaseUrl + '/' + shoppingListData.id + '.json'
    );
  }

  fetchShoppingList() {
    return this.http.get(staticLink.shoppingListAPIBaseUrl + '.json');
  }
}
