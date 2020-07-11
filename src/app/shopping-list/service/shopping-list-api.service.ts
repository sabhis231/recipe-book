import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as environment from '../../../environments/environment';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListAPIService {
  constructor(private http: HttpClient) {}
  authKey: string = environment.environment.authKey;

  saveShoppingList(shoppingListData: ShoppingList) {
    return this.http.post(
      'https://recipe-book-8e7a7.firebaseio.com/shopping-list.json',
      shoppingListData
    );
  }
  
  updateShoppingList(shoppingListData: ShoppingList) {
    console.log('upadtes', shoppingListData);
    return this.http.patch(
      'https://recipe-book-8e7a7.firebaseio.com/shopping-list.json/' +
        shoppingListData.id,
      shoppingListData
    );
  }

  fetchShoppingList() {
    return this.http.get(
      'https://recipe-book-8e7a7.firebaseio.com/shopping-list.json'
    );
  }
}
