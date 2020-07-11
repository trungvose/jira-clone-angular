import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};




export type Mutation = {
  __typename?: 'Mutation';
  reorderIssueInLane: ProjectDto;
  moveIssueBetweenLanes: ProjectDto;
  register?: Maybe<Scalars['Boolean']>;
  login: TokenResultDto;
  logout?: Maybe<Scalars['Boolean']>;
};


export type MutationReorderIssueInLaneArgs = {
  projectId: Scalars['String'];
  laneId: Scalars['String'];
  issues: Array<Scalars['String']>;
};


export type MutationMoveIssueBetweenLanesArgs = {
  projectId: Scalars['String'];
  targetLaneId: Scalars['String'];
  previousLaneId: Scalars['String'];
  targetIssues: Array<Scalars['String']>;
  previousIssues: Array<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PermissionDto = {
  __typename?: 'PermissionDto';
  name: Scalars['String'];
  score: Scalars['Int'];
  type: PermissionType;
  teams?: Maybe<Array<Scalars['String']>>;
  projects?: Maybe<Array<Scalars['String']>>;
  projectIssues?: Maybe<Array<Scalars['String']>>;
};

export enum PermissionType {
  System = 'System',
  Team = 'Team',
  Project = 'Project',
  ProjectIssue = 'ProjectIssue'
}

export enum ProjectCategory {
  Software = 'Software'
}

export type ProjectDto = {
  __typename?: 'ProjectDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  category: ProjectCategory;
  users: Array<UserDto>;
  teams: Array<TeamDto>;
  lanes: Array<Maybe<ProjectLaneDto>>;
};

export type ProjectInformationDto = {
  __typename?: 'ProjectInformationDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  category: ProjectCategory;
  users: Array<UserDto>;
  teams: Array<TeamDto>;
};

export type ProjectIssueDetailDto = {
  __typename?: 'ProjectIssueDetailDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  title: Scalars['String'];
  summary: Scalars['String'];
  type: ProjectIssueType;
  status: ProjectIssueStatus;
  priority: ProjectIssuePriority;
  tags: Array<Maybe<ProjectIssueTagDto>>;
  main: UserDto;
  outputHtml: Scalars['String'];
  timelines: Array<Maybe<TimelineDto>>;
  reporter: UserDto;
  assignee?: Maybe<UserDto>;
  participants: Array<Maybe<UserDto>>;
};

export type ProjectIssueDto = {
  __typename?: 'ProjectIssueDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  title: Scalars['String'];
  summary: Scalars['String'];
  type: ProjectIssueType;
  status: ProjectIssueStatus;
  priority: ProjectIssuePriority;
  tags: Array<Maybe<ProjectIssueTagDto>>;
  main: UserDto;
};

export enum ProjectIssuePriority {
  Lowest = 'Lowest',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Highest = 'Highest'
}

export enum ProjectIssueStatus {
  Backlog = 'Backlog',
  Selected = 'Selected',
  InProgress = 'InProgress',
  Done = 'Done'
}

export type ProjectIssueTagDto = {
  __typename?: 'ProjectIssueTagDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  text: Scalars['String'];
  styles: ProjectIssueTagStyle;
  description?: Maybe<Scalars['String']>;
};

export type ProjectIssueTagStyle = {
  __typename?: 'ProjectIssueTagStyle';
  color: Scalars['String'];
  backgroundColor: Scalars['String'];
};

export enum ProjectIssueType {
  Task = 'Task',
  Story = 'Story',
  Bug = 'Bug'
}

export type ProjectLaneDto = {
  __typename?: 'ProjectLaneDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
  issues: Array<Maybe<ProjectIssueDto>>;
};

export enum ProjectTimelineType {
  Comment = 'Comment',
  Assign = 'Assign',
  Mention = 'Mention',
  Tag = 'Tag'
}

export type Query = {
  __typename?: 'Query';
  me: UserInformationDto;
  findProjectBySlug: ProjectDto;
  findProjectsByUserId: Array<ProjectInformationDto>;
  findIssueById: ProjectIssueDetailDto;
  refreshToken: TokenResultDto;
};


export type QueryFindProjectBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindProjectsByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryFindIssueByIdArgs = {
  id: Scalars['String'];
};

export type TeamDto = {
  __typename?: 'TeamDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  members: Array<UserDto>;
};

export type TimelineAssignDto = {
  __typename?: 'TimelineAssignDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  type: ProjectTimelineType;
  actor: UserDto;
  assignee: UserDto;
};

export type TimelineCommentDto = {
  __typename?: 'TimelineCommentDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  type: ProjectTimelineType;
  actor: UserDto;
  outputHtml: Scalars['String'];
};

export type TimelineDto = TimelineAssignDto | TimelineCommentDto | TimelineTagDto | TimelineMentionDto;

export type TimelineMentionDto = {
  __typename?: 'TimelineMentionDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  type: ProjectTimelineType;
  actor: UserDto;
  issues: Array<ProjectIssueDto>;
};

export type TimelineTagDto = {
  __typename?: 'TimelineTagDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  type: ProjectTimelineType;
  actor: UserDto;
  tags: Array<ProjectIssueTagDto>;
};

export type TokenResultDto = {
  __typename?: 'TokenResultDto';
  token: Scalars['String'];
  expiry: Scalars['DateTime'];
};

export type UserDto = {
  __typename?: 'UserDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
};

export type UserInformationDto = {
  __typename?: 'UserInformationDto';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  permissions: Array<PermissionDto>;
};

export type FindProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FindProjectBySlugQuery = (
  { __typename?: 'Query' }
  & { findProjectBySlug: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, 'id' | 'name' | 'slug' | 'description' | 'category' | 'createdAt' | 'updatedAt'>
    & { users: Array<(
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id' | 'fullName' | 'avatarUrl'>
    )>, lanes: Array<Maybe<(
      { __typename?: 'ProjectLaneDto' }
      & Pick<ProjectLaneDto, 'id' | 'title'>
      & { issues: Array<Maybe<(
        { __typename?: 'ProjectIssueDto' }
        & Pick<ProjectIssueDto, 'id' | 'name' | 'title' | 'isActive' | 'createdAt' | 'updatedAt' | 'type' | 'status' | 'priority'>
        & { tags: Array<Maybe<(
          { __typename?: 'ProjectIssueTagDto' }
          & Pick<ProjectIssueTagDto, 'id' | 'text' | 'description'>
          & { styles: (
            { __typename?: 'ProjectIssueTagStyle' }
            & Pick<ProjectIssueTagStyle, 'color' | 'backgroundColor'>
          ) }
        )>>, main: (
          { __typename?: 'UserDto' }
          & Pick<UserDto, 'id' | 'avatarUrl' | 'fullName'>
        ) }
      )>> }
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'TokenResultDto' }
    & Pick<TokenResultDto, 'token' | 'expiry'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserInformationDto' }
    & Pick<UserInformationDto, 'id' | 'email' | 'fullName' | 'firstName' | 'lastName' | 'isActive' | 'avatarUrl' | 'createdAt' | 'updatedAt'>
    & { permissions: Array<(
      { __typename?: 'PermissionDto' }
      & Pick<PermissionDto, 'name' | 'type' | 'score' | 'teams' | 'projects' | 'projectIssues'>
    )> }
  ) }
);

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = (
  { __typename?: 'Query' }
  & { refreshToken: (
    { __typename?: 'TokenResultDto' }
    & Pick<TokenResultDto, 'expiry' | 'token'>
  ) }
);

export const FindProjectBySlugDocument = gql`
    query FindProjectBySlug($slug: String!) {
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
  export class FindProjectBySlugGQL extends Apollo.Query<FindProjectBySlugQuery, FindProjectBySlugQueryVariables> {
    document = FindProjectBySlugDocument;
    
  }
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    expiry
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
  }
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
  }
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    fullName
    firstName
    lastName
    isActive
    avatarUrl
    permissions {
      name
      type
      score
      teams
      projects
      projectIssues
    }
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
  }
export const RefreshTokenDocument = gql`
    query RefreshToken {
  refreshToken {
    expiry
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshTokenGQL extends Apollo.Query<RefreshTokenQuery, RefreshTokenQueryVariables> {
    document = RefreshTokenDocument;
    
  }