import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SideBarLink } from '@trungk18/interface/ui-model/nav-link';
import { SideBarLinks } from '@trungk18/project/config/sidebar';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { ProjectDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@UntilDestroy()
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;

  get sidebarWidth(): number {
    return this.expanded ? 240 : 15;
  }

  project: ProjectDto;
  sideBarLinks: SideBarLink[];

  constructor(private _projectQuery: ProjectQuery) {
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
    });
  }

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
