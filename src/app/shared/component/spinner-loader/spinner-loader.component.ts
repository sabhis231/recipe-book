import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss'],
})
export class SpinnerLoaderComponent implements OnInit {
  @Input('message') message: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.message);
  }
}
