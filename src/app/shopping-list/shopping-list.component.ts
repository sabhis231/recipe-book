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
  loadData: ShoppingList;
  newItemLoading: boolean = false;
  isEditing: boolean = false;
  isSuccess: string = null;

  ngOnInit() {
    this.subscription = this.shoppingListService
      .fetchAllShoppingList()
      .subscribe((slState) => {
        //console.log("*************************", slState);
        this.errorMessage = slState.errorMessage;
        this.isLoading = slState.isLoading;
        this.shoppingList = slState.shoppingList;
        this.loadData = slState.editShoppingData;
        this.isEditing = slState.isEditing;
        this.newItemLoading = slState.newItemLoading;
        this.isSuccess=slState.isSuccess;
      });
  }
  onSubmitData(eventData) {
    this.newData = eventData;
    //console.log(this.isEditing);
    //console.log(eventData);
    if (this.isEditing) {
      eventData['id'] = this.loadData.id;
      this.shoppingListService.updateShoppingList(eventData);
    } else {
      this.newData = eventData;
      this.shoppingListService.storeShoppingList(eventData);
    }
  }

  onLoadData(eventData) {
    //console.log(eventData);
    this.shoppingListService.startEditing(
      eventData['shoppingList'],
      eventData['index']
    );
  }
  onDeleteData(eventData) {
    //console.log(eventData);
    this.shoppingListService.deleteData(
      eventData['shoppingList'],
      eventData['index']
    );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
