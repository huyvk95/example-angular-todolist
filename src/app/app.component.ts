import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Todo } from './core/interfaces/todo';
import { CheckParams, TodoService } from './core/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'example-angular-todolist';
  todos: Todo[] = [];
  subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.load();

    const addTodoSub = this.todoService.addTodo$.subscribe(
      (content: string) => {
        const id: string = Math.floor(Math.random() * 1000).toString();
        const todo: Todo = { id, content, check: false };
        this.todos.push(todo);
        this.todoService.save(this.todos);
      }
    );
    this.subscription.add(addTodoSub);

    const removeTodoSub = this.todoService.removeTodo$.subscribe(
      (id: string) => {
        this.todos = this.todos.filter((o) => o.id !== id);
        this.todoService.save(this.todos);
      }
    );
    this.subscription.add(removeTodoSub);

    const checkTodoSub = this.todoService.checkTodo$.subscribe(
      ({ id, checked }: CheckParams) => {
        const todo = this.todos.find((o) => o.id === id);
        if (todo) {
          todo.check = checked;
          this.todoService.save(this.todos);
        }
      }
    );
    this.subscription.add(checkTodoSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
