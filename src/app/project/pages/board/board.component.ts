import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '@trungk18/core/services/google-analytics.service';
import { BoardDndComponent } from '../../components/board/board-dnd/board-dnd.component';
import { BoardFilterComponent } from '../../components/board/board-filter/board-filter.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent } from '../../../jira-control/button/button.component';
import { BreadcrumbsComponent } from '../../../jira-control/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    standalone: true,
    imports: [BreadcrumbsComponent, ButtonComponent, NzIconModule, BoardFilterComponent, BoardDndComponent]
})
export class BoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];

  constructor(private _googleAnalytics: GoogleAnalyticsService) {}

  sendTwitterEventButton() {
    this._googleAnalytics.sendEvent('Share Twitter', 'button');
  }
}
