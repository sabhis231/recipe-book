export class ShoppingList {
  public item: string;
  public amount: number;
  public id?: string;
  constructor(item: string, amount: number, id?: string) {
    this.item = item;
    this.amount = amount;
    this.id = id;
  }
}
