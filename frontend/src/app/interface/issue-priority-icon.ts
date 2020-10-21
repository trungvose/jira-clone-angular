import { IssuePriority, IssuePriorityColors } from './issue';

export class IssuePriorityIcon {
  icon: string;
  value: string;
  color: string;

  constructor(issuePriority: IssuePriority) {
    const lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.value = issuePriority;
    this.icon = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
