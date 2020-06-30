import { ShippingDetails } from './Shipping-details.model';
import { ShoppingCartItem } from './Shopping-cart-item.model';
export class Order {
    
    public date:number;

    constructor(public userId:string, public shipping: ShippingDetails, public items:ShoppingCartItem[]) {
        this.date=new Date().getTime();
    }

}