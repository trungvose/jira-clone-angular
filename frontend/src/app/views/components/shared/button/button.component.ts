import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'j-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() className: string = 'btn-primary';
  @Input() icon: string;
  @Input() iconSize: number = 18;
  @Input() isWorking: boolean;
  @Input() isActive: boolean;
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
