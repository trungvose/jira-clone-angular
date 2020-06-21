import { IssuePriority, IssuePriorityColors } from './issue';

export class IssuePriorityIcon {
  name: string;
  label: string;
  color: string;

  constructor(issuePriority: IssuePriority) {
    let lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.label = issuePriority;
    this.name = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
