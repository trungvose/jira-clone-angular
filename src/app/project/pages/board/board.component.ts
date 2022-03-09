import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '@trungk18/core/services/google-analytics.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];

  constructor(private _googleAnalytics: GoogleAnalyticsService) {}

  sendTwitterEventButton() {
    this._googleAnalytics.sendEvent('Share Twitter', 'button');
  }
}
