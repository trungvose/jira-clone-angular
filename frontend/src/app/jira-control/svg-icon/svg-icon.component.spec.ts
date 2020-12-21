import {SvgIconComponent} from '@trungk18/jira-control/svg-icon/svg-icon.component';

describe('SvgIconComponent', () => {
  let component: SvgIconComponent;

  beforeEach(() => {
    component = new SvgIconComponent();
    component.name = 'test';
    component.window = {
      location: {
        href: ''
      }
    };
  });

  it('should be able to get icon url ', () => {
    expect(component.iconUrl).toEqual('#test');
  });
});
