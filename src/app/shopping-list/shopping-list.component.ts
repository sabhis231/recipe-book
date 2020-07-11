import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingList } from '../shared/model/shopping-list.model';
import { ShoppingListService } from './service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.fetchShoppingList();
  }

  shoppingList: ShoppingList[] = [];
  subscription: Subscription;
  isLoading: boolean = false;
  errorMessage: string = null;
  // isNewAddedCompleted: boolean = true;
  newData: ShoppingList;
  newItemLoading: boolean = false;
  isEditing: boolean = false;

  ngOnInit() {
    this.subscription = this.shoppingListService
      .fetchAllShoppingList()
      .subscribe((slState) => {
        this.errorMessage = slState.errorMessage;
        this.isLoading = slState.isLoading;
        console.log(slState.shoppingList);
        this.shoppingList = slState.shoppingList;
        this.newData = slState.editShoppingData;
        this.isEditing = slState.isEditing;
        this.newItemLoading = slState.newItemLoading;
      });
  }
  onSubmitData(eventData) {
    console.log(this.isEditing);
    console.log(eventData);
    if (this.isEditing) {
      eventData['id'] = this.newData.id;
      this.shoppingListService.updateShoppingList(eventData);
    } else {
      this.newData = eventData;
      this.shoppingListService.storeShoppingList(eventData);
    }
  }

  onLoadData(eventData) {
    console.log(eventData);
    this.shoppingListService.startEditing(eventData);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
