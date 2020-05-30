import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-master-search',
  templateUrl: './master-search.component.html',
  styleUrls: ['./master-search.component.css']
})
export class MasterSearchComponent implements OnInit {
  @Input('data') masterType:string;
  constructor() { }

  ngOnInit(): void {
  }

}
