import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingList } from 'src/app/shared/model/shopping-list.model';
import { AuthService } from './../../auth/service/auth.service';
import { User } from './../../shared/model/user.model';
import { ShoppingListService } from './../../shopping-list/service/shopping-list.service';
import { Recipe } from './../model/recipe.model';
import { RecipeService } from './../service/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  user: User;
  isError: boolean = false;
  isSaved: boolean = false;
  recipeForm: FormGroup;
  recipeName: string = '';
  recipeImage: string = '';
  recipeDescrip: string = '';
  ingred: FormArray = new FormArray([]);
  index: number = 0;
  isEdit: boolean = false;
  recipeId: string = null;
  isEditSuccess: boolean = false;
  isEditError: boolean = false;
  isSavingSucess: boolean = false;

  sub: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sub.push(
      this.authService.getUser().subscribe((user) => {
        this.user = user;
      })
    );

    this.sub.push(
      this.route.params.subscribe((param) => {
        if (param.id) {
          this.index = +param.id;
          this.recipeService.setEditMode(this.index);
        }
      })
    );
    this.addNewIngred();
    this.onForInit();
  }

  onForInit() {
    this.sub.push(
      this.recipeService.loadRecipeState().subscribe((recipeState) => {
        //console.log('###########################', recipeState);
        this.isError = recipeState.isSavingError;
        this.isSaved = recipeState.isSaveLoading;
        this.isEdit = recipeState.isEditMode;
        this.isEditSuccess = recipeState.isEditSuccess;
        this.isEditError = recipeState.isEditError;
        this.isSavingSucess = recipeState.isSavingSucess;
        if (!recipeState.isEditMode && !recipeState.isRecipeLoading) {
        } else if (recipeState.isEditMode) {
          this.recipeId = recipeState.selectedRecipe.id;
          this.recipeName = recipeState.selectedRecipe.name;
          this.recipeDescrip = recipeState.selectedRecipe.description;
          this.recipeImage = recipeState.selectedRecipe.imageUrl;
          this.addNewIngred(recipeState.selectedRecipe.shoppingData);
        }
        this.recipeForm = new FormGroup({
          name: new FormControl(this.recipeName, Validators.required),
          image: new FormControl(this.recipeImage, Validators.required),
          description: new FormControl(this.recipeDescrip, Validators.required),
          ingreds: this.ingred,
        });
      })
    );
  }

  onSave() {
    let ingreds = this.recipeForm.get('ingreds').value;
    let shoppingListData: ShoppingList[] = [];
    for (let ingred of ingreds) {
      shoppingListData.push(
        new ShoppingList(ingred['ingred'], ingred['amount'])
      );
    }
    let recipe: Recipe = new Recipe(
      this.recipeForm.get('name').value,
      this.recipeForm.get('image').value,
      this.recipeForm.get('description').value,
      new Date(),
      {
        email: this.user.emailId,
        displayName: '',
      },
      shoppingListData
    );
    if (this.isEdit) {
      this.recipeService.onUpdateRecipe(recipe, this.recipeId);
    } else {
      this.recipeService.onStoreRecipe(recipe);
    }
    // this.recipeForm.reset();
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingreds') as FormArray).controls;
  }

  addNewIngred(shoppingListData?: ShoppingList[]) {
    if (shoppingListData) {
      this.ingred = new FormArray([]);
      for (let shoppingData of shoppingListData) {
        this.ingred.push(
          new FormGroup({
            ingred: new FormControl(shoppingData.item, Validators.required),
            amount: new FormControl(shoppingData.amount, Validators.required),
          })
        );
      }
    } else {
      this.ingred.push(
        new FormGroup({
          ingred: new FormControl('', Validators.required),
          amount: new FormControl('', Validators.required),
        })
      );
    }
  }
  removeIngred(index) {
    (this.recipeForm.get('ingreds') as FormArray).removeAt(index);
  }
  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
