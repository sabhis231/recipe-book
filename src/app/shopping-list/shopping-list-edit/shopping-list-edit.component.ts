import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';
import { ShoppingListService } from './../service/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
})
export class ShoppingListEditComponent implements OnInit {
  @Output('shoppingData') shoppingData: EventEmitter<
    ShoppingList
  > = new EventEmitter<ShoppingList>();
  shoppingList: FormGroup;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService
      .fetchAllShoppingList()
      .subscribe((shoppingData) => {
        //console.log(shoppingData.editShoppingData);
        let shoppingdata = shoppingData.editShoppingData;
        if (shoppingData.isEditing)
          this.shoppingList.setValue({
            item: shoppingdata.item,
            amount: shoppingdata.amount,
          });
      });
    this.shoppingList = new FormGroup({
      item: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  onclear() {
    this.shoppingList.reset();
  }
  onSubmit() {
    this.shoppingData.emit(this.shoppingList.value);
    this.onclear();
  }
}
