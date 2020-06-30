import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { map } from 'rxjs/operators';
import { Product } from 'shared/model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private dbFire:AngularFireDatabase) { }

  createProduct(product) {
    this.dbFire.list('/products/').push(product);
  }

  fetchProduct() {
    return this.dbFire.list('/products/');
  }

  fetchProductById(productId): AngularFireObject<Product> {
    return this.dbFire.object('/products/' +productId);
  }

  updateProduct(productId, product) {
    return this.dbFire.object('/products/'+productId).update(product);
  }

  deleteProduct(productId) {
    return this.dbFire.object('/products/'+productId).remove();
  }

}
