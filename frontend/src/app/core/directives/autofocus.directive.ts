import { AfterContentInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

const BASE_TIMER_DELAY = 10;

@Directive({
  selector: '[jAutofocus]'
})
export class AutofocusDirective implements AfterContentInit, OnDestroy {
  @Input('jAutofocus') enable: boolean | string;
  @Input() timerDelay: number = BASE_TIMER_DELAY;

  private elementRef: ElementRef;
  private timer: any;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.timer = null;
  }

  public ngAfterContentInit(): void {
    this.setDefaultValue();
    if (this.enable) {
      this.startFocusWorkflow();
    }
  }

  public ngOnDestroy(): void {
    this.stopFocusWorkflow();
  }

  private setDefaultValue() {
    if (this.enable === false) {
      return;
    }
    this.enable = true;
  }

  private startFocusWorkflow(): void {
    if (this.timer) {
      return;
    }

    this.timer = setTimeout((): void => {
      this.timer = null;
      this.elementRef.nativeElement.focus();
    }, this.timerDelay);
  }

  private stopFocusWorkflow(): void {
    clearTimeout(this.timer);
    this.timer = null;
  }
}
