import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../core/interfaces/todo';
import { TodoService } from '../core/services/todo.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.todoService.checkTodo({
      id: this.todo.id,
      checked: event.target.checked,
    });
  }

  onRemove() {
    this.todoService.removeTodo(this.todo.id)
  }
}
