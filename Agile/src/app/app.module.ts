import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanBoardComponent } from './pages/kanban-board/kanban-board.component';
import { StoreModule } from '@ngrx/store';
import { NavBarComponent } from './covid/nav-bar/nav-bar.component';
import { CovidMainComponent } from './covid/covid-main/covid-main.component';
import { MasterSearchComponent } from './covid/component/master-search/master-search.component';
import { MasterSearchResultComponent } from './covid/component/master-search-result/master-search-result.component';
import { MasterCountComponent } from './covid/component/master-count/master-count.component';
import { SingleCountComponent } from './covid/component/single-count/single-count.component';
import { HttpClientModule } from '@angular/common/http';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CovidEffects } from './covid/store/effect/covid.effects';



@NgModule({
  declarations: [
    AppComponent,
    KanbanBoardComponent,
    NavBarComponent,
    CovidMainComponent,
    MasterSearchComponent,
    MasterSearchResultComponent,
    MasterCountComponent,
    SingleCountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([CovidEffects]),
    DragDropModule
  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
