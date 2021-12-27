import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Todo } from '../interfaces/todo';

export type CheckParams = { id: string; checked: boolean };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  save(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  load(): Todo[] {
    const data = localStorage.getItem('todos') || '[]';
    return JSON.parse(data);
  }

  private _addTodo = new Subject<string>();
  addTodo$ = this._addTodo.asObservable();
  addTodo(content: string) {
    this._addTodo.next(content);
  }

  private _removeTodo = new Subject<string>();
  removeTodo$ = this._removeTodo.asObservable();
  removeTodo(id: string) {
    this._removeTodo.next(id);
  }

  private _checkTodo = new Subject<CheckParams>();
  checkTodo$ = this._checkTodo.asObservable();
  checkTodo(data: CheckParams) {
    this._checkTodo.next(data);
  }
}
