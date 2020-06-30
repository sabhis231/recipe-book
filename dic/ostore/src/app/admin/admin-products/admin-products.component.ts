import { Product } from 'shared/model/Product.model';

import { Subscription } from 'rxjs';
import { ProductService } from 'shared/service/product.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[]=[];
  filterProducts: Product[]=[];
  items: Product[];
  itemCount:number;
  productSub= Subscription;
  

  constructor(
    private productService: ProductService
  ) { 
    
    this.productService.fetchProduct()
    .snapshotChanges().subscribe(productsData => {
      productsData.forEach(item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          this.products.push(a as Product)
        })
      this.filterProducts=this.products;
    })
  }

  ngOnInit(): void {
  }

  filterTitle(query: string) {
    //console.log(query);
    this.filterProducts=(query) ?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
  }
}
