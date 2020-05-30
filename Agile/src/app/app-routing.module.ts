import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { KanbanBoardComponent } from './pages/kanban-board/kanban-board.component';
import { CovidMainComponent } from './covid/covid-main/covid-main.component';


const routes: Routes = [
  {path:'', component:CovidMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
