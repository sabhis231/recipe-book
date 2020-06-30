import { Product } from 'shared/model/Product.model';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { ShoppingCartItem } from 'shared/model/Shopping-cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  // shoppingCartItems: ShoppingCartItem[]=[];
  shoppingCartCount: number = 0;
  itemKeys: string[]= [];
  shoppingCart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit(){
    let cartData$ = await this.shoppingCartService.getCart();
    cartData$.
    subscribe(shoppingCartData=>{
      this.shoppingCart=shoppingCartData;
      //console.log(this.shoppingCart);
     });
  }

  removeFromCart() {

  }

   removeItemFromCart(product:Product) {
    //console.log(product);
    this.shoppingCartService.removefromCart(product);
  }

  addItemToCart(product:Product) {
    //console.log(product);
    this.shoppingCartService.addToCart(product);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
