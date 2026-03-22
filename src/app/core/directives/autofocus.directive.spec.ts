import { AutofocusDirective } from '@trungk18/core/directives/autofocus.directive';

describe('AutofocusDirective', () => {
  let component: any;
  const elementRef: any = {
    nativeElement: {
      focus: vi.fn()
    }
  };

  beforeEach(() => {
    vi.useFakeTimers();
    component = new AutofocusDirective(
      elementRef
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to make ng After Content Init', () => {
    component.ngAfterContentInit();
    vi.advanceTimersByTime(10);
    expect(component.enable).toBe(true);
    expect(elementRef.nativeElement.focus).toHaveBeenCalled();
  });
  it('should be able to make ng After Content Init and destroy', () => {
    component.ngAfterContentInit();
    vi.advanceTimersByTime(10);
    component.ngOnDestroy();
    expect(component.timer).toEqual(null);
  });
});
