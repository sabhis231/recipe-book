import { Product } from 'shared/model/Product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/service/product.service';
import { Catgeory } from 'shared/model/Category.model';
import { CategoryService } from 'shared/service/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  catgeories: Catgeory[];
  catgeory$: any;
  product:Product={
    title:'',
    imageUrl:'',
    category:'',
    price:0,
    key:''
  };
  id:string;
  isNew:boolean = true;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route:ActivatedRoute) { 
    this.loadData();
  }

  ngOnInit(): void {
  }


  loadData() {

    this.categoryService.getCategories().valueChanges().subscribe(catgeoryData=>{
      this.catgeories=catgeoryData;
    });

   this.id = this.route.snapshot.paramMap.get('id');

   if(this.id) {
      this.productService.fetchProductById(this.id).valueChanges().pipe(take(1)).subscribe(productData=>{
        this.product=productData;
        this.isNew=false;
      });
    }
  }


  saveProduct(product){
    if(this.id) {
      this.productService.updateProduct(this.id, product);
    }else {
      this.productService.createProduct(product);
    }
    this.router.navigate(['admin/products']);
  }

  deleteProduct() {
    if(!confirm("Do you really want to delete the Product ?")) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['admin/products']);
  }

}
