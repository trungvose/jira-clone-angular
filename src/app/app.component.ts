import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { ProjectQuery } from './project/state/project/project.query';
import { ProjectService } from './project/state/project/project.service';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  constructor(
    public router: Router,
    public projectQuery: ProjectQuery,
    private _cdr: ChangeDetectorRef,
    private _projectService: ProjectService,
    private _googleAnalytics: GoogleAnalyticsService
  ) {
    this._projectService.setLoading(true);

    if (environment.production) {
      this.router.events.subscribe(this.handleGoogleAnalytics);
    }
  }

  handleGoogleAnalytics = (event: any): void => {
    if (event instanceof NavigationEnd) {
      this._googleAnalytics.sendPageView(event.urlAfterRedirects);
    }
  };

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }
}
