import { Injectable } from '@angular/core';
declare var gtag: any;
const GOOGLE_ANALYTICS_ID = 'UA-80363801-4';
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() {
  }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    if (!gtag) {
      return;
    }
    gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  public sendPageView(url: string) {
    if (!gtag) {
      return;
    }
    gtag('config', GOOGLE_ANALYTICS_ID, { page_path: url });
  }
}
