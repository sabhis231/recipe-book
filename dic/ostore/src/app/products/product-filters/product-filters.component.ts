import { Catgeory } from 'shared/model/Category.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {
  @Input("categories") categories: Catgeory[]=[];
  @Input("selectedCatgeory") selectedCatgeory: string='';

  constructor() { }

  ngOnInit(): void {
  }

}
