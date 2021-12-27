import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../core/interfaces/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() todos: Todo[] = [];

  constructor() {}

  ngOnInit(): void {}
}
