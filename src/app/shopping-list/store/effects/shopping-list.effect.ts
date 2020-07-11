import { ShoppingListAPIService } from './../../service/shopping-list-api.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as shoppingListAction from '../actions/shopping-list.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';

@Injectable()
export class ShoppingListEffects {
  constructor(
    private shoppingListAPIService: ShoppingListAPIService,
    private action$: Actions
  ) {}

  @Effect()
  saveShoppingData = this.action$.pipe(
    ofType(shoppingListAction.SAVE_SHOPPING_LIST),
    switchMap((shoppingListData: shoppingListAction.SaveShoppingList) => {
      return this.shoppingListAPIService
        .saveShoppingList(shoppingListData.payload)
        .pipe(
          map((responsedata) => {
            console.log(responsedata['name']);
            return new shoppingListAction.SaveShoppingListSuccess({
              message: '',
              id: responsedata['name'],
              shoppingData: {
                ...shoppingListData.payload,
                id: responsedata['name'],
              },
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(
              new shoppingListAction.SaveShoppingListError('error occured')
            );
          })
        );
    })
  );

  @Effect()
  loadShoppingData = this.action$.pipe(
    ofType(shoppingListAction.FETCH_SHOPPING_LIST),
    switchMap(() => {
      return this.shoppingListAPIService.fetchShoppingList().pipe(
        map((resData) => {
          let shoppingData = this.getAllShoppingListFromShoppingObject(resData);
          return new shoppingListAction.LoadShoppingList(shoppingData);
        }),
        catchError((error) => {
          console.log(error);
          return of(new shoppingListAction.LoadShoppingListError('error'));
        })
      );
    })
  );

  @Effect()
  updateShoppingData = this.action$.pipe(
    ofType(shoppingListAction.UPDATE_SHOPPING_LISTS),
    switchMap((shoppingData: shoppingListAction.UpdateShoppingList) => {
      return this.shoppingListAPIService
        .updateShoppingList(shoppingData.payload)
        .pipe(
          map((resData) => {
            console.log('response', resData);
            //   let shoppingData = this.getAllShoppingListFromShoppingObject(resData);
            let shoppingList: ShoppingList = null;
            return new shoppingListAction.StopEditingShoppingLists(
              shoppingList
            );
          }),
          catchError((error) => {
            console.log(error);
            return of(new shoppingListAction.LoadShoppingListError('error'));
          })
        );
    })
  );

  private getAllShoppingListFromShoppingObject(shoppingListObject) {
    let shoppingList: ShoppingList[] = [];
    let objects = this.getAllObject(shoppingListObject);
    objects.forEach(function (id) {
      shoppingList.push({ ...shoppingListObject[id], id });
    });
    console.log(shoppingList);
    return shoppingList;
  }
  private getAllObject(object) {
    return Object.keys(object);
  }
}
