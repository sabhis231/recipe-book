import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'shared/model/Order.model';
import { OrderService } from 'shared/service/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[]=[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.orderService.getAllOrder().valueChanges().
    pipe(map(ordersData => ordersData)).subscribe(orders=>{
      console.log(orders);
      this.orders=orders;
  });

  }

}
