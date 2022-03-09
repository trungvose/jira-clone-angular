import {AvatarComponent} from '@trungk18/jira-control/avatar/avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  beforeEach(() => {
    component = new AvatarComponent();
  });

  it('should be able to get styles', () => {
    expect(component.style.width).toEqual('12px');
    expect(component.style.height).toEqual('12px');
  });
});
