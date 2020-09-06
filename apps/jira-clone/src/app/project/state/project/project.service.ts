import { Injectable } from '@angular/core';
import { arrayUpdate, setLoading } from '@datorama/akita';
import {
  CreateIssueGQL,
  CreateIssueMutationVariables,
  FindProjectBySlugGQL,
  MoveIssueBetweenLanesGQL,
  ProjectDto,
  ProjectIssueDto,
  ReorderIssuesGQL,
  UpdateIssueGQL,
  UpdateMarkdownGQL,
  MoveIssueBetweenLanesMutationVariables,
  UpdateIssueDetailDto,
} from '@trungk18/core/graphql/service/graphql';
import { JComment } from '@trungk18/interface/comment';
import { FetchResult } from 'apollo-link';
import { environment } from 'apps/jira-clone/src/environments/environment';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ProjectState, ProjectStore } from './project.store';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl: string;

  constructor(
    private _store: ProjectStore,
    private _findProjectBySlugGql: FindProjectBySlugGQL,
    private _createIssueGql: CreateIssueGQL,
    private _reorderIssueGql: ReorderIssuesGQL,
    private _moveIssueBetweenLanesGql: MoveIssueBetweenLanesGQL,
    private _updateIssueGql: UpdateIssueGQL,
    private _updateMarkdownGql: UpdateMarkdownGQL,
  ) {
    this.baseUrl = environment.apiUrl;
  }

  private get _raw(): ProjectState {
    return this._store.getValue();
  }

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  getProject(slug: string): Observable<FetchResult> {
    this.setLoading(true);
    return this._findProjectBySlugGql
      .fetch({
        slug,
      })
      .pipe(
        tap((res) => {
          let project: any = res.data.findProjectBySlug;
          this._store.update((state) => {
            let newState = {
              ...state,
              ...project,
            };
            return newState;
          });
        }),
        finalize(() => {
          this.setLoading(false);
        }),
      );
  }

  updateProject(project: Partial<ProjectDto>) {
    this._store.update((state) => ({
      ...state,
      ...project,
    }));
  }

  updateLaneIssues(laneId: string, issues: ProjectIssueDto[]) {
    this._store.update((state) => {
      let lane = state.lanes.find((x) => x.id === laneId);
      let lanes = arrayUpdate(state.lanes, laneId, {
        ...lane,
        issues,
      });
      return {
        ...state,
        lanes,
      };
    });
  }

  createIssue(issueInput: CreateIssueMutationVariables) {
    let input: CreateIssueMutationVariables = {
      ...issueInput,
      projectId: this._raw.id,
    };
    return this._createIssueGql.mutate(input).pipe(
      tap(({ data }) => {
        this._store.update({});
      }),
    );
  }

  reorderIssues(laneId: string, issues: ProjectIssueDto[]) {
    let issueIds = issues.map((x) => x.id);
    this.updateLaneIssues(laneId, issues);
    return this._reorderIssueGql
      .mutate({
        laneId,
        projectId: this._raw.id,
        issues: issueIds,
      })
      .pipe(
        setLoading(this._store),
        tap(({ data }) => {
          this.updateProject(data.reorderIssueInLane);
        }),
      );
  }

  moveIssueBetweenLanes(input: MoveIssueBetweenLanesMutationVariables) {
    this._moveIssueBetweenLanesGql.mutate(input);
  }

  updateIssue(issue: UpdateIssueDetailDto) {
    return this._updateIssueGql
      .mutate({
        projectId: this._raw.id,
        issue,
      })
      .pipe(
        setLoading(this._store),
        tap(({ data }) => {
          let lane = this._raw.lanes.find((x) => x.issues.some(({ id }) => id === issue.id));
          if (lane) {
            let newIssues = arrayUpdate(lane.issues, issue.id, data.updateIssue);
            this.updateLaneIssues(lane.id, newIssues);
          }
        }),
      );
  }

  updateMarkdown(issueId: string, markdown: string) {
    this._updateMarkdownGql.mutate({
      id: issueId,
      markdown,
    });
  }

  deleteIssue(issueId: string) {
    // this._store.update((state) => {
    //   let issues = arrayRemove(state.issues, issueId);
    //   return {
    //     ...state,
    //     issues
    //   };
    // });
  }

  updateIssueComment(issueId: string, comment: JComment) {
    // let allIssues = this._store.getValue().issues;
    // let issue = allIssues.find((x) => x.id === issueId);
    // if (!issue) {
    //   return;
    // }
    // let comments = arrayUpsert(issue.comments ?? [], comment.id, comment);
    // this.updateIssue({
    //   ...issue,
    //   comments
    // });
  }
}
