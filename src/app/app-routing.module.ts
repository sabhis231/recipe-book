import { RecipeAddComponent } from './recipe/recipe-add/recipe-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from './shared/guard/auth-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'recipe', component: RecipeComponent, canActivate: [AuthGuard] },
  { path: 'recipe/new', component: RecipeAddComponent, canActivate: [AuthGuard] },
  { path: 'recipe/edit/:id', component: RecipeAddComponent, canActivate: [AuthGuard] },
  { path: '**', component: RecipeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
