import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() expanded: boolean;
  @Output() manualToggle = new EventEmitter();
  constructor() {}

  toggle() {
    this.manualToggle.emit();
  }
}
