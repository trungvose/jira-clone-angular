import { Component, Input } from '@angular/core';

@Component({
    selector: 'svg-icon',
    templateUrl: './svg-icon.component.html',
    standalone: true
})
export class SvgIconComponent {
  @Input() name: string;
  @Input() size = 16;
  @Input() fill = 'currentColor';
  window: any = window;

  constructor() {}

  get iconUrl() {
    return `${this.window.location.href}#${this.name}`;
  }
}
