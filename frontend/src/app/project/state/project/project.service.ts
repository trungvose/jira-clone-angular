import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayRemove, arrayUpsert } from '@datorama/akita';
import { JComment } from '@trungk18/interface/comment';
import { JIssue } from '@trungk18/interface/issue';
import { JProject } from '@trungk18/interface/project';
import { DateUtil } from '@trungk18/project/utils/date';
import { environment } from 'src/environments/environment';
import { ProjectStore } from './project.store';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';

const findProjectBySlugQuery = gql`
  query FindProject($slug: String!) {
    findProjectBySlug(slug: $slug) {
      id
      name
      slug
      description
      category
      users {
        id
        fullName
        avatarUrl
      }
      lanes {
        id
        title
        issues {
          id
          name
          title
          isActive
          createdAt
          updatedAt
          type
          status
          priority
          tags {
            id
            text
            styles {
              color
              backgroundColor
            }
            description
          }
          main {
            id
            avatarUrl
            fullName
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;

  constructor(private _apollo: Apollo, private _store: ProjectStore) {
    this.baseUrl = environment.apiUrl;
  }

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  getProject(slug: string): Observable<FetchResult> {
    this.setLoading(true);
    return this._apollo
      .query({
        query: findProjectBySlugQuery,
        variables: {
          slug
        }
      })
      .pipe(
        tap((res) => {
          //TODO: Remove that dirty test
          //Anh Chau, why I need to force the type
          let project = (<any>res.data).findProjectBySlug as JProject;
          this._store.update((state) => {
            let newState = {
              ...state,
              ...(project as JProject)
            }
            console.log(newState)
            return newState
          });
        }),
        finalize(() => {
          this.setLoading(false);
        })
      );
  }

  updateProject(project: Partial<JProject>) {
    this._store.update((state) => ({
      ...state,
      ...project
    }));
  }

  updateIssue(issue: JIssue) {
    issue.updatedAt = DateUtil.getNow();
    this._store.update((state) => {
      let issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
  }

  deleteIssue(issueId: string) {
    this._store.update((state) => {
      let issues = arrayRemove(state.issues, issueId);
      return {
        ...state,
        issues
      };
    });
  }

  updateIssueComment(issueId: string, comment: JComment) {
    let allIssues = this._store.getValue().issues;
    let issue = allIssues.find((x) => x.id === issueId);
    if (!issue) {
      return;
    }

    let comments = arrayUpsert(issue.comments ?? [], comment.id, comment);
    this.updateIssue({
      ...issue,
      comments
    });
  }
}
