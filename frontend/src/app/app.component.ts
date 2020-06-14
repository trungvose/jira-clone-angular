import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsService } from './service/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, private _googleAnalytics: GoogleAnalyticsService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._googleAnalytics.sendPageView(event.urlAfterRedirects);
      }
    });
  }
}
