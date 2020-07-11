import { Injectable } from '@angular/core';
import { arrayRemove, arrayUpsert } from '@datorama/akita';
import { FindProjectBySlugGQL, ProjectDto, ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';
import { JComment } from '@trungk18/interface/comment';
import { DateUtil } from '@trungk18/project/utils/date';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectStore } from './project.store';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;

  constructor(private _store: ProjectStore, private _findProjectBySlug: FindProjectBySlugGQL) {
    this.baseUrl = environment.apiUrl;
  }

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  getProject(slug: string): Observable<FetchResult> {
    this.setLoading(true);
    return this._findProjectBySlug
      .fetch({
        slug
      })
      .pipe(
        tap((res) => {
          let project: any = res.data.findProjectBySlug;
          this._store.update((state) => {
            let newState = {
              ...state,
              ...project
            };
            console.log(newState);
            return newState;
          });
        }),
        finalize(() => {
          this.setLoading(false);
        })
      );
  }

  updateProject(project: Partial<ProjectDto>) {
    this._store.update((state) => ({
      ...state,
      ...project
    }));
  }

  updateIssue(issue: ProjectIssueDto) {
    // issue.updatedAt = DateUtil.getNow();
    // this._store.update((state) => {
    //   let issues = arrayUpsert(state.issues, issue.id, issue);
    //   return {
    //     ...state,
    //     issues
    //   };
    // });
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
