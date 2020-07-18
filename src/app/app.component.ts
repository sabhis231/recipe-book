import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { RecipeService } from './recipe/service/recipe.service';
import { ShoppingListService } from './shopping-list/service/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'recipe-book';
  sub: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.sub.push(
      this.authService.getUser().subscribe((userData) => {
        //console.log(userData);
        if (userData) {
          this.recipeService.fetchRecipeData();
          // this.shoppingListService.fetchShoppingList();
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe);
  }
}
