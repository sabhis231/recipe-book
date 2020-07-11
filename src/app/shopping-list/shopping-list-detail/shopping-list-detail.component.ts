import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss'],
})
export class ShoppingListDetailComponent implements OnInit {
  @Input('shoppingList') shoppingList: ShoppingList[];
  // @Input('isNewAddedCompleted') isNewAddedCompleted?: boolean;
  @Input('newItemLoading') newItemLoading?: boolean;
  @Input('newData') newData?: { item: string; amount: string };
  @Output('loadData') loadData: EventEmitter<ShoppingList> = new EventEmitter<
    ShoppingList
  >();

  constructor() {}

  ngOnInit(): void {
    console.log(this.shoppingList);
  }
  onClick(event) {
    this.loadData.emit(event);
  }
}
