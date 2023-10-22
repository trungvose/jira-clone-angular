import { Component, Input, OnInit } from '@angular/core';
import { JProject } from '@trungk18/interface/project';
import { SideBarLink } from '@trungk18/interface/ui-model/nav-link';
import { SideBarLinks } from '@trungk18/project/config/sidebar';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;

  get sidebarWidth(): number {
    return this.expanded ? 240 : 15;
  }

  project: JProject;
  sideBarLinks: SideBarLink[];

  constructor(private _projectQuery: ProjectQuery) {
      this.project = this._projectQuery.all();
  }

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
