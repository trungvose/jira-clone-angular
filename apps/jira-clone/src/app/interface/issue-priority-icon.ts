import { IssuePriorityColors } from './ui-model/colors';
import { ProjectIssuePriority } from '@trungk18/core/graphql/service/graphql';

export class IssuePriorityIcon {
  icon: string;
  value: string;
  color: string;

  constructor(issuePriority: ProjectIssuePriority) {
    let lowerPriorities = [ProjectIssuePriority.Low, ProjectIssuePriority.Lowest];
    this.value = issuePriority;
    this.icon = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
