import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Catgeory } from 'shared/model/Category.model';
import { CategoryService } from 'shared/service/category.service';
import { ProductService } from 'shared/service/product.service';
import { Product } from 'shared/model/Product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // product:Product[];
  products: Product[]=[];
  filterProducts: Product[]=[];
  product$;
  categories: Catgeory[]=[];
  filterCatgeory: Catgeory[]=[];
  selectedCatgeory: string='';
  cart: any;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.loadData();
  }


  //  this.productService.fetchProduct()
  //   .snapshotChanges().subscribe(productsData => {
  //     productsData.forEach(item => {
  //         let a = item.payload.toJSON();
  //         a['key'] = item.key;
  //         this.products.push(a as Product)
  //       })
  //     this.filterProducts=this.products;
  //     this.route.queryParamMap.subscribe(route=>{
  //       let category=route.get('category');
  //       this.filterProducts=(category) ?
  //       this.products.filter(p=>p.category.toLowerCase().includes(category.toLowerCase())):
  //       this.products;
  
  //     })
  //   });

  loadData() {

    this.productService.fetchProduct()
    .snapshotChanges().pipe(
      switchMap(productsData => {
        productsData.forEach(item => {
            let a = item.payload.toJSON();
            a['key'] = item.key;
            this.products.push(a as Product)
          });
          return this.route.queryParamMap;
        })
    ).subscribe(route=>{
      this.selectedCatgeory=route.get('category');
      this.filterProducts=(this.selectedCatgeory) ?
      this.products.filter(p=>p.category.toLowerCase().includes(this.selectedCatgeory.toLowerCase())):
      this.products;

    })

    this.categoryService.getCategories().snapshotChanges().subscribe(categoryData=>{
      categoryData.forEach(item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          this.categories.push(a as Catgeory)
        })
      this.filterCatgeory=this.categories;
    });
  }
  
 async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(data=>{
      this.cart=data;
      //console.log(data);
    });
  }

  removeItemFromCart(product:Product) {
    //console.log(product);
    this.shoppingCartService.removefromCart(product);
  }

  addItemToCart(product:Product) {
    //console.log(product);
    this.shoppingCartService.addToCart(product);
  }

}
