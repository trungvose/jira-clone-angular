import { Component, OnInit, Input } from '@angular/core';
import { JProject } from '@trungk18/interface/project';
import { SideBarLink } from '@trungk18/interface/ui-model/nav-link';
import { SideBarLinks } from '@trungk18/project/config/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;
  project: JProject;
  
  get sidebarWidth(): number {
    return this.expanded ? 240 : 20;
  }

  sideBarLinks: SideBarLink[];

  constructor() {}

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
