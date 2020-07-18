import { RecipeEffects } from './recipe/store/effects/recipe.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './auth/store/effects/auth.effects';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecipeAddComponent } from './recipe/recipe-add/recipe-add.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SpinnerLoaderComponent } from './shared/component/spinner-loader/spinner-loader.component';
import { AuthInterceptorService } from './shared/interceptor/auth-interceptor.service';
import { ShoppingListDetailComponent } from './shopping-list/shopping-list-detail/shopping-list-detail.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEffects } from './shopping-list/store/effects/shopping-list.effect';
import { appReducer } from './store/reducers/app.reducer';
import { SnackBarComponent } from './shared/component/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthComponent,
    RecipeComponent,
    ShoppingListComponent,
    SpinnerLoaderComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeAddComponent,
    ShoppingListDetailComponent,
    ShoppingListEditComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, ShoppingListEffects, RecipeEffects]),
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
