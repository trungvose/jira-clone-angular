import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'j-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() avatarUrl: string;
  @Input() name: string;
  @Input() size = 12;
  @Input() rounded = true;
  @Input() className = '';

  style: {};

  constructor() {}

  ngOnInit(): void {
    this.style = {
      width: `${this.size}px`,
      height: `${this.size}px`,
      'background-image': `url('${this.avatarUrl}')`,
      'border-radius': this.rounded ? '100%' : '3px'
    };
  }
}
