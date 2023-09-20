import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ResizerComponent } from '../resizer/resizer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarLeftComponent } from '../navbar-left/navbar-left.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [NavbarLeftComponent, SidebarComponent, ResizerComponent]
})
export class NavigationComponent {
  @Input() expanded: boolean;
  @Output() manualToggle = new EventEmitter();
  constructor() {}

  toggle() {
    this.manualToggle.emit();
  }
}
