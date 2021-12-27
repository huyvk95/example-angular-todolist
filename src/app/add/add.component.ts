import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TodoService } from '../core/services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      input: '',
    });
  }

  get input() {
    return this.todoForm.get('input')?.value;
  }

  onSubmit() {
    this.todoService.addTodo(this.input);
    this.todoForm.setValue({ input: '' });
  }
}
