import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';
import  * as KanbanBoardAction from '../action/kanban-board.action';

const initialState={
    columns: [
        new Column ('Ideas', [
          new Task (1,"Some random idea"),
          new Task (5,"This is another random idea"),
          new Task (6,"build an awesome application")
        ]),
        // new Column('Research', [
        //   new Task (2,"Lorem ipsum"),
        //   new Task (3,"foo"),
        //   new Task (7,"This was in the 'Research' column")
        // ]),
        // new Column('Todo', [
        //   new Task (9,'Get to work'),
        //   new Task (4,'Pick up groceries'),
        //   new Task (12,'Go home'),
        //   new Task (11,'Fall asleep')
        // ]),
        new Column('Done', [
          new Task (15,'Get up'),
          new Task (19,'Brush teeth'),
          new Task (18,'Take a shower'),
          new Task (17,'Check e-mail'),
          new Task (14,'Walk dog')
        ])
      ]
}
export function kanbanBoardReducer(state = initialState, action:KanbanBoardAction.GetKanbanData){
    switch(action.type) {
        case KanbanBoardAction.GET_KANBAN_DATA:
          return state;
        default:
          return state;
    }
}