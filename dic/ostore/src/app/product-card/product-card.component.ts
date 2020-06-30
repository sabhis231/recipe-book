import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { Product } from 'shared/model/Product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('showAction') showAction?: boolean=true;
  @Input('shoppingCart') shoppingCart:ShoppingCart;
  @Output('removeItem') removeItem: EventEmitter<void> = new EventEmitter<void>();
  @Output('addItem') addItem: EventEmitter<void> = new EventEmitter<void>();

  

  constructor(
    private shoppingCartService: ShoppingCartService
  ){

  }

  ngOnInit() {
    
  }

  removeFromCart(){
    this.removeItem.emit();
  }

  addToCart(){
    this.addItem.emit();
  }

}
