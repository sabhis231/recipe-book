import { Action } from '@ngrx/store';
export const GET_KANBAN_DATA = 'GET_KANBAN_DATA'

export class GetKanbanData implements Action{
    readonly type = GET_KANBAN_DATA;   
}