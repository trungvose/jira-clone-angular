import { IssuePrioritySelectComponent } from '@trungk18/project/components/add-issue-modal/issue-priority-select/issue-priority-select.component';
import { IssuePriority } from '@trungk18/interface/issue';

describe('IssuePrioritySelectComponent', () => {
  let component: IssuePrioritySelectComponent;
  beforeEach(() => {
    component = new IssuePrioritySelectComponent();
  });

  it('should be able to get Priority Icon', () => {
    console.log(component.getPriorityIcon(IssuePriority.LOW));
    const expectedIcon = component.getPriorityIcon(IssuePriority.LOW);
    expect(expectedIcon.value).toEqual('Low');
    expect(expectedIcon.icon).toEqual('arrow-down');
    expect(expectedIcon.color).toEqual('#2D8738');
  });
});
