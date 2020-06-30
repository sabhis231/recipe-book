import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { Product } from 'shared/model/Product.model';


@Component({
  selector: 'app-product-cart-button',
  templateUrl: './product-cart-button.component.html',
  styleUrls: ['./product-cart-button.component.scss']
})
export class ProductCartButtonComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart:ShoppingCart;
  @Output('removeItem') removeItem: EventEmitter<void> = new EventEmitter<void>();
  @Output('addItem') addItem: EventEmitter<void> = new EventEmitter<void>();

  quantityData: number=0;

  constructor() { }

  ngOnInit(): void {
  }

  removeFromCart(){
    this.removeItem.emit();
  }

  addToCart(){
    this.addItem.emit();
  }



}
