import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'j-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type = "button"
  @Input() className: string = 'btn-primary';
  @Input() icon: string;
  @Input() iconSize: number = 18;
  @Input() isWorking: boolean;
  @Input() isActive: boolean;
  @Input() disabled: boolean

  constructor() {}

  ngOnInit(): void {}
  
}
