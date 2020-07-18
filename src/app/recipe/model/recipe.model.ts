import { ShoppingList } from 'src/app/shared/model/shopping-list.model';

export class Recipe {
  //   name: string;
  //   imageUrl: string;
  //   description: string;
  //   createdOn: Date;
  //   createdBy: {
  //     email: string;
  //     isplayName: string;
  //   };
  //   shoppingData: ShoppingList[];

  constructor(
    public name: string,
    public imageUrl: string,
    public description: string,
    public createdOn: Date,
    public createdBy: {
      email: string;
      displayName: string;
    },
    public shoppingData: ShoppingList[],
    public id?: string
  ) {}
}
