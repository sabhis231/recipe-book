import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  constructor() { 
    console.log(this.cart);
  }

  ngOnInit(): void {
    console.log(this.cart);
  }

}
