import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-count',
  templateUrl: './single-count.component.html',
  styleUrls: ['./single-count.component.css']
})
export class SingleCountComponent implements OnInit {
  @Input('status') status:string;

  @Input('count') count:number;
  
  @Input('increment') increment:number;

  constructor() { }

  ngOnInit(): void {
    
  }
 
 

}
