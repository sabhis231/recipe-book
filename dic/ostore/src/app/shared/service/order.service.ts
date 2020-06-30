import { ShoppingCartService } from './shopping-cart.service';
import { Order } from 'shared/model/Order.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private dbFire: AngularFireDatabase) { }

  createOrder(order: Order) {

    let oderData= this.dbFire.list('/orders/').push(order);
    this.shoppingCartService.clearCart();
    return oderData;
  }

  getAllOrder():AngularFireList<Order> {
  
    return this.dbFire.list("/orders/");
  }
  
  getOrderByUserId(userId: string):AngularFireList<Order> {
    return this.dbFire.list("/orders/", ref => ref.orderByChild('userId').equalTo(userId));
  }

}
