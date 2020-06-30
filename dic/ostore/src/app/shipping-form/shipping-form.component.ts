import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShippingDetails } from 'shared/model/Shipping-details.model';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  @Output("shippingDetails") shippingDetails = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  saveCheckOut(data:ShippingDetails) {
    console.log("fhgacdhgch");
    console.log(data);
    this.shippingDetails.emit(data);
  }

}
