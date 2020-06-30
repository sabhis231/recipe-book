import { AuthService } from 'shared/service/auth.service';
import { Order } from 'shared/model/Order.model';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from 'shared/service/order.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[]=[];
  displayName: string;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {
  
    this.authService.userObh$.pipe(switchMap(user=>{
       this.displayName=user.displayName;
      return this.orderService.getOrderByUserId(user.uid).valueChanges()
    })).subscribe(data=>{
      this.orders=data;
    });
    
  }

}
