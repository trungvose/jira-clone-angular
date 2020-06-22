import { IssuePriority, IssuePriorityColors } from './issue';

export class IssuePriorityIcon {
  name: string;
  value: string;
  color: string;

  constructor(issuePriority: IssuePriority) {
    let lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.value = issuePriority;
    this.name = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
