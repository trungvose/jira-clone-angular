import { AppComponent } from '@trungk18/app.component';
import { NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let component: AppComponent;

  const router: any = {
    events: {
      subscribe: vi.fn()
    }
  };
  const projectQuery: any = {};
  const changeDetectorRef: any = {
    detectChanges: vi.fn()
  };
  const projectService: any = {
    setLoading: vi.fn()
  };
  const googleAnalyticsService: any = {
    sendPageView: vi.fn()
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
    googleAnalyticsService.sendPageView.mockReset();
    component.handleGoogleAnalytics({ });

    expect(googleAnalyticsService.sendPageView).not.toHaveBeenCalled();
  });

});
