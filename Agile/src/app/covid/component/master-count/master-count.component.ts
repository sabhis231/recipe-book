import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-master-count',
  templateUrl: './master-count.component.html',
  styleUrls: ['./master-count.component.css']
})
export class MasterCountComponent implements OnInit {
  @Input('data') masterCount:[];
  constructor() { }

  ngOnInit(): void {
  }


}
