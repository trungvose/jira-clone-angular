export class JFilter {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  recentUpdate: boolean;

  get any(): boolean {
    return !!this.searchTerm || !!this.userIds?.length || this.onlyMyIssue || this.recentUpdate;
  }
}
