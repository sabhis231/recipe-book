import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { User } from 'shared/model/User.model';
import { AuthService } from 'shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  shoppingCart: ShoppingCart;
  
  user: User;

  constructor( 
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService ) { 
    this.loadNavData();
  }

  async ngOnInit() {
    let cartData$ = await this.shoppingCartService.getCart();
    //console.log(cartData$);
    cartData$.
    subscribe(shoppingCartData=>{
      //console.log(shoppingCartData);
      this.shoppingCart=shoppingCartData;
     });

  }

  logOut() {
   this.authService.doLogout();
  } 

  loadNavData() {
    this.authService.getUserdata().subscribe(data=>{
      this.user=data;
    });
  }

}
