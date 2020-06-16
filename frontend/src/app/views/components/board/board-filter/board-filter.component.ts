import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JFilter } from 'src/app/interface/filter';

@Component({
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
export class BoardFilterComponent implements OnInit {
  filter: JFilter;
  @Output() filterChanged = new EventEmitter();  
  constructor() {
    this.filter = new JFilter();
  }

  ngOnInit(): void {}

  recentUpdateChanged(){

  }

  onlyMyIssueChanged(){

  }

  resetAll(){
    
  }
}
