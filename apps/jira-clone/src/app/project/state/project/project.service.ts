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
  FindIssueByIdGQL,
  ProjectIssueDetailDto,
} from '@trungk18/core/graphql/service/graphql';
import { JComment } from '@trungk18/interface/comment';
import { FetchResult } from 'apollo-link';
import { environment } from 'apps/jira-clone/src/environments/environment';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
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
    private _findIssueByIdGql: FindIssueByIdGQL,
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

  findIssueById(issueId: string): Observable<ProjectIssueDetailDto> {
    return this._findIssueByIdGql
      .fetch({
        id: issueId,
      })
      .pipe(map(({ data }) => data.findIssueById as any)); //timelines is missing
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
    this._updateStoreLaneIssues(laneId, issues);
    return this._reorderIssueGql
      .mutate({
        laneId,
        projectId: this._raw.id,
        issues: issueIds,
      })
      .pipe(
        setLoading(this._store),
        tap(({ data }) => {
          this.updateStoreProject(data.reorderIssueInLane);
        }),
      );
  }

  moveIssueBetweenLanes(
    previousLaneId: string,
    previousIssues: ProjectIssueDto[],
    targetLaneId: string,
    targetIssues: ProjectIssueDto[],
  ) {
    this._updateStoreLaneIssues(previousLaneId, previousIssues);
    this._updateStoreLaneIssues(targetLaneId, targetIssues);

    return this._moveIssueBetweenLanesGql
      .mutate({
        previousLaneId,
        previousIssues: previousIssues.map((x) => x.id),
        targetLaneId,
        targetIssues: targetIssues.map((x) => x.id),
        projectId: this._raw.id,
      })
      .pipe(
        setLoading(this._store),
        tap(({ data }) => {
          this.updateStoreProject(data.moveIssueBetweenLanes);
        }),
      );
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
          this._updateStoreIssue(issue.id, data.updateIssue as any);
        }),
      );
  }

  updateMarkdown(issueId: string, markdown: string) {
    return this._updateMarkdownGql
      .mutate({
        id: issueId,
        markdown,
      })
      .pipe(
        setLoading(this._store),
        tap(({ data }) => {
          this._updateStoreIssue(issueId, data.updateMarkdown as any);
        }),
      );
  }

  updateStoreProject(project: Partial<ProjectDto>) {
    this._store.update((state) => ({
      ...state,
      ...project,
    }));
  }

  private _updateStoreIssue(issueId: string, newIssue: ProjectIssueDetailDto) {
    let lane = this._raw.lanes.find((x) => x.issues.some(({ id }) => id === issueId));
    if (lane) {
      let newIssues = arrayUpdate(lane.issues, issueId, newIssue);
      this._updateStoreLaneIssues(lane.id, newIssues);
    }
  }
  private _updateStoreLaneIssues(laneId: string, issues: ProjectIssueDto[]) {
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
