import {GoogleAnalyticsService} from '@trungk18/core/services/google-analytics.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  beforeEach(() => {
    service = new GoogleAnalyticsService();

  });

  it('should be able to sendEvent', () => {
    service.gtag = jasmine.createSpy('gtag').and.returnValue(true);
    service.sendEvent(
     '',
     '',
     '',
     null
    );
    expect(service.gtag).toHaveBeenCalled();
  });
  it('should not be able to sendEvent', () => {
    service.gtag = false;

    expect(service.sendEvent(
      '',
      '',
      '',
      null
    )).toEqual();
  });
  it('should be able to sendPageView', () => {
    service.gtag = jasmine.createSpy('gtag').and.returnValue(true);
    service.sendPageView(
     ''
    );
    expect(service.gtag).toHaveBeenCalled();
  });
  it('should not be able to sendPageView', () => {
    service.gtag = false;

    expect(service.sendPageView(
      ''
    )).toEqual();
  });
});
