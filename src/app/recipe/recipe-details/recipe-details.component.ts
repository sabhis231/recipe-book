import { Recipe } from './../model/recipe.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  @Input('selectedRecipe') selectedRecipe: Recipe;
  @Output('editRecipe') editRecipe: EventEmitter<void>= new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
  onEdit() {
    this.editRecipe.emit();
  }
}
