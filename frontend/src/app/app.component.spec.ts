import { AppComponent } from '@trungk18/app.component';
import { NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let component: AppComponent;

  const router: any = {
    events: {
      subscribe: jasmine.createSpy('subscribe')
    }
  };
  const projectQuery: any = {};
  const changeDetectorRef: any = {
    detectChanges: jasmine.createSpy('detectChanges')
  };
  const projectService: any = {
    setLoading: jasmine.createSpy('setLoading').and.callThrough()
  };
  const googleAnalyticsService: any = {
    sendPageView: jasmine.createSpy('sendPageView').and.callThrough()
  };

  beforeEach(() => {
    environment.production = true;
    component = new AppComponent(
      router,
      projectQuery,
      changeDetectorRef,
      projectService,
      googleAnalyticsService
    );
  });
  it('should be able to set Loading', () => {
    expect(router.events.subscribe).toHaveBeenCalled();
    expect(projectService.setLoading).toHaveBeenCalledWith(true);
  });
  it('should be able to make ng After View Init', () => {
    component.ngAfterViewInit();
    expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
  });
  it('should be able to handle Google Analytics', () => {
    component.handleGoogleAnalytics( new NavigationEnd(1, '/', '/'));

    expect(googleAnalyticsService.sendPageView).toHaveBeenCalled();
  });
  it('should not be able to handle Google Analytics', () => {
    googleAnalyticsService.sendPageView.calls.reset();
    component.handleGoogleAnalytics({ });

    expect(googleAnalyticsService.sendPageView).not.toHaveBeenCalled();
  });

});
