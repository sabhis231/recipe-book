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
  @Output('loadData') loadData: EventEmitter<{
    shoppingList: ShoppingList;
    index: number;
  }> = new EventEmitter<{ shoppingList: ShoppingList; index: number }>();
  @Output('removeData') removeData: EventEmitter<{
    shoppingList: ShoppingList;
    index: number;
  }> = new EventEmitter<{ shoppingList: ShoppingList; index: number }>();

  constructor() {}

  ngOnInit(): void {
    //console.log(this.shoppingList);
  }
  onClick(listData, index) {
    this.loadData.emit({ shoppingList: listData, index: index });
  }
  onRemove(listData, index) {
    this.removeData.emit({ shoppingList: listData, index: index });
  }
}
