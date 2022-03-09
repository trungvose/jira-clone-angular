import { AutofocusDirective } from '@trungk18/core/directives/autofocus.directive';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AutofocusDirective', () => {
  let component: any;
  const elementRef: any = {
    nativeElement: {
      focus: jasmine.createSpy('nativeElement')
    }
  };

  beforeEach(() => {
    component = new AutofocusDirective(
      elementRef
    );
  });

  it('should be able to make ng After Content Init', fakeAsync(() => {
    component.ngAfterContentInit();
    tick(10);
    expect(component.enable).toBe(true);
    expect(elementRef.nativeElement.focus).toHaveBeenCalled();
  }));
  it('should be able to make ng After Content Init and destroy', fakeAsync(() => {
    component.ngAfterContentInit();
    tick(10);
    component.ngOnDestroy();
    expect(component.timer).toEqual(null);
  }));
});
