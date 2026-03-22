import { Component, Input } from '@angular/core';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';

@Component({
    selector: 'app-resizer',
    templateUrl: './resizer.component.html',
    styleUrls: ['./resizer.component.scss'],
    imports: [SvgIconComponent]
})
export class ResizerComponent {
  @Input() expanded: boolean;

  get icon() {
    return this.expanded ? 'chevron-left' : 'chevron-right';
  }
  constructor() {}
}
