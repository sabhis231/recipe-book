import { Subscription } from 'rxjs';
import { RecipeService } from './service/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from './model/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe;
  selectedIndex: number = 0;
  sub: Subscription[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeService.setRecipeInitial();
    this.sub.push(
      this.recipeService.loadRecipeState().subscribe((recipeState) => {
        this.recipes = recipeState.recipe;
        if (recipeState.recipe) {
          this.selectedRecipe = recipeState.recipe[0];
        }
      })
    );
  }

  addNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onLoadRecipeDetails(recipe: Recipe, i: number) {
    this.selectedRecipe = recipe;
    this.selectedIndex = i;
  }

  editRecipe() {
    this.router.navigate(['edit', this.selectedIndex], {
      relativeTo: this.route,
    });
  }

  deleteAllRecipe() {
    this.recipeService.deleteAllRecipe();
  }

  ngOnDestroy() {
    //console.log(this.sub);
    this.sub.forEach((s) => s.unsubscribe());
  }
}
