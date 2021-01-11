import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;

  beforeEach(() => {
    component = new NavigationComponent();
  });

  it('should be able to toggle', () => {
    spyOn(component.manualToggle, 'emit');
    component.toggle();
    expect(component.manualToggle.emit).toHaveBeenCalled();
  });
});
