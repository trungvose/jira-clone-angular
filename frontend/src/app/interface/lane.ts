import { JIssue } from './issue';

export interface JLane {
  id: string;
  title: string;
  issues: JIssue[];
}
