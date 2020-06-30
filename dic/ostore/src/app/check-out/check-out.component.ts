import { ShippingDetails } from 'shared/model/Shipping-details.model';
import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { Router } from '@angular/router';
import { Order } from 'shared/model/Order.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/service/auth.service';
import { ShoppingCartItem } from 'shared/model/Shopping-cart-item.model';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { OrderService } from 'shared/service/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) { }

    async ngOnInit() {

    this.cartSubscription= (await this.shoppingCartService.getCart()).subscribe(data=>{
      this.cart=data;
      console.log(this.cart);
    })

    this.userSubscription=this.authService.userObh$.subscribe(data=>{
      this.userId= data.uid;
    })

  }

   async saveShippingDetails(shippingDetails:ShippingDetails){
     console.log(shippingDetails);
     console.log(this.cart);
    let order= new Order(this.userId,shippingDetails,this.cart.items)
    let order$ = await this.orderService.createOrder(order);
    this.router.navigate(['/order-sucess',order$.key]);
  }


  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
