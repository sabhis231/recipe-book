import { Product } from './../model/Product.model';
import { ShoppingCartItem } from './Shopping-cart-item.model';

export class ShoppingCart {
    public items: ShoppingCartItem[]=[];


    constructor(private itemsMap:{[productId: string]: ShoppingCartItem}) {
        this.itemsMap= itemsMap || {};
        //console.log(this.itemsMap);
        //console.log(itemsMap);
        for (let productId in itemsMap) {
            //console.log(productId);
            let item=itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }
    
    get totalItemsCount() {
        let count=0
        //console.log(this.items);
        for(let data in this.items) {
          count += this.items[data].quantity
        }
        return count;
    }

    getQuantity(product:Product) {
        // //console.log(product);
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0 ;
    }

    get totalAmount() {
        let totalCount=0;
        for(let data in this.items) {
            totalCount +=this.items[data].totalPrice;
        }
        return totalCount;
    }
}