import { Product } from 'shared/model/Product.model';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCart } from 'shared/model/Shopping-cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private dbFire: AngularFireDatabase
  ) { }


  async clearCart() {
    let cartId= await this.getOrCreateCartId();
    this.dbFire.object('/shopping-carts/'+cartId+'/items/').remove();   
  }

  private createCart() {
    return this.dbFire.list('/shopping-carts/').push({
      dateCreated:new Date().getTime()
    });
  } 

   async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return (this.dbFire.object('/shopping-carts/'+cartId).snapshotChanges()).pipe(
      map(data=>{
        if(data.payload.toJSON())
          return new ShoppingCart((data.payload.toJSON())["items"]);
          else {
            return new ShoppingCart({});
          }
      })
    );
  }

  private getItem(cartId, productId) {
    return this.dbFire.object('/shopping-carts/' + cartId + "/items/" + productId);
  }

  private createCartItem(cartId, product:Product) {
    return this.dbFire.list('/shopping-carts/' + cartId + "/items/").push(product);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('ostore-cartId');
    if(cartId) return cartId;

    let key=null;
    let cart$=await this.createCart()
    localStorage.setItem("ostore-cartId",cart$.key);
    return cart$.key;
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ =  this.getItem(cartId,product["key"]);
    items$.snapshotChanges().pipe(take(1)).subscribe(data=>{
      if(!data.payload.toJSON()) {
        items$.update({product:product,quantity:1});
      }else {
        let quantity= +data.payload.toJSON()['quantity'] + change;
        if(quantity===0) items$.remove();
        else
        items$.update({product:product,quantity:quantity});
        
      }
    });
  }

  async addToCart(product:Product) {
    this.updateItemQuantity(product, 1);
  }

  async removefromCart(product:Product) {
    this.updateItemQuantity(product, -1);
  }

}
