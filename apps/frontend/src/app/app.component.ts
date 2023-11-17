import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { ProjectQuery } from '@trunk18/project';
import { ProjectService } from '@trunk18/project';
import { GoogleAnalyticsService } from '@trunk18/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./custom-styles/_quill.scss', './custom-styles/_form.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
