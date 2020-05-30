import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  constructor(private store : Store<{kanbanBoard:{columns:Column[]}}>) { }
   columns: Observable<{columns:Column[]}>; 
  ngOnInit(): void {
    this.columns=this.store.select('kanbanBoard');
  }

  data2:string='';
  // columns: Column[] = [
  //   new Column('Ideas', [
  //     new Task (1,"Some random idea"),
  //     new Task (5,"This is another random idea"),
  //     new Task (6,"build an awesome application")
  //   ]),
  //   new Column('Research', [
  //     new Task (2,"Lorem ipsum"),
  //     new Task (3,"foo"),
  //     new Task (7,"This was in the 'Research' column")
  //   ]),
  //   new Column('Todo', [
  //     new Task (9,'Get to work'),
  //     new Task (4,'Pick up groceries'),
  //     new Task (12,'Go home'),
  //     new Task (11,'Fall asleep')
  //   ]),
  //   new Column('Done', [
  //     new Task (15,'Get up'),
  //     new Task (19,'Brush teeth'),
  //     new Task (18,'Take a shower'),
  //     new Task (17,'Check e-mail'),
  //     new Task (14,'Walk dog')
  //   ])
  // ];



  drop(event: CdkDragDrop<string[]>, el) {
    
    console.log('data:::::', event);
    let messageId = el.getAttribute('data-message-id');
    console.log("Message Id: ", messageId);
    console.log(event.item.data);
    console.log(event.previousContainer.data[event.previousIndex]);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("trasfer ArrayItem")
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        console.log(event.previousIndex,
          event.currentIndex)
    }
  }

  openModel(item) {
    console.log("OPen Model called ::", item);
  }

}
