import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { ProjectService } from './project/state/project/project.service';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';
import { RootQuery } from './core/store/root.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  constructor(
    public router: Router,
    public rootQuery: RootQuery,
    private _cdr: ChangeDetectorRef,
    private _projectService: ProjectService,
    private _googleAnalytics: GoogleAnalyticsService,
  ) {
    if (environment.production) {
      this.handleGoogleAnalytics();
    }
  }

  handleGoogleAnalytics() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._googleAnalytics.sendPageView(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }
}
