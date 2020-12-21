import { InputComponent } from '@trungk18/jira-control/input/input.component';

describe('InputComponent', () => {
  let component: InputComponent;

  beforeEach(() => {
    component = new InputComponent();
  });

  it('should be able to init', () => {
    component.ngOnInit();
    expect(component.control).toBeTruthy();
  });
  it('should be able to get icon size', () => {
    expect(component.iconContainerWidth).toEqual(32);
  });
  it('should be able to get return  is Show Clear Button', () => {
    expect(typeof component.isShowClearButton).toEqual('undefined');
  });
  it('should be able to clear control', () => {
    component.ngOnInit();
    spyOn(component.control, 'patchValue').and.callThrough();
    component.clear();
    expect(component.control.patchValue).toHaveBeenCalled();
  });
});
