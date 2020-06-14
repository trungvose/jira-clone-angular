import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
export class BoardFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
